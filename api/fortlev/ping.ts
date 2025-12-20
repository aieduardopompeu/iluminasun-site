import { sendJson } from "../../shared/fortlevPartner";

export default async function handler(_req: any, res: any) {
  return sendJson(res, 200, { ok: true, imported: true });
}
