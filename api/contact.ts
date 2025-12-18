// api/contact.ts
// Vercel Serverless Function (sem dependências externas)
// Resend via HTTP API (fetch)

type PropertyType = "residencial" | "comercial" | "industrial" | "rural";

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  state?: string;
  averageBill?: string;
  propertyType?: PropertyType;
  message?: string;

  // honeypot (anti-spam)
  website?: string;

  // tracking (opcional)
  page_path?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

/** ===== Anti-abuso (rate limit simples em memória) ===== */
const RATE_WINDOW_MS = 15_000; // 15s por IP
const lastHitByIp = new Map<string, number>();

function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isEmail(v: string): boolean {
  // simples e suficiente para validação de formulário
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function onlyDigits(v: string): string {
  return v.replace(/\D/g, "");
}

function normalizePayload(body: any): ContactPayload {
  return {
    name: asString(body?.name),
    email: asString(body?.email),
    phone: asString(body?.phone) || undefined,
    city: asString(body?.city) || undefined,
    state: asString(body?.state) || undefined,
    averageBill: asString(body?.averageBill) || undefined,
    propertyType: (asString(body?.propertyType) as PropertyType) || undefined,
    message: asString(body?.message) || undefined,
    website: asString(body?.website) || undefined,

    page_path: asString(body?.page_path) || undefined,
    referrer: asString(body?.referrer) || undefined,
    utm_source: asString(body?.utm_source) || undefined,
    utm_medium: asString(body?.utm_medium) || undefined,
    utm_campaign: asString(body?.utm_campaign) || undefined,
    utm_term: asString(body?.utm_term) || undefined,
    utm_content: asString(body?.utm_content) || undefined,
  };
}

function getClientIp(req: any): string {
  const xff = req.headers?.["x-forwarded-for"];
  if (typeof xff === "string" && xff.trim()) return xff.split(",")[0].trim();

  const xri = req.headers?.["x-real-ip"];
  if (typeof xri === "string" && xri.trim()) return xri.trim();

  return "";
}

function buildInternalEmailHtml(
  input: ContactPayload,
  meta: { ip: string; ua: string; site: string }
) {
  const safeMessage = input.message ? escapeHtml(input.message) : "—";
  const cityUf = [input.city, input.state].filter(Boolean).join(" / ") || "—";

  return `
  <div style="font-family: Arial, sans-serif; line-height: 1.5; color:#0f172a;">
    <div style="max-width: 680px; margin: 0 auto; padding: 20px;">
      <div style="border:1px solid #e5e7eb; border-radius: 12px; overflow:hidden;">
        <div style="padding:16px 18px; background:#0b1220; color:#fff;">
          <div style="font-size:13px; opacity:0.9;">Ilumina Sun • Novo contato</div>
          <div style="font-size:18px; font-weight:700; margin-top:4px;">${escapeHtml(
            input.name
          )}</div>
        </div>

        <div style="padding:18px;">
          <table style="width:100%; border-collapse: collapse; font-size:14px;">
            <tr>
              <td style="padding:8px 0; color:#64748b; width:140px;">E-mail</td>
              <td style="padding:8px 0;"><a href="mailto:${escapeHtml(
                input.email
              )}">${escapeHtml(input.email)}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 0; color:#64748b;">Telefone</td>
              <td style="padding:8px 0;">${escapeHtml(input.phone || "—")}</td>
            </tr>
            <tr>
              <td style="padding:8px 0; color:#64748b;">Cidade/UF</td>
              <td style="padding:8px 0;">${escapeHtml(cityUf)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0; color:#64748b;">Conta média</td>
              <td style="padding:8px 0;">${escapeHtml(input.averageBill || "—")}</td>
            </tr>
            <tr>
              <td style="padding:8px 0; color:#64748b;">Tipo de imóvel</td>
              <td style="padding:8px 0;">${escapeHtml(input.propertyType || "—")}</td>
            </tr>
          </table>

          <div style="margin-top:16px; padding:12px; background:#f8fafc; border:1px solid #e5e7eb; border-radius:10px;">
            <div style="font-weight:700; margin-bottom:6px;">Mensagem</div>
            <div style="white-space: pre-wrap;">${safeMessage}</div>
          </div>

          <div style="margin-top:16px; padding:12px; background:#ffffff; border:1px dashed #cbd5e1; border-radius:10px;">
            <div style="font-weight:700; margin-bottom:6px;">Origem</div>
            <div style="font-size:13px; color:#475569;">
              <div><strong>Página:</strong> ${escapeHtml(input.page_path || meta.site)}</div>
              <div><strong>Referrer:</strong> ${escapeHtml(input.referrer || "—")}</div>
              <div style="margin-top:8px;"><strong>UTMs</strong></div>
              <div>Source: ${escapeHtml(input.utm_source || "—")}</div>
              <div>Medium: ${escapeHtml(input.utm_medium || "—")}</div>
              <div>Campaign: ${escapeHtml(input.utm_campaign || "—")}</div>
              <div>Term: ${escapeHtml(input.utm_term || "—")}</div>
              <div>Content: ${escapeHtml(input.utm_content || "—")}</div>
              <div style="margin-top:8px;">IP: ${escapeHtml(meta.ip || "—")}</div>
              <div>User-Agent: ${escapeHtml(meta.ua || "—")}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>`;
}

function buildUserReceiptHtml(name: string, site: string) {
  return `
  <div style="font-family: Arial, sans-serif; line-height: 1.5; color:#0f172a;">
    <div style="max-width: 680px; margin: 0 auto; padding: 20px;">
      <div style="border:1px solid #e5e7eb; border-radius: 12px; overflow:hidden;">
        <div style="padding:16px 18px; background:#0b1220; color:#fff;">
          <div style="font-size:13px; opacity:0.9;">Ilumina Sun</div>
          <div style="font-size:18px; font-weight:700; margin-top:4px;">Recebemos sua mensagem</div>
        </div>

        <div style="padding:18px;">
          <p>Olá, <strong>${escapeHtml(name)}</strong>!</p>
          <p>Recebemos seu contato e nossa equipe retornará em breve.</p>
          <p>Se preferir, fale conosco pelo WhatsApp: <strong>(21) 96608-4093</strong>.</p>
          <p style="margin-top:16px; font-size:12px; color:#64748b;">
            Ilumina Sun Energia Solar • <a href="${escapeHtml(site)}">${escapeHtml(site)}</a>
          </p>
        </div>
      </div>
    </div>
  </div>`;
}

async function resendSendEmail(params: {
  apiKey: string;
  from: string;
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const payload: any = {
    from: params.from,
    to: params.to,
    subject: params.subject,
    html: params.html,
  };

  // Resend HTTP API: reply_to
  if (params.replyTo) payload.reply_to = params.replyTo;

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await r.json().catch(() => ({} as any));
  if (!r.ok) {
    const msg = data?.message || data?.error || "Falha ao enviar e-mail (Resend).";
    throw new Error(String(msg));
  }
  return data;
}

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");

  try {
    if (req.method !== "POST") {
      res.statusCode = 405;
      res.end(JSON.stringify({ ok: false, error: "Method Not Allowed" }));
      return;
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const site = process.env.SITE_URL || "https://iluminasun.com.br";

    if (!apiKey || !from || !toEmail) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          ok: false,
          error: "Config ausente: RESEND_API_KEY / RESEND_FROM / CONTACT_TO_EMAIL",
        })
      );
      return;
    }

    const ip = getClientIp(req) || "unknown";
    const now = Date.now();
    const last = lastHitByIp.get(ip) || 0;

    if (now - last < RATE_WINDOW_MS) {
      res.statusCode = 429;
      res.end(
        JSON.stringify({
          ok: false,
          error: "Muitas tentativas. Aguarde alguns segundos e tente novamente.",
        })
      );
      return;
    }
    lastHitByIp.set(ip, now);

    const body = normalizePayload(req.body);

    // Honeypot: bot preencheu -> retorna OK sem enviar (silencioso)
    if (body.website) {
      res.statusCode = 200;
      res.end(JSON.stringify({ ok: true }));
      return;
    }

    // ===== Validações “produção” =====
    // Requeridos
    if (!body.name || !body.email) {
      res.statusCode = 400;
      res.end(JSON.stringify({ ok: false, error: "Nome e e-mail são obrigatórios." }));
      return;
    }

    // Email válido
    if (!isEmail(body.email)) {
      res.statusCode = 400;
      res.end(JSON.stringify({ ok: false, error: "E-mail inválido." }));
      return;
    }

    // Limites de tamanho (anti-abuso)
    if (body.name.length > 120) {
      res.statusCode = 400;
      res.end(JSON.stringify({ ok: false, error: "Nome muito longo." }));
      return;
    }
    if ((body.message || "").length > 2000) {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          ok: false,
          error: "Mensagem muito longa (máx. 2000 caracteres).",
        })
      );
      return;
    }
    if ((body.page_path || "").length > 500) body.page_path = body.page_path?.slice(0, 500);
    if ((body.referrer || "").length > 500) body.referrer = body.referrer?.slice(0, 500);

    // Telefone básico (se informado)
    if (body.phone) {
      const digits = onlyDigits(body.phone);
      if (digits.length < 10 || digits.length > 13) {
        res.statusCode = 400;
        res.end(JSON.stringify({ ok: false, error: "Telefone inválido." }));
        return;
      }
    }

    // ===== Envio =====
    const ua = (req.headers?.["user-agent"] as string) || "";

    // 1) e-mail interno
    await resendSendEmail({
      apiKey,
      from,
      to: [toEmail],
      subject: `Ilumina Sun • Novo contato: ${body.name}`,
      html: buildInternalEmailHtml(body, { ip, ua, site }),
      replyTo: body.email,
    });

    // 2) e-mail para o lead
    await resendSendEmail({
      apiKey,
      from,
      to: [body.email],
      subject: "Ilumina Sun • Recebemos sua mensagem",
      html: buildUserReceiptHtml(body.name, site),
      replyTo: toEmail,
    });

    res.statusCode = 200;
    res.end(JSON.stringify({ ok: true }));
  } catch (err: any) {
    res.statusCode = 500;
    res.end(JSON.stringify({ ok: false, error: err?.message || "Erro interno." }));
  }
}
