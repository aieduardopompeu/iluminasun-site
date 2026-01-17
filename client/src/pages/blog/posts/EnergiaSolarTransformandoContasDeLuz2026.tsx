import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

// Capa do artigo (hero). Deve existir em: client/public/blog/energia-solar-transformando-contas-de-luz-2026.webp
const HERO_IMAGE = "/blog/energia-solar-transformando-contas-de-luz-2026.webp";
const HERO_ALT = "Energia solar reduzindo contas de luz no Brasil em 2026";
const HERO_CAPTION =
  "Energia solar em 2026: adoção crescente, economia real e decisões mais técnicas (e menos “achismo”).";
const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";

// Imagem do post (capa dentro do artigo)
const POST_IMAGE_PATH = "/blog/energia-solar-transformando-contas-de-luz-2026.webp";
const POST_IMAGE_ABS = `${SITE_URL}${POST_IMAGE_PATH}`;

// OG (ideal 1200x630). Se você tiver uma OG específica, defina VITE_OG_IMAGE_SOLAR_2026.
const OG_IMAGE = import.meta.env.VITE_OG_IMAGE_SOLAR_2026 || `${SITE_URL}${HERO_IMAGE}`;
// Importante: no blog, o caminho sempre inclui /blog
const POST_PATH = "/blog/energia-solar-transformando-contas-de-luz-2026";
const CANONICAL = `${SITE_URL}${POST_PATH}`;

// Datas para schema (ISO)
const DATE_PUBLISHED = "2026-01-16";
const DATE_MODIFIED = "2026-01-16";

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

