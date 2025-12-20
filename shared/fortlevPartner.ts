// shared/fortlevPartner.ts
type AuthResponse = {
  access_token: string;
  token_type?: string; // normalmente "Bearer"
  expires_in?: number; // em segundos
  expires_at?: number; // opcional (ms ou s, depende do backend)
  expiry_time?: string; // opcional (ISO string)
  scope?: string;
};

let cachedToken: { value: string; type: string; expiresAt: number } | null = null;
let inflightLogin: Promise<void> | null = null;

function env(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function computeExpiresAt(data: AuthResponse): number {
  // prioridade: expiry_time (ISO), depois expires_in (segundos), fallback 50 min
  if (data.expiry_time) {
    const ms = Date.parse(data.expiry_time);
    if (!Number.isNaN(ms)) return ms;
  }
  if (typeof data.expires_in === "number" && data.expires_in > 0) {
    return Date.now() + data.expires_in * 1000;
  }
  // alguns backends mandam expires_at; se vier em segundos, converta
  if (typeof data.expires_at === "number" && data.expires_at > 0) {
    return data.expires_at > 1e12 ? data.expires_at : data.expires_at * 1000;
  }
  return Date.now() + 50 * 60 * 1000;
}

async function oauthLogin(): Promise<void> {
  if (inflightLogin) return inflightLogin;

  inflightLogin = (async () => {
    const base = env("FORTLEV_BASE_URL").trim().replace(/\/$/, "");
    const clientId = env("FORTLEV_CLIENT_ID").trim();
    const clientSecret = env("FORTLEV_CLIENT_SECRET").trim();

    // Ajuste se a Fortlev fornecer um path diferente
    const tokenPath = (process.env.FORTLEV_TOKEN_PATH || "/oauth/token").trim();
    const tokenUrl = `${base}${tokenPath.startsWith("/") ? "" : "/"}${tokenPath}`;

    const scope = (process.env.FORTLEV_SCOPE || "").trim();

    // OAuth2 Client Credentials normalmente é x-www-form-urlencoded
    const form = new URLSearchParams();
    form.set("grant_type", "client_credentials");
    if (scope) form.set("scope", scope);

    // Muitos servidores aceitam client_id/client_secret no body,
    // outros exigem Basic Auth. Vamos enviar os dois (compatível).
    form.set("client_id", clientId);
    form.set("client_secret", clientSecret);

    const basic = Buffer.from(`${clientId}:${clientSecret}`, "utf8").toString("base64");

    const res = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        "Accept": "application/json",
        "Authorization": `Basic ${basic}`,
      },
      body: form.toString(),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`Fortlev oauth token failed (${res.status}): ${txt}`);
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

async function getAuthHeader(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 30_000) {
    return `${cachedToken.type} ${cachedToken.value}`;
  }
  await oauthLogin();
  if (!cachedToken) throw new Error("Failed to obtain Fortlev token");
  return `${cachedToken.type} ${cachedToken.value}`;
}

export async function fortlevFetch(path: string, init?: RequestInit) {
  const base = env("FORTLEV_BASE_URL").trim().replace(/\/$/, "");
  const url = `${base}${path.startsWith("/") ? "" : "/"}${path}`;

  const auth = await getAuthHeader();

  const headers = new Headers(init?.headers || {});
  headers.set("Authorization", auth);
  // Se a API exigir JSON em outras rotas, manter Accept ajuda
  if (!headers.has("Accept")) headers.set("Accept", "application/json");

  return fetch(url, { ...init, headers });
}

// Opcional: helper usado por handlers antigos.
// Se você não usa mais, pode remover.
export function sendJson(res: any, status: number, payload: any) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}
