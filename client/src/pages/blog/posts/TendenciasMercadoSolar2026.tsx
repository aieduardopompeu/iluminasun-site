import { useEffect, useMemo } from "react";
import { Link } from "wouter";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";
const POST_PATH = "/blog/tendencias-mercado-solar-2026";
const CANONICAL = `${SITE_URL}${POST_PATH}`;
const OG_IMAGE = `${SITE_URL}/blog/regulamentacao-aneel.webp`;

const DATE_PUBLISHED = "2025-11-15";
const DATE_MODIFIED = "2025-11-15";

function upsertMetaBy(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function TendenciasMercadoSolar2026() {
  const pageTitle =
    "Tendências do Mercado Solar em 2026: O Que Esperar | Ilumina Sun";
  const description =
    "Principais tendências para 2026 no setor solar: preço de equipamentos, eficiência, armazenamento (baterias), inversores, regulação e oportunidades para residencial, comercial e industrial no RJ e região.";

  useEffect(() => {
    document.title = pageTitle;

    upsertLink("canonical", CANONICAL);
    upsertMetaBy("name", "description", description);

    upsertMetaBy("property", "og:type", "article");
    upsertMetaBy("property", "og:title", pageTitle);
    upsertMetaBy("property", "og:description", description);
    upsertMetaBy("property", "og:url", CANONICAL);
    upsertMetaBy("property", "og:image", OG_IMAGE);

    upsertMetaBy("name", "twitter:card", "summary_large_image");
    upsertMetaBy("name", "twitter:title", pageTitle);
    upsertMetaBy("name", "twitter:description", description);
    upsertMetaBy("name", "twitter:image", OG_IMAGE);
  }, [pageTitle, description]);

  const breadcrumbJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 2, name: "Mercado", item: CANONICAL },
      ],
    }),
    []
  );

  const articleJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: pageTitle,
      description,
      datePublished: DATE_PUBLISHED,
      dateModified: DATE_MODIFIED,
      mainEntityOfPage: CANONICAL,
      image: [OG_IMAGE],
      author: { "@type": "Organization", name: "Ilumina Sun" },
      publisher: {
        "@type": "Organization",
        name: "Ilumina Sun Energia Solar",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
      },
    }),
    [pageTitle, description]
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-16 md:px-6 lg:px-0">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog"><a className="hover:text-primary">Blog</a></Link>
          <span>•</span>
          <span className="truncate">Mercado</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <header className="space-y-4">
              <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Mercado
              </div>
              <h1 className="text-3xl font-bold leading-tight md:text-4xl">
                Tendências do Mercado Solar em 2026: O Que Esperar
              </h1>
              <p className="text-base text-muted-foreground md:text-lg">{description}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>15 de Novembro, 2025</span>
                <span>•</span>
                <span>9–11 min</span>
              </div>
            </header>

            <section className="prose prose-slate max-w-none dark:prose-invert">
              <h2>1) Equipamentos mais eficientes e compactos</h2>
              <p>
                A tendência é melhoria contínua de eficiência em módulos e inversores, com otimizações para telhados menores e
                projetos com estética mais discreta.
              </p>

              <h2>2) Armazenamento (baterias) ganhando espaço</h2>
              <p>
                Baterias devem se tornar mais comuns em projetos que buscam autonomia parcial, backup e melhor gestão de consumo —
                principalmente em cenários com picos de tarifa e necessidade de continuidade.
              </p>

              <h2>3) Integração com gestão de energia</h2>
              <ul>
                <li>Monitoramento mais detalhado</li>
                <li>Automação de cargas</li>
                <li>Otimização do consumo diurno</li>
              </ul>

              <h2>RJ e Região</h2>
              <p>
                Para projetos no <strong>Rio de Janeiro</strong>, <strong>Niterói</strong>, <strong>São Gonçalo</strong>,{" "}
                <strong>Itaboraí</strong> e <strong>Maricá</strong>, a melhor estratégia é combinar dimensionamento técnico + hábitos de consumo,
                considerando as regras atuais de compensação.
              </p>
            </section>

            <div className="rounded-2xl border border-border bg-muted/30 p-6">
              <div className="text-sm font-semibold">Quer planejar seu projeto para 2026?</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Simule sua economia e peça uma proposta dimensionada para seu perfil (residencial/comercial/industrial/rural).
              </div>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Link href="/simulador">
                  <a className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                    Simular economia →
                  </a>
                </Link>
                <Link href="/contato">
                  <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold">
                    Falar com especialista
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-sm font-semibold">Relacionados</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/blog/financiamento-energia-solar-rj"><a className="hover:text-primary">Financiamento no RJ</a></Link>
                <Link href="/blog/energia-solar-empresas"><a className="hover:text-primary">Energia Solar para Empresas</a></Link>
                <Link href="/blog/marco-legal-lei-14300-energia-solar-rj"><a className="hover:text-primary">Lei 14.300 (Marco Legal)</a></Link>
                <Link href="/servicos"><a className="hover:text-primary">Serviços</a></Link>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </main>
  );
}
