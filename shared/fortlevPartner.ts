// shared/fortlevPartner.ts
type AuthResponse = {
  access_token: string;
  token_type?: string; // normalmente "Bearer"
  scope?: string;
  expires_in?: number; // se existir
  _expiry_time?: string; // se existir
};

let cachedToken: { value: string; type: string; expiresAt: number } | null = null;
let inflightLogin: Promise<void> | null = null;

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function computeExpiresAt(data: AuthResponse): number {
  // prioridade: _expiry_time (data/hora), depois expires_in (segundos), senão fallback 50 min
  if (data._expiry_time) {
    const ms = Date.parse(data._expiry_time);
    if (!Number.isNaN(ms)) return ms;
  }
  if (typeof data.expires_in === "number" && data.expires_in > 0) {
    return Date.now() + data.expires_in * 1000;
  }
  return Date.now() + 50 * 60 * 1000;
}

async function login(): Promise<void> {
  if (inflightLogin) return inflightLogin;

  inflightLogin = (async () => {
  const base = env("FORTLEV_BASE_URL").replace(/\/$/, "");
  const username = env("FORTLEV_USERNAME");
  const password = env("FORTLEV_PASSWORD");

  // ✅ Enviar como form-urlencoded (muito comum em /login)
  const form = new URLSearchParams({ username, password });

  const res = await fetch(`${base}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      "Accept": "application/json",
    },
    body: form.toString(),
  });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`Fortlev login failed (${res.status}): ${txt}`);
    }

    const data = (await res.json()) as AuthResponse;
    const tokenType = data.token_type || "Bearer";
    const expiresAt = computeExpiresAt(data);

    cachedToken = {
      value: data.access_token,
      type: tokenType,
      expiresAt,
    };
  })();

  try {
    await inflightLogin;
  } finally {
    inflightLogin = null;
  }
}

async function ensureAuthHeader(): Promise<string> {
  // renova 30s antes de expirar
  if (!cachedToken || Date.now() > cachedToken.expiresAt - 30_000) {
    await login();
  }
  return `${cachedToken!.type} ${cachedToken!.value}`;
}

export async function fortlevFetch(path: string, init?: RequestInit) {
  const base = env("FORTLEV_BASE_URL").replace(/\/$/, "");
  const auth = await ensureAuthHeader();

  const doFetch = (authorization: string) =>
    fetch(`${base}${path.startsWith("/") ? path : `/${path}`}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers || {}),
        Authorization: authorization,
      },
    });

  let res = await doFetch(auth);

  // se 401, tenta reautenticar 1 vez
  if (res.status === 401) {
    cachedToken = null;
    const auth2 = await ensureAuthHeader();
    res = await doFetch(auth2);
  }

  return res;
}

export function sendJson(res: any, status: number, data: unknown) {
  res.status(status);
  // cache leve no edge da Vercel (opcional)
  res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=120");
  res.json(data);
}