function slugifyId(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function EnergiaSolarTransformandoContasDeLuz2026() {
  const title = "Como a Energia Solar Está Transformando as Contas de Luz no Brasil em 2026";

  const description =
    "Entenda como a energia solar está reduzindo contas de luz no Brasil em 2026: adoção, economia real por perfil, principais cuidados no projeto e checklist para fechar com segurança.";

  const keywords =
    "energia solar 2026, conta de luz energia solar, economia energia solar, geração distribuída 2026, energia solar residencial, energia solar comercial, payback energia solar, homologação energia solar, créditos de energia, lei 14300 energia solar";

  const areaCities = useMemo(
    () => ["Rio de Janeiro", "Niterói", "São Gonçalo", "Itaboraí", "Tanguá", "Rio Bonito", "Maricá"],
    []
  );

  const toc = useMemo(
    () => [
      "Resumo executivo: o que está acontecendo em 2026",
      "Adoção da energia solar no Brasil: números que explicam a virada",
      "Por que a conta de luz ficou tão pesada — e como a solar entra nisso",
      "Economia real: quanto o consumidor economiza em 2026",
      "Energia solar em 2026: o que mudou na prática para o consumidor",
      "Energia solar ainda vale a pena com o marco legal?",
      "Erros comuns que reduzem a economia (e como evitar)",
      "Checklist rápido antes de investir em energia solar",
      "FAQ: dúvidas comuns sobre energia solar em 2026",
      "Ilumina Sun: projeto e orientação (RJ e Região)",
    ],
    []
  );

  useEffect(() => {
    document.title = title;

    upsertMetaBy("name", "description", description);
    upsertMetaBy("name", "keywords", keywords);
    upsertLink("canonical", CANONICAL);

    // Open Graph
    upsertMetaBy("property", "og:type", "article");
    upsertMetaBy("property", "og:site_name", "Ilumina Sun");
    upsertMetaBy("property", "og:title", title);
    upsertMetaBy("property", "og:description", description);
    upsertMetaBy("property", "og:url", CANONICAL);
    upsertMetaBy("property", "og:image", OG_IMAGE);

    // Twitter
    upsertMetaBy("name", "twitter:card", "summary_large_image");
    upsertMetaBy("name", "twitter:title", title);
    upsertMetaBy("name", "twitter:description", description);
    upsertMetaBy("name", "twitter:image", OG_IMAGE);
  }, [title, description, keywords]);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: "Energia Solar em 2026", item: CANONICAL },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": CANONICAL },
    headline: title,
    description,
    image: [OG_IMAGE, POST_IMAGE_ABS],
    author: { "@type": "Organization", name: "Equipe Ilumina Sun" },
    publisher: {
      "@type": "Organization",
      name: "Ilumina Sun",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    inLanguage: "pt-BR",
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Ilumina Sun",
    url: SITE_URL,
    areaServed: areaCities.map((c) => ({ "@type": "City", name: c })),
    email: "contato@iluminasun.com.br",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Energia solar em 2026 ainda reduz a conta de luz de forma relevante?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Sim. Na maioria dos cenários, a energia solar continua reduzindo a fatura de forma significativa. O fator decisivo é o dimensionamento correto (consumo real), a modalidade adequada e um processo de homologação sem pendências.",
        },
      },
      {
        "@type": "Question",
        name: "Dá para zerar a conta de luz com energia solar?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Em geral, a conta não zera completamente porque podem existir itens mínimos e/ou componentes tarifários. O objetivo realista é reduzir a maior parte do custo de energia, com economia forte e previsível ao longo do tempo.",
        },
      },
      {
        "@type": "Question",
        name: "O que mais derruba a economia de um projeto solar?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Os maiores vilões são: dimensionamento baseado em estimativa (sem consumo real), sombreamento não analisado, modalidade inadequada e documentação incompleta que gera atraso e retrabalho na homologação.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* JSON-LD (SEO) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-16 md:px-6 lg:px-0">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog">
            <a className="hover:text-primary">Blog</a>
          </Link>
          <span>•</span>
          <span className="truncate">Energia Solar</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <header className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Energia Solar · 2026 · Brasil
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>

              <p className="text-base text-muted-foreground sm:text-lg">
                Em 2026, a energia solar saiu do “talvez” e virou uma decisão financeira: {" "}
                <strong>previsibilidade, redução de custo e proteção contra aumentos na tarifa</strong>. Neste guia, você entende o
                que mudou na prática e como avaliar seu caso com segurança.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>Atualizado em 16/01/2026</span>
                <span>•</span>
                <span>10–13 min de leitura</span>
              </div>

              <figure className="mt-6 overflow-hidden rounded-2xl border border-border bg-muted">
                <img
                  src={POST_IMAGE_PATH}
                  alt="Energia solar reduzindo contas de luz no Brasil em 2026"
                  className="h-[340px] w-full object-cover sm:h-[420px]"
                  loading="eager"
                  decoding="async"
                />
                <figcaption className="px-4 py-3 text-xs text-muted-foreground">
                  Energia solar em 2026: adoção crescente, economia real e decisões mais técnicas (e menos “achismo”).
                </figcaption>
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

              {/* Compartilhamento (padrão do site) */}
              <div className="pt-2"></div>
              <ShareBar
                title={title}
                url={CANONICAL}
                slug="energia-solar-transformando-contas-de-luz-2026"
                contentType="blog"
                heading=""
              />
            </header>

            <div className="prose prose-slate mt-10 max-w-none dark:prose-invert">
              <h2 id={slugifyId(toc[0])}>{toc[0]}</h2>
              <div className="not-prose rounded-2xl border border-border bg-muted/30 p-5">
                <ul className="m-0 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li>Energia solar virou decisão financeira: previsibilidade e proteção contra alta tarifária.</li>
                  <li>A economia depende de projeto bem dimensionado, modalidade correta e homologação sem pendências.</li>
                  <li>O consumidor em 2026 compara engenharia, garantias e suporte — não apenas “kit”.</li>
                  <li>Fluxo seguro: consumo real → análise técnica (sombra/layout) → documentação → instalação → homologação.</li>
                </ul>
              </div>

              <h2 id={slugifyId(toc[1])}>{toc[1]}</h2>
              <p>
                Em 2026, a energia solar deixou de ser um nicho e virou um movimento de massa: mais sistemas instalados, mais ofertas no
                mercado e, principalmente, mais consumidores comparando propostas com foco em <strong>resultado financeiro real</strong>.
              </p>
              <p>
                O que explica essa virada é simples: a conta de luz ficou mais pesada nos últimos anos, e a energia solar passou a ser
                vista como uma forma de <strong>estabilizar custo</strong> no longo prazo, em vez de “apostar” em tarifas futuras.
              </p>

              <h2 id={slugifyId(toc[2])}>{toc[2]}</h2>
              <p>
                Mesmo quando a geração do país melhora, a fatura do consumidor final continua pressionada por uma combinação de custos de
                rede (transmissão e distribuição), encargos e variações tarifárias. O efeito prático é: muita gente sente que a conta
                sobe, mesmo sem mudar o padrão de consumo.
              </p>
              <p>
                A energia solar entra exatamente aqui: ela permite que você produza parte (ou quase toda) a energia que consome, usando
                a rede como suporte. Isso dá ao consumidor algo que a tarifa tradicional não entrega: <strong>previsibilidade</strong>.
              </p>

              <h2 id={slugifyId(toc[3])}>{toc[3]}</h2>
              <p>
                A economia varia por perfil, mas o padrão em projetos bem dimensionados costuma ser forte. O ponto-chave em 2026 é
                abandonar promessas genéricas e trabalhar com <strong>premissas claras</strong>: consumo real, sazonalidade e condições
                do imóvel/empresa.
              </p>

              <h3>Residencial</h3>
              <ul>
                <li>Redução alta na fatura quando o sistema é dimensionado com base no histórico real (kWh).</li>
                <li>Retorno mais previsível quando há boa insolação e pouca sombra.</li>
                <li>Consumo sazonal (verão/inverno) precisa entrar no cálculo para evitar distorções.</li>
              </ul>

              <h3>Comercial</h3>
              <ul>
                <li>Sinergia forte com consumo diurno (horário comercial).</li>
                <li>Economia vira vantagem competitiva: reduz custo operacional mensal.</li>
                <li>Para redes com mais de uma unidade, avaliar modalidade (local/remoto/compartilhada) antes de fechar.</li>
              </ul>

              <h3>Industrial e rural</h3>
              <ul>
                <li>Maior impacto financeiro, com necessidade de engenharia mais detalhada (proteções, demanda, qualidade de energia).</li>
                <li>Robustez e plano de manutenção pesam mais do que “preço de kit”.</li>
                <li>Em áreas rurais, consumo (bombeamento/irrigação/refrigeração) muda o dimensionamento.</li>
              </ul>

              <div className="not-prose my-8 rounded-2xl border border-border bg-background p-5">
                <div className="text-sm font-semibold">Ação recomendada</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Quer um número realista para o seu cenário? Faça a simulação e peça a leitura técnica do consumo, do sombreamento e do
                  enquadramento antes de fechar.
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Link href="/simulador">
                    <a className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95">
                      Simular economia
                    </a>
                  </Link>
                  <Link href="/contato">
                    <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted">
                      Pedir análise
                    </a>
                  </Link>
                </div>
              </div>

              <h2 id={slugifyId(toc[4])}>{toc[4]}</h2>
              <p>
                O mercado amadureceu. Em 2026, o consumidor compara propostas de forma mais objetiva:
              </p>
              <ul>
                <li><strong>Memorial de cálculo e premissas</strong> (consumo, sazonalidade, perdas)</li>
                <li><strong>Garantias</strong> (painéis, inversor, instalação)</li>
                <li><strong>Projeto e documentação</strong> para homologação</li>
                <li><strong>Suporte e pós-venda</strong> (monitoramento, manutenção, atendimento)</li>
              </ul>
              <p>
                Projetos “baratos” sem engenharia e suporte costumam cobrar o preço depois: atraso, pendência e retrabalho.
              </p>

              <h2 id={slugifyId(toc[5])}>{toc[5]}</h2>
              <p>
                Sim. O que decide o resultado é o projeto estar bem fechado, com modalidade correta e homologação sem pendências.
              </p>
              <p>
                Em 2026, energia solar ruim raramente é “problema do setor”. Normalmente é <strong>dimensionamento errado</strong>,{" "}
                <strong>sombreamento ignorado</strong> ou <strong>documentação incompleta</strong>.
              </p>

              <h2 id={slugifyId(toc[6])}>{toc[6]}</h2>
              <ul>
                <li><strong>Dimensionamento no “achismo”</strong>: sem histórico real de kWh.</li>
                <li><strong>Sombra não avaliada</strong>: árvores, prédios, platibandas e antenas derrubam performance.</li>
                <li><strong>Modalidade inadequada</strong>: decisões erradas para quem tem mais de uma unidade/endereços.</li>
                <li><strong>Homologação com pendências</strong>: documentação e padrão de entrada gerando retrabalho.</li>
              </ul>

              <h2 id={slugifyId(toc[7])}>{toc[7]}</h2>
              <ul>
                <li>Consumo médio mensal (kWh) e objetivo (economia, expansão, múltiplas unidades).</li>
                <li>Modalidade definida antes de compra/instalação.</li>
                <li>Layout do telhado e sombreamento validados (foto, drone ou visita técnica).</li>
                <li>Documentação técnica preparada (para evitar pendência e atraso).</li>
                <li>Plano de suporte/pós-venda (monitoramento e manutenção, quando aplicável).</li>
              </ul>

              <h2 id={slugifyId(toc[8])}>{toc[8]}</h2>
              <div className="not-prose space-y-3">
                <details className="rounded-xl border border-border bg-background p-4">
                  <summary className="cursor-pointer text-sm font-semibold">Em 2026, ainda faz sentido investir em energia solar?</summary>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Em grande parte dos casos, sim. A diferença é o nível de exigência: projeto bem dimensionado, documentação e
                    homologação sem pendências.
                  </p>
                </details>

                <details className="rounded-xl border border-border bg-background p-4">
                  <summary className="cursor-pointer text-sm font-semibold">Dá para eliminar totalmente a conta?</summary>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Em geral, não é uma boa promessa. Podem existir itens mínimos e componentes tarifários. O objetivo correto é reduzir
                    a maior parte do custo com previsibilidade.
                  </p>
                </details>

                <details className="rounded-xl border border-border bg-background p-4">
                  <summary className="cursor-pointer text-sm font-semibold">O que mais impacta o retorno do investimento?</summary>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Consumo real (kWh), sombreamento/layout, modalidade, qualidade da execução e velocidade de homologação.
                  </p>
                </details>
              </div>

              <h2 id={slugifyId(toc[9])}>{toc[9]}</h2>
              <div className="not-prose rounded-2xl border border-border bg-primary/5 p-6">
                <h3 className="text-base font-bold">Ilumina Sun — RJ, Niterói, São Gonçalo e Região</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Projetamos e orientamos o caminho de homologação para reduzir risco de pendência e atraso — atendendo{" "}
                  <strong>residencial, comercial, industrial e rural</strong>.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Link href="/simulador">
                    <a className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-95">
                      Simular economia
                    </a>
                  </Link>
                  <Link href="/contato">
                    <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-muted">
                      Solicitar contato
                    </a>
                  </Link>
                </div>

                <div className="mt-5"></div>
              </div>

              <p className="mt-8 text-sm text-muted-foreground">
                Observação: resultados variam conforme distribuidora, insolação, sombreamento, perfil de consumo e enquadramento. Para
                decisões finais, valide seu cenário com base em documentação técnica e no fluxo oficial aplicável.
              </p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-120px)]">
            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-sm font-semibold">Neste artigo</div>
              <nav className="mt-3 space-y-2 text-sm text-muted-foreground">
                {toc.map((h, index) => (
                  <a key={`${h}-${index}`} href={`#${slugifyId(h)}`} className="block hover:text-primary">
                    {h}
                  </a>
                ))}
              </nav>

              <div className="mt-6 border-t border-border pt-5">
                <div className="text-sm font-semibold">Ações rápidas</div>
                <div className="mt-3 flex flex-col gap-2 text-sm">
                  <Link href="/simulador">
                    <a className="text-muted-foreground hover:text-primary">Simular economia</a>
                  </Link>
                  <Link href="/kit-solar">
                    <a className="text-muted-foreground hover:text-primary">Ver Kits</a>
                  </Link>
                  <Link href="/contato">
                    <a className="text-muted-foreground hover:text-primary">Falar com especialista</a>
                  </Link>
                  <Link href="/blog/marco-legal-lei-14300-energia-solar-rj">
                    <a className="text-muted-foreground hover:text-primary">Ler: Lei 14.300 (Marco Legal)</a>
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </main>
  );
}
