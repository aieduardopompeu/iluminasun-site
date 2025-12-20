// api/fortlev/kits.ts
import type { IncomingMessage, ServerResponse } from "http";
import { fortlevFetch } from "../../shared/fortlevPartner.js";

function sendJson(res: ServerResponse, status: number, payload: any) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function toNumber(v: any, fallback: number) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    if (req.method !== "GET") {
      return sendJson(res, 405, { ok: false, error: "Method not allowed" });
    }

    // Parse query via URL (não depende de req.query)
    const host = req.headers.host || "localhost";
    const url = new URL(req.url || "/", `https://${host}`);
    const qs = url.searchParams;

    const power = toNumber(qs.get("power"), 0); // 0 => catálogo
    const phase = toNumber(qs.get("phase"), 1);
    const voltage = String(qs.get("voltage") ?? "220");

    const surface = qs.get("surface") ? String(qs.get("surface")) : null;
    const city = qs.get("city") ? String(qs.get("city")) : null;

    const body = { power, voltage, phase, surface, city };

    const r = await fortlevFetch("/order", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const text = await r.text();
    let data: any = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }

    return sendJson(res, r.status, data);
  } catch (e: any) {
    console.error("[fortlev/kits] error:", e?.message || e, e?.stack);
    return sendJson(res, 500, { ok: false, error: e?.message || "Unexpected error" });
  }
}
