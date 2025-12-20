// api/fortlev/components.ts
import { fortlevFetch, sendJson } from "../../shared/fortlevPartner";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  try {
    const r = await fortlevFetch("/component/all", { method: "GET" });
    const data = await r.json().catch(() => null);
    return sendJson(res, r.status, data);
  } catch (e: any) {
    return sendJson(res, 500, { error: e?.message || "Unexpected error" });
  }
}
