import { useEffect, useMemo } from "react";
import { Link } from "wouter";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";
const POST_PATH = "/blog/energia-solar-empresas";
const CANONICAL = `${SITE_URL}${POST_PATH}`;
const OG_IMAGE = `${SITE_URL}/blog/regulamentacao-aneel.webp`;

const DATE_PUBLISHED = "2024-11-20";
const DATE_MODIFIED = "2024-11-20";

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

export default function EnergiaSolarEmpresas() {
  const pageTitle =
    "Energia Solar para Empresas: Como Reduzir Custos Operacionais | Ilumina Sun";
  const description =
    "Como empresas reduzem custos com energia solar: dimensionamento, demanda, perfil de consumo e payback. Atendimento comercial/industrial no RJ, Niterói, São Gonçalo, Itaboraí, Maricá e região.";

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
        { "@type": "ListItem", position: 2, name: "Comercial", item: CANONICAL },
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
          <span className="truncate">Comercial</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <header className="space-y-4">
              <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Comercial
              </div>
              <h1 className="text-3xl font-bold leading-tight md:text-4xl">
                Energia Solar para Empresas: Como Reduzir Custos Operacionais
              </h1>
              <p className="text-base text-muted-foreground md:text-lg">{description}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>20 de Novembro, 2024</span>
                <span>•</span>
                <span>7 min</span>
              </div>
            </header>

            <section className="prose prose-slate max-w-none dark:prose-invert">
              <h2>Por que empresas estão migrando para solar</h2>
              <ul>
                <li>Redução de custo de energia no médio/longo prazo</li>
                <li>Previsibilidade no orçamento e proteção contra reajustes</li>
                <li>Melhora de imagem (ESG) e competitividade</li>
              </ul>

              <h2>O que analisar antes de instalar</h2>
              <ol>
                <li><strong>Perfil de consumo</strong> (horário/picos e dias úteis)</li>
                <li><strong>Demanda</strong> (especialmente para perfis industriais)</li>
                <li><strong>Espaço e sombreamento</strong> (telhado/solo)</li>
                <li><strong>Regra do jogo</strong> (Lei 14.300 e compensação)</li>
              </ol>

              <h2>RJ e Região</h2>
              <p>
                Atendemos projetos comerciais e industriais em <strong>Rio de Janeiro</strong>, <strong>Niterói</strong>,{" "}
                <strong>São Gonçalo</strong>, <strong>Itaboraí</strong>, <strong>Maricá</strong>, <strong>Tanguá</strong> e{" "}
                <strong>Rio Bonito</strong>. Para cada caso, o dimensionamento deve considerar consumo e demanda.
              </p>
            </section>

            <div className="rounded-2xl border border-border bg-muted/30 p-6">
              <div className="text-sm font-semibold">Quer uma estimativa de economia para sua empresa?</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Faça a simulação e fale com um especialista para proposta técnica e financeira.
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
                <Link href="/blog/marco-legal-lei-14300-energia-solar-rj"><a className="hover:text-primary">Lei 14.300 (Marco Legal)</a></Link>
                <Link href="/kit-solar"><a className="hover:text-primary">Kits Solares</a></Link>
                <Link href="/servicos"><a className="hover:text-primary">Serviços</a></Link>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </main>
  );
}
