import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";
const POST_PATH = "/blog/manutencao-paineis-solares";
const CANONICAL = `${SITE_URL}${POST_PATH}`;
const HERO_IMAGE = "/blog/manutencao-paineis-solares.webp";
const HERO_ALT = "Manuten��o de pain�is solares: checklist e boas pr�ticas.";
const HERO_CAPTION = "Manuten��o: limpeza, inspe��o, sombreamento e performance  RJ e regi�o.";
const OG_IMAGE = `${SITE_URL}/blog/regulamentacao-aneel.webp`;

const DATE_PUBLISHED = "2024-11-28";
const DATE_MODIFIED = "2024-11-28";

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

export default function ManutencaoPaineisSolares() {
  const pageTitle =
    "Manutenção de Painéis Solares: Guia Completo para Máxima Eficiência | Ilumina Sun";
  const description =
    "Checklist de manutenção de painéis solares (limpeza, inspeção, sombreamento e performance), sinais de alerta e periodicidade. Atendimento RJ, Niterói, São Gonçalo, Itaboraí, Maricá e região.";

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
        { "@type": "ListItem", position: 2, name: "Manutenção", item: CANONICAL },
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

  const faqJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Com que frequência devo limpar os painéis solares?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Depende de poeira, maresia e poluição. Em áreas litorâneas e urbanas, uma verificação mensal e limpeza periódica (quando houver acúmulo) costuma manter a eficiência.",
          },
        },
        {
          "@type": "Question",
          name: "Quais sinais indicam perda de performance?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Queda de geração no app do inversor, sujeira visível, sombreamento novo (árvore/cabos), falhas intermitentes e alertas no inversor. Uma inspeção simples normalmente identifica o motivo.",
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
          <Link href="/blog"><a className="hover:text-primary">Blog</a></Link>
          <span>•</span>
          <span className="truncate">Manutenção</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <header className="space-y-4">
              <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Manutenção
              </div>
              <h1 className="text-3xl font-bold leading-tight md:text-4xl">
                Manutenção de Painéis Solares: Guia Completo para Máxima Eficiência
              </h1>
              <p className="text-base text-muted-foreground md:text-lg">{description}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>28 de Novembro, 2024</span>
                <span>•</span>
                <span>6 min</span>
              </div>

              {/* Compartilhamento (padrão do site) */}
              <div className="pt-2">
              </div>
              <ShareBar
              title="Manutenção de Painéis Solares: Guia Completo para Máxima Eficiência"
              url={CANONICAL}
              slug="(cole aqui o slug do post)"
              contentType="blog"
              heading=""
            />
            </header>
            {/* Hero image */}
            <figure className="overflow-hidden rounded-2xl border border-border bg-muted/30">
              <img
                src={HERO_IMAGE}
                alt={HERO_ALT}
                className="h-auto w-full object-cover"
                loading="lazy"
              />
              {HERO_CAPTION ? (
                <figcaption className="px-4 py-3 text-xs text-muted-foreground">
                  {HERO_CAPTION}
                </figcaption>
              ) : null}
            </figure>


            <section className="prose prose-slate max-w-none dark:prose-invert">
              <h2>Por que manutenção importa</h2>
              <p>
                Um sistema bem instalado é robusto, mas sujeira, sombreamento e conexões podem reduzir a geração.
                Manutenção preventiva evita perda de performance e aumenta a vida útil do sistema.
              </p>

              <h2>Checklist rápido (mensal)</h2>
              <ul>
                <li>Verificar geração no app (comparar com meses anteriores)</li>
                <li>Inspecionar sujeira/folhas/fezes de aves</li>
                <li>Checar sombreamento novo (árvores, estruturas, cabos)</li>
              </ul>

              <h2>Checklist técnico (trimestral/semestral)</h2>
              <ul>
                <li>Inspeção visual de cabos e conectores</li>
                <li>Conferência de apertos/oxidação em proteções (string box)</li>
                <li>Verificação do inversor (alertas e temperatura)</li>
              </ul>

              <h2>RJ e Região</h2>
              <p>
                Em áreas com maresia/poeira (Rio de Janeiro, Niterói, Maricá e entorno), a limpeza pode ser mais frequente.
                A Ilumina Sun atende também São Gonçalo, Itaboraí, Tanguá e Rio Bonito.
              </p>
            </section>

            <div className="rounded-2xl border border-border bg-muted/30 p-6">
              <div className="text-sm font-semibold">Quer checar a saúde do seu sistema?</div>
              <div className="mt-1 text-sm text-muted-foreground">
                A gente analisa sua fatura e a geração do inversor para identificar perda de performance.
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
                <Link href="/blog/regulamentacao-aneel-energia-solar"><a className="hover:text-primary">Regulamentação ANEEL</a></Link>
                <Link href="/blog/conta-de-luz-nao-zerou-energia-solar"><a className="hover:text-primary">Conta não zerou</a></Link>
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
