export const config = { runtime: "nodejs" };

export default async function handler(_req: any, res: any) {
  res.status(200).json({
    ok: true,
    FORTLEV_BASE_URL: Boolean(process.env.FORTLEV_BASE_URL),
    FORTLEV_USERNAME: Boolean(process.env.FORTLEV_USERNAME),
    FORTLEV_PASSWORD: Boolean(process.env.FORTLEV_PASSWORD),
  });
}
