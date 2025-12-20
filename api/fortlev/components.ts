// api/fortlev/components.ts
import type { IncomingMessage, ServerResponse } from "http";
import { fortlevFetch } from "../../shared/fortlevPartner";

function sendJson(res: ServerResponse, status: number, payload: any) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    if (req.method !== "GET") {
      return sendJson(res, 405, { ok: false, error: "Method not allowed" });
    }

    const r = await fortlevFetch("/component/all", { method: "GET" });

    // tenta JSON; se não for JSON, devolve texto
    const text = await r.text();
    let data: any = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }

    return sendJson(res, r.status, data);
  } catch (e: any) {
    console.error("[fortlev/components] error:", e?.message || e, e?.stack);
    return sendJson(res, 500, { ok: false, error: e?.message || "Unexpected error" });
  }
}
