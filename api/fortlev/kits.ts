// api/fortlev/kits.ts
import { fortlevFetch, sendJson } from "../../shared/fortlevPartner";

function toNumber(v: any, fallback: number) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  try {
    const power = toNumber(req.query?.power, 0); // 0 => catálogo/lista
    const phase = toNumber(req.query?.phase, 1);
    const voltage = String(req.query?.voltage ?? "220");

    const surface = req.query?.surface ? String(req.query.surface) : null;
    const city = req.query?.city ? String(req.query.city) : null;

    const body = { power, voltage, phase, surface, city };

    const r = await fortlevFetch("/order", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const raw = await r.json().catch(() => null);

    const pv_kits =
      Array.isArray(raw)
        ? raw.flatMap((order: any) =>
            Array.isArray(order?.pv_kits) ? order.pv_kits : []
          )
        : [];

    return sendJson(res, r.status, { raw, pv_kits });
  } catch (e: any) {
    return sendJson(res, 500, { error: e?.message || "Unexpected error" });
  }
}
