import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";
const POST_PATH = "/blog/conta-de-luz-nao-zerou-energia-solar";
const CANONICAL = `${SITE_URL}${POST_PATH}`;
const OG_IMAGE = `${SITE_URL}/blog/regulamentacao-aneel.webp`;

const DATE_PUBLISHED = "2025-01-07";
const DATE_MODIFIED = "2025-01-07";

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

export default function ContaDeLuzNaoZerou() {
  const title =
    "Conta de Luz Não Zerou com Energia Solar? Entenda Mínimos, Taxas e Compensação no RJ | Ilumina Sun";
  const description =
    "Mesmo com energia solar, sua fatura pode não zerar. Entenda custo mínimo, compensação de créditos, demanda, tarifas e o que ajustar no sistema — com foco em RJ, Niterói, São Gonçalo, Itaboraí, Maricá e região.";

  useEffect(() => {
    document.title = title;

    upsertLink("canonical", CANONICAL);
    upsertMetaBy("name", "description", description);

    upsertMetaBy("property", "og:type", "article");
    upsertMetaBy("property", "og:title", title);
    upsertMetaBy("property", "og:description", description);
    upsertMetaBy("property", "og:url", CANONICAL);
    upsertMetaBy("property", "og:image", OG_IMAGE);

    upsertMetaBy("name", "twitter:card", "summary_large_image");
    upsertMetaBy("name", "twitter:title", title);
    upsertMetaBy("name", "twitter:description", description);
    upsertMetaBy("name", "twitter:image", OG_IMAGE);
  }, [title, description]);

  const breadcrumbJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 2, name: "Regulamentação", item: CANONICAL },
      ],
    }),
    []
  );

  const articleJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
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
    [title, description]
  );

  const faqJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Por que a conta não zera mesmo com energia solar?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Porque existem cobranças mínimas e regras de faturamento/compensação. Dependendo do perfil (residencial/comercial/industrial/rural) e da distribuidora, podem existir componentes mínimos, demanda e itens não compensáveis.",
          },
        },
        {
          "@type": "Question",
          name: "Créditos de energia sempre abatem 100% da fatura?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Nem sempre. A compensação segue regras e pode haver parcelas da tarifa que não são abatidas integralmente. O ideal é verificar o detalhamento da fatura e dimensionar o sistema considerando o perfil de consumo.",
          },
        },
        {
          "@type": "Question",
          name: "O que posso fazer para otimizar?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Revisar dimensionamento, hábitos de consumo (carga diurna), sombreamento, manutenção e, quando aplicável, modalidade de compensação. Uma análise técnica com a fatura em mãos costuma resolver rápido.",
          },
        },
      ],
    }),
    []
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-16 md:px-6 lg:px-0">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog">
            <a className="hover:text-primary">Blog</a>
          </Link>
          <span>•</span>
          <span className="truncate">Regulamentação</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <header className="space-y-4">
              <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Regulamentação
              </div>
              <h1 className="text-3xl font-bold leading-tight md:text-4xl">{title.replace(" | Ilumina Sun", "")}</h1>
              <p className="text-base text-muted-foreground md:text-lg">{description}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>07 de Janeiro, 2025</span>
                <span>•</span>
                <span>7–10 min</span>
              </div>
              
              {/* Compartilhamento (padrão do site) */}
              
              <div className="pt-2">
                <ShareBar
                  title="TÍTULO EXATO DO POST"
                  url={CANONICAL}
                  slug="slug-do-post"
                  contentType="blog"
                />
              </div>
            </header>

            <section className="prose prose-slate max-w-none dark:prose-invert">
              <h2>Os 5 motivos mais comuns</h2>
              <ol>
                <li><strong>Custo mínimo</strong> (ainda existe mesmo com créditos)</li>
                <li><strong>Itens tarifários</strong> que podem não ser abatidos integralmente</li>
                <li><strong>Consumo noturno alto</strong> e pouco consumo diurno</li>
                <li><strong>Dimensionamento</strong> abaixo do necessário (kWh x geração)</li>
                <li><strong>Sombreamento, sujeira e manutenção</strong> reduzindo geração</li>
              </ol>

              <h2>Como identificar no seu caso</h2>
              <ul>
                <li>Compare kWh consumido vs kWh injetado/compensado</li>
                <li>Veja o detalhamento de “créditos” e “componentes mínimos”</li>
                <li>Considere o perfil: residencial, comercial, industrial ou rural</li>
              </ul>

              <h2>RJ e Região</h2>
              <p>
                Se você está em <strong>Rio de Janeiro</strong>, <strong>Niterói</strong>, <strong>São Gonçalo</strong>,
                <strong> Itaboraí</strong>, <strong>Tanguá</strong>, <strong>Rio Bonito</strong> ou <strong>Maricá</strong>,
                uma análise técnica com sua fatura costuma apontar rapidamente o ajuste ideal (dimensionamento e uso).
              </p>
            </section>

            <div className="rounded-2xl border border-border bg-muted/30 p-6">
              <div className="text-sm font-semibold">Quer que a gente analise sua conta?</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Envie a fatura e diga seu perfil (residencial/comercial/industrial/rural). A gente te orienta com clareza.
              </div>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Link href="/contato">
                  <a className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                    Falar com especialista →
                  </a>
                </Link>
                <Link href="/simulador">
                  <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold">
                    Simular economia
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-sm font-semibold">Relacionados</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/blog/regulamentacao-aneel-energia-solar">
                  <a className="hover:text-primary">Regulamentação ANEEL</a>
                </Link>
                <Link href="/blog/marco-legal-lei-14300-energia-solar-rj">
                  <a className="hover:text-primary">Lei 14.300 (Marco Legal)</a>
                </Link>
                <Link href="/blog/financiamento-energia-solar-rj">
                  <a className="hover:text-primary">Financiamento no RJ</a>
                </Link>
                <Link href="/kit-solar">
                  <a className="hover:text-primary">Kits Solares</a>
                </Link>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </main>
  );
}
