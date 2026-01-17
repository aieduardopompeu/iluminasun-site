import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";

const POST_SLUG = "tendencias-mercado-solar-2026";
const POST_PATH = `/blog/${POST_SLUG}`;
const CANONICAL = `${SITE_URL}${POST_PATH}`;

const HERO_IMAGE = "/blog/tendencias-mercado-solar-2026.webp";
const HERO_ALT = "Tendências do mercado solar em 2026: preços, eficiência, baterias e regulação.";
const HERO_CAPTION =
  "Tendências 2026: eficiência, baterias, inversores, regulação e oportunidades para residencial e empresas.";

const OG_IMAGE = `${SITE_URL}${HERO_IMAGE}`;

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

function slugifyId(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function TendenciasMercadoSolar2026() {
  const pageTitle = "Tendências do Mercado Solar em 2026: O Que Esperar | Ilumina Sun";
  const title = "Tendências do Mercado Solar em 2026: O Que Esperar";
  const description =
    "Principais tendências para 2026 no setor solar: preço de equipamentos, eficiência, armazenamento (baterias), inversores, regulação e oportunidades para residencial, comercial e industrial no RJ e região.";

  const toc = useMemo(
    () => [
      "Resumo rápido: o que realmente muda em 2026",
      "Preços e equipamentos: onde caiu e onde ainda encarece",
      "Eficiência, microinversores e inversores: o que está virando padrão",
      "Baterias e armazenamento: quando faz sentido e quando não",
      "Regulação e cenário no Brasil: o que observar",
      "Checklist: como aproveitar as tendências sem cair em modismo",
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
          <Link href="/blog">
            <a className="hover:text-primary">Blog</a>
          </Link>
          <span>•</span>
          <span className="truncate">Mercado</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Coluna principal */}
          <div className="space-y-8">
            <header className="space-y-4">
              <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Mercado · Tendências · 2026
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>

              <p className="text-base text-muted-foreground sm:text-lg">{description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>15/11/2025</span>
                <span>•</span>
                <span>10–13 min de leitura</span>
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
                    Em 2026, o mercado está menos "achismo" e mais <strong>engenharia + dados</strong>: consumo, tarifa,
                    perdas e projeto fechado.
                  </li>
                  <li>
                    Equipamentos melhoraram, mas o que mais encarece ainda é <strong>escopo elétrico</strong>, estrutura e
                    complexidade do telhado.
                  </li>
                  <li>
                    Baterias ganharam espaço, porém continuam fazendo sentido só em cenários específicos (backup,
                    autoconsumo elevado, tarifas e uso).
                  </li>
                  <li>
                    O padrão de qualidade que separa um projeto bom de um ruim: <strong>monitoramento + garantia + pós-venda</strong>.
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
              <p>
                O componente "equipamento" tem ficado mais previsível, mas não significa que todo orçamento cai. Onde você
                vê variação real:
              </p>
              <ul>
                <li>
                  <strong>Módulos</strong>: maior eficiência por m² ajuda telhados menores, mas marcas e garantias mudam o
                  preço.
                </li>
                <li>
                  <strong>Inversores</strong>: soluções mais robustas (monitoramento, proteções, maior faixa de MPPT)
                  elevam o custo, porém reduzem dor de cabeça.
                </li>
                <li>
                  <strong>Estrutura/instalação</strong>: telha frágil, altura, acesso, maresia e reforços estruturais ainda
                  pesam bastante.
                </li>
              </ul>

              <h2 id={slugifyId(toc[2])}>{toc[2]}</h2>
              <p>
                A tendência prática é aumentar a confiabilidade e reduzir gargalos de geração. Alguns pontos que você vai
                ver mais em projetos bons:
              </p>
              <ul>
                <li>
                  <strong>Otimização por string</strong> e cuidado com sombreamento (layout e projeto elétrico bem fechados).
                </li>
                <li>
                  <strong>Microinversores</strong> ou soluções híbridas quando o telhado é muito recortado/sombreado.
                </li>
                <li>
                  <strong>Monitoramento melhor</strong>: alertas e visibilidade real de performance (não só “gerou”).
                </li>
              </ul>

              <h2 id={slugifyId(toc[3])}>{toc[3]}</h2>
              <p>
                Armazenamento está crescendo, mas o cálculo é objetivo: você precisa comparar custo da bateria x economia
                real (autoconsumo) + valor do backup.
              </p>
              <ul>
                <li>
                  Faz sentido quando há <strong>queda frequente de energia</strong>, carga crítica (home office, saúde,
                  segurança) ou uso noturno alto.
                </li>
                <li>
                  Pode não fazer sentido se sua economia já é alta só com compensação e você tem pouca necessidade de
                  backup.
                </li>
              </ul>

              <h2 id={slugifyId(toc[4])}>{toc[4]}</h2>
              <p>
                O cenário brasileiro segue orientado por regras de compensação e prazos de transição. Na prática, o que
                muda é o comportamento do consumidor e a exigência de projeto "redondo": documentação, proteções e
                homologação bem conduzida.
              </p>
              <p>
                Se você está no RJ e Região, vale atenção extra com maresia (corrosão), padrão de entrada e exigências da
                distribuidora no processo de acesso.
              </p>

              <h2 id={slugifyId(toc[5])}>{toc[5]}</h2>
              <ul>
                <li>
                  Exija proposta com <strong>marca/modelo</strong> de equipamentos, escopo elétrico e homologação descritos.
                </li>
                <li>
                  Compare propostas pela mesma métrica: potência (kWp), geração estimada (kWh) e perdas assumidas.
                </li>
                <li>
                  Confirme garantias (módulos, inversor, instalação) e como funciona o suporte.
                </li>
                <li>
                  Se prometer economia “perfeita”, desconfie: sazonalidade e sombras mudam o resultado.
                </li>
              </ul>

              <h2 id={slugifyId(toc[6])}>{toc[6]}</h2>
              <details>
                <summary>Vale a pena esperar mais para comprar porque o preço vai cair?</summary>
                <p>
                  Em muitos casos, a economia começa quando o sistema entra em operação. O melhor critério é comparar o
                  custo total do projeto com a economia anual esperada, e não tentar “acertar o fundo do preço”.
                </p>
              </details>
              <details>
                <summary>Microinversor é sempre melhor?</summary>
                <p>
                  Não. Em telhados simples e sem sombras, inversores string são excelentes. Microinversores brilham em
                  telhados complexos/sombreados e quando você quer granularidade por módulo.
                </p>
              </details>
              <details>
                <summary>Bateria zera a conta?</summary>
                <p>
                  Bateria ajuda a aumentar autoconsumo e dá backup, mas "zerar" depende de consumo, tarifa, perfil de uso
                  e dimensionamento. O cálculo deve ser feito com premissas conservadoras.
                </p>
              </details>

              <h2 id={slugifyId(toc[7])}>{toc[7]}</h2>
              <div className="not-prose rounded-2xl border border-border bg-primary/5 p-5">
                <div className="text-sm font-semibold">Atendemos RJ e Região com projeto e homologação orientada</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Se você está em Rio de Janeiro, Niterói, São Gonçalo, Itaboraí, Tanguá, Rio Bonito ou Maricá, a Ilumina
                  Sun faz o diagnóstico (residencial/comercial/industrial/rural), dimensiona e orienta o caminho técnico.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Link href="/simulador">
                    <a className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95">
                      Simular economia
                    </a>
                  </Link>
                  <Link href="/contato">
                    <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted">
                      Solicitar contato
                    </a>
                  </Link>
                </div>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Observação: este conteúdo é educativo e não substitui uma avaliação técnica do seu imóvel, consumo e
                regras da sua distribuidora.
              </p>
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
            </div>

            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-sm font-semibold">Ações rápidas</div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/simulador">
                    <a className="hover:text-primary">Simular economia</a>
                  </Link>
                </li>
                <li>
                  <Link href="/kit-solar">
                    <a className="hover:text-primary">Ver Kits</a>
                  </Link>
                </li>
                <li>
                  <Link href="/contato">
                    <a className="hover:text-primary">Falar com especialista</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-sm font-semibold">Relacionados</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/blog/quanto-custa-energia-solar-brasil-2026">
                  <a className="hover:text-primary">Quanto custa energia solar em 2026</a>
                </Link>
                <Link href="/blog/payback-energia-solar-em-quanto-tempo-se-paga">
                  <a className="hover:text-primary">Payback: em quanto tempo se paga</a>
                </Link>
                <Link href="/blog/marco-legal-lei-14300-energia-solar-rj">
                  <a className="hover:text-primary">Lei 14.300 (Marco Legal)</a>
                </Link>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </main>
  );
}
