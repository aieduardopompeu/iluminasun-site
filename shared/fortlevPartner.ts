// shared/fortlevPartner.ts
type AuthResponse = {
  access_token: string;
  token_type?: string; // geralmente "Bearer"
  expires_in?: number; // em segundos
  expiry_time?: string; // opcional (ISO)
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
  if (data.expiry_time) {
    const ms = Date.parse(data.expiry_time);
    if (!Number.isNaN(ms)) return ms;
  }
  if (typeof data.expires_in === "number" && data.expires_in > 0) {
    return Date.now() + data.expires_in * 1000;
  }
  return Date.now() + 50 * 60 * 1000;
}

async function oauthPasswordLogin(): Promise<void> {
  if (inflightLogin) return inflightLogin;

  inflightLogin = (async () => {
    const base = env("FORTLEV_BASE_URL").trim().replace(/\/$/, "");

    // usuário/senha do integrador
    const username = env("FORTLEV_USERNAME").trim();
    const password = env("FORTLEV_PASSWORD").trim();

    // client_id/client_secret do integrador
    const clientId = env("FORTLEV_CLIENT_ID").trim();
    const clientSecret = env("FORTLEV_CLIENT_SECRET").trim();

    // conforme Swagger: Token URL = /user/login
    const tokenPath = (process.env.FORTLEV_TOKEN_PATH || "/user/login").trim();
    const tokenUrl = `${base}${tokenPath.startsWith("/") ? "" : "/"}${tokenPath}`;

    // OAuth2 password grant (form-urlencoded)
    const form = new URLSearchParams();
    form.set("grant_type", "password");
    form.set("username", username);
    form.set("password", password);

    // muitos servidores aceitam/esperam client_id/secret também no body
    form.set("client_id", clientId);
    form.set("client_secret", clientSecret);

    // e, conforme seu Swagger, “client credentials location: Authorization header”
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

    cachedToken = {
      value: data.access_token,
      type: data.token_type || "Bearer",
      expiresAt: computeExpiresAt(data),
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
  await oauthPasswordLogin();
  if (!cachedToken) throw new Error("Failed to obtain Fortlev token");
  return `${cachedToken.type} ${cachedToken.value}`;
}

export async function fortlevFetch(path: string, init?: RequestInit) {
  const base = env("FORTLEV_BASE_URL").trim().replace(/\/$/, "");
  const url = `${base}${path.startsWith("/") ? "" : "/"}${path}`;

  const auth = await getAuthHeader();

  const headers = new Headers(init?.headers || {});
  headers.set("Authorization", auth);
  if (!headers.has("Accept")) headers.set("Accept", "application/json");

  return fetch(url, { ...init, headers });
}

export function sendJson(res: any, status: number, payload: any) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}
