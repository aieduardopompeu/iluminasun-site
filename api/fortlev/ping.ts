export const config = { runtime: "nodejs20.x" };

export default async function handler(_req: any, res: any) {
  res.status(200).json({ ok: true, where: "fortlev-ping" });
}
