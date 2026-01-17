import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";

const POST_SLUG = "energia-solar-empresas";
const POST_PATH = `/blog/${POST_SLUG}`;
const CANONICAL = `${SITE_URL}${POST_PATH}`;

const HERO_IMAGE = "/blog/energia-solar-empresas.webp";
const HERO_ALT = "Energia solar para empresas: redução de custos, previsibilidade e competitividade.";
const HERO_CAPTION = "Empresas: dimensionamento, demanda, perfil de consumo e payback - RJ e região.";

const OG_IMAGE = `${SITE_URL}${HERO_IMAGE}`;

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

function slugifyId(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function EnergiaSolarEmpresas() {
  const pageTitle = "Energia Solar para Empresas: Como Reduzir Custos Operacionais | Ilumina Sun";
  const title = "Energia Solar para Empresas: Como Reduzir Custos Operacionais";
  const description =
    "Como empresas reduzem custos com energia solar: dimensionamento, demanda, perfil de consumo e payback. Atendimento comercial/industrial no RJ, Niterói, São Gonçalo, Itaboraí, Maricá e região.";

  const toc = useMemo(
    () => [
      "Resumo rápido: o que realmente reduz custo",
      "Por que empresas estão migrando para solar",
      "O que encarece o projeto (e como evitar)",
      "Dimensionamento: consumo x demanda",
      "Payback e previsibilidade: como avaliar",
      "Checklist: o que exigir no orçamento",
      "Perguntas frequentes (FAQ)",
      "Atendimento Ilumina Sun: RJ e Região",
    ],
    []
  );

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
          <Link href="/blog">
            <a className="hover:text-primary">Blog</a>
          </Link>
          <span>•</span>
          <span className="truncate">Comercial</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Coluna principal */}
          <div className="space-y-8">
            <header className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Comercial · Empresas
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>

              <p className="text-base text-muted-foreground sm:text-lg">{description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>20/11/2024</span>
                <span>•</span>
                <span>7 min de leitura</span>
              </div>

              <figure className="mt-6 overflow-hidden rounded-2xl border border-border bg-muted">
                <img
                  src={HERO_IMAGE}
                  alt={HERO_ALT}
                  className="h-[340px] w-full object-cover sm:h-[420px]"
                  loading="eager"
                  decoding="async"
                />
                <figcaption className="px-4 py-3 text-xs text-muted-foreground">{HERO_CAPTION}</figcaption>
              </figure>

              {/* CTAs acima da dobra */}
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Link href="/simulador">
                  <a className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-95">
                    Simular economia agora
                  </a>
                </Link>
                <Link href="/contato">
                  <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-muted">
                    Falar com especialista
                  </a>
                </Link>
              </div>

              <div className="pt-2">
                <ShareBar title={title} url={CANONICAL} slug={POST_SLUG} contentType="blog" heading="" />
              </div>
            </header>

            <div className="prose prose-slate mt-10 max-w-none dark:prose-invert">
              <h2 id={slugifyId(toc[0])}>{toc[0]}</h2>

              <div className="not-prose rounded-2xl border border-border bg-muted/30 p-5">
                <ul className="m-0 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li>
                    O ganho é maior quando a empresa tem <strong>consumo relevante em horário comercial</strong> e quer reduzir exposição a reajustes.
                  </li>
                  <li>
                    O orçamento precisa separar <strong>energia (kWh)</strong> de <strong>demanda (kW)</strong>: projetos industriais costumam exigir olhar para os dois.
                  </li>
                  <li>
                    O “barato” vira caro quando falta escopo elétrico, homologação, proteções (DPS) e documentação (ART).
                  </li>
                  <li>
                    Payback bom é o que se sustenta com premissas conservadoras (tarifa, perdas, sazonalidade, manutenção e garantias).
                  </li>
                </ul>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Link href="/simulador">
                    <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted">
                      Simular com meu consumo
                    </a>
                  </Link>
                  <Link href="/contato">
                    <a className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95">
                      Pedir análise do meu caso
                    </a>
                  </Link>
                </div>
              </div>

              <h2 id={slugifyId(toc[1])}>{toc[1]}</h2>
              <ul>
                <li>
                  <strong>Redução de custo no médio/longo prazo</strong> com previsibilidade.
                </li>
                <li>
                  <strong>Proteção contra aumentos</strong> na tarifa e melhor planejamento financeiro.
                </li>
                <li>
                  <strong>Competitividade</strong> (ESG, margem, preço final) e reputação.
                </li>
              </ul>

              <h2 id={slugifyId(toc[2])}>{toc[2]}</h2>
              <p>
                Os principais multiplicadores de custo em projetos comerciais/industriais são previsíveis: reforço estrutural, elétrica (quadros, proteções,
                adequações), distância de cabos, sombreamento e exigências da distribuidora.
              </p>
              <p>
                Como evitar surpresa: proposta com escopo fechado, memorial/ART, lista de materiais (marca/modelo), cronograma e o que está incluído na
                homologação.
              </p>

              <h2 id={slugifyId(toc[3])}>{toc[3]}</h2>
              <p>
                Para dimensionar, você precisa cruzar o <strong>perfil de consumo (kWh)</strong> com o horário e, em alguns casos, com a <strong>demanda</strong>.
                Empresas com pico forte podem economizar energia e ainda assim ter conta “pesada” se a demanda contratada estiver mal ajustada.
              </p>

              <h2 id={slugifyId(toc[4])}>{toc[4]}</h2>
              <p>
                Payback não é só “economia máxima”. Um cálculo honesto considera perdas, sazonalidade e custos de manutenção. Se a proposta não mostra as
                premissas (tarifa usada, geração estimada, perdas), o retorno no papel tende a ser otimista.
              </p>

              <h2 id={slugifyId(toc[5])}>{toc[5]}</h2>
              <ul>
                <li>
                  Lista de equipamentos com <strong>marca/modelo</strong> (módulos, inversor, estrutura).
                </li>
                <li>
                  Escopo elétrico: string box, DPS, disjuntores, aterramento, adequações em quadro/padrão.
                </li>
                <li>
                  Engenharia e documentos: layout, memorial, <strong>ART</strong>, homologação e acompanhamento.
                </li>
                <li>
                  Garantias e suporte: prazos, SLA, o que acontece em caso de falha.
                </li>
              </ul>

              <h2 id={slugifyId(toc[6])}>{toc[6]}</h2>
              <details>
                <summary>Energia solar serve para qualquer tipo de empresa?</summary>
                <p>
                  Funciona melhor quando há consumo consistente, espaço para instalação e um perfil tarifário compatível. Em alguns cenários, a solução pode
                  ser híbrida (solar + gestão de demanda).
                </p>
              </details>
              <details>
                <summary>Por que duas propostas podem ter preços tão diferentes?</summary>
                <p>
                  Normalmente por escopo: elétrica, proteções, homologação, qualidade de equipamentos, estrutura e garantia. Compare “o que está incluso”, não
                  só a potência em kWp.
                </p>
              </details>
              <details>
                <summary>Quanto tempo leva um projeto comercial?</summary>
                <p>
                  Depende de disponibilidade de materiais, agenda de instalação e prazos de homologação. Proposta profissional já indica cronograma e
                  dependências.
                </p>
              </details>

              <h2 id={slugifyId(toc[7])}>{toc[7]}</h2>
              <p>
                Atendemos projetos comerciais e industriais em <strong>Rio de Janeiro</strong>, <strong>Niterói</strong>, <strong>São Gonçalo</strong>, <strong>Itaboraí</strong>,
                <strong>Maricá</strong>, <strong>Tanguá</strong> e <strong>Rio Bonito</strong>. Para cada caso, o dimensionamento deve considerar consumo, demanda e o
                cenário de compensação.
              </p>
            </div>

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

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-sm font-semibold">Neste artigo</div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {toc.map((item) => (
                  <li key={item}>
                    <a className="hover:text-primary" href={`#${slugifyId(item)}`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-border pt-4">
                <div className="text-sm font-semibold">Ações rápidas</div>
                <div className="mt-3 flex flex-col gap-2 text-sm">
                  <Link href="/simulador">
                    <a className="hover:text-primary">Simular economia</a>
                  </Link>
                  <Link href="/kit-solar">
                    <a className="hover:text-primary">Ver Kits</a>
                  </Link>
                  <Link href="/contato">
                    <a className="hover:text-primary">Falar com especialista</a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-sm font-semibold">Relacionados</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/blog/financiamento-energia-solar-rj">
                  <a className="hover:text-primary">Financiamento no RJ</a>
                </Link>
                <Link href="/blog/marco-legal-lei-14300-energia-solar-rj">
                  <a className="hover:text-primary">Lei 14.300 (Marco Legal)</a>
                </Link>
                <Link href="/blog/como-escolher-empresa-energia-solar">
                  <a className="hover:text-primary">Como escolher uma empresa</a>
                </Link>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </main>
  );
}
