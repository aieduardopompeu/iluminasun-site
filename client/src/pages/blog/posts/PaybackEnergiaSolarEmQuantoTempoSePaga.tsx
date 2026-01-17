import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const HERO_IMAGE = "/blog/payback-energia-solar-em-quanto-tempo-se-paga.webp";
const HERO_ALT = "payback-energia-solar-em-quanto-tempo-se-paga";
const HERO_CAPTION = "";
const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";

// Imagem do post (capa dentro do artigo)
const POST_IMAGE_PATH = "/blog/payback-energia-solar-em-quanto-tempo-se-paga.webp";
const POST_IMAGE_ABS = `${SITE_URL}${POST_IMAGE_PATH}`;

// OG (ideal 1200x630).
const OG_IMAGE = `${SITE_URL}/blog/payback-energia-solar-em-quanto-tempo-se-paga.webp`;
const POST_PATH = "/blog/payback-energia-solar-em-quanto-tempo-se-paga";
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

export default function PaybackEnergiaSolarEmQuantoTempoSePaga() {
  const title = "Payback da energia solar: como calcular retorno, erros comuns e exemplos práticos";

  const description = "Aprenda a calcular payback de energia solar com dados reais: consumo, tarifa, geração estimada, perdas, sazonalidade e custos. Veja exemplos e armadilhas que inflacionam promessas — com foco em RJ e Região.";

  const keywords = "payback energia solar, retorno investimento fotovoltaico, calcular payback placas solares, economia conta de luz, tarifa kWh, energia solar RJ, simular economia solar";

  const areaCities = useMemo(
    () => [
      "Rio de Janeiro",
      "Niterói",
      "São Gonçalo",
      "Itaboraí",
      "Tanguá",
      "Rio Bonito",
      "Maricá",
    ],
    []
  );

  const toc = useMemo(
    () => [
      "Resumo rápido: o que é payback (sem mito)",
      "Dados que você precisa antes de calcular",
      "Passo a passo: fórmula prática de payback",
      "Perdas e sazonalidade: por que seu cálculo deve ter margem",
      "Exemplos (simulados) por perfil de consumo",
      "Erros comuns (que deixam o retorno “bonito” no papel)",
      "Como usar payback para comparar propostas",
      "Perguntas frequentes (FAQ)",
      "Atendimento Ilumina Sun: RJ e Região"
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
      { "@type": "ListItem", position: 3, name: "Payback", item: CANONICAL },
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
        name: "Qual é um payback “bom”?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Depende de tarifa, consumo e custo do projeto. O importante é comparar com o que você paga hoje e usar premissas conservadoras para não se frustrar.",
        },
      },
      {
        "@type": "Question",
        name: "Tarifa vai subir ou cair?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tarifas variam por reajustes e bandeiras. Por isso, uma margem de segurança no cálculo é recomendada.",
        },
      },
      {
        "@type": "Question",
        name: "Payback inclui manutenção?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Deveria incluir pelo menos uma provisão, além de considerar garantia e possibilidade de substituição de componentes ao longo dos anos.",
        },
      },
      {
        "@type": "Question",
        name: "Posso confiar em payback muito baixo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Desconfie quando as premissas não são mostradas. Peça o cálculo detalhado: consumo, tarifa, geração estimada, perdas e custo total.",
        },
      }
    ],
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* JSON-LD (SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-16 md:px-6 lg:px-0">
        {/* Breadcrumb visual */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog">
            <a className="hover:text-primary">Blog</a>
          </Link>
          <span>•</span>
          <span className="truncate">Payback</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Conteúdo */}
          <div>
            <header className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Finanças · Payback · Economia
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Payback da energia solar: em quanto tempo o investimento se paga na prática
              </h1>

              <p className="text-base text-muted-foreground sm:text-lg">
                Payback é a métrica mais citada — e a mais distorcida — quando o assunto é energia solar. Aqui você aprende um método simples e honesto para estimar retorno, entender variáveis e comparar propostas sem cair em promessas irreais.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>Atualizado em 16/01/2026</span>
                <span>•</span>
                <span>10–14 min de leitura</span>
              </div>

              {/* Imagem de capa */}
              <figure className="mt-6 overflow-hidden rounded-2xl border border-border bg-muted">
                <img
                  src={POST_IMAGE_PATH}
                  alt={HERO_ALT}
                  className="h-[340px] w-full object-cover sm:h-[420px]"
                  loading="eager"
                  decoding="async"
                />
                <figcaption className="px-4 py-3 text-xs text-muted-foreground">
                  Retorno depende de tarifa, consumo, geração real, perdas, manutenção e qualidade do dimensionamento.
                </figcaption>
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

              {/* Compartilhamento (padrão do site) */}
              <div className="pt-2">
                <ShareBar
                  title={title}
                  url={CANONICAL}
                  slug="payback-energia-solar-em-quanto-tempo-se-paga"
                  contentType="blog"
                  heading=""
                />
              </div>
            </header>

            {/* Corpo */}
            <div className="prose prose-slate mt-10 max-w-none dark:prose-invert">
              <h2 id={slugifyId(toc[0])}>{toc[0]}</h2>

              <div className="not-prose rounded-2xl border border-border bg-muted/30 p-5">
  <ul className="m-0 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
    <li>Payback é <strong>tempo</strong> para recuperar o investimento, não uma promessa fixa.</li>
    <li>O cálculo precisa de: consumo (kWh), tarifa (R$/kWh), geração estimada e perdas.</li>
    <li>Use premissas conservadoras e compare propostas com o <strong>mesmo</strong> método.</li>
  </ul>
  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
    <Link href="/simulador">
      <a className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95">
        Simular meu payback
      </a>
    </Link>
    <Link href="/contato">
      <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted">
        Validar premissas
      </a>
    </Link>
  </div>
</div>

              <h2 id={slugifyId(toc[1])}>{toc[1]}</h2>

              <p>Antes de calcular, tenha em mãos:</p>
<ul>
  <li>Consumo médio (kWh/mês) e variação sazonal (verão/inverno).</li>
  <li>Tarifa e histórico de bandeiras (quando aplicável).</li>
  <li>Espaço disponível e sombras (impactam geração).</li>
  <li>Custo total do projeto (equipamentos + instalação + elétrica + homologação).</li>
</ul>

              <h2 id={slugifyId(toc[2])}>{toc[2]}</h2>

              <p>Um método prático e transparente:</p>
<ol>
  <li><strong>Economia mensal estimada</strong> ≈ geração compensada (kWh) × tarifa (R$/kWh) – itens mínimos.</li>
  <li><strong>Economia anual</strong> ≈ economia mensal × 12.</li>
  <li><strong>Payback</strong> ≈ custo total / economia anual.</li>
</ol>
<p>
  O segredo é não inflar a geração e não ignorar itens mínimos. Quando a proposta não mostra as premissas, ela não é comparável.
</p>

              <h2 id={slugifyId(toc[3])}>{toc[3]}</h2>

              <p>
  Dois fatores distorcem muito o cálculo: <strong>perdas</strong> (temperatura, cabos, inversor) e <strong>sazonalidade</strong> (mês a mês).
  Por isso, a recomendação é trabalhar com uma margem de segurança e avaliar o retorno no ano, não no melhor mês.
</p>

              <h2 id={slugifyId(toc[4])}>{toc[4]}</h2>

              <p>Exemplos simulados (apenas para entendimento de método):</p>
<ul>
  <li><strong>Perfil A</strong>: consumo menor → investimento menor → retorno pode ser bom se tarifa for alta e telhado favorável.</li>
  <li><strong>Perfil B</strong>: consumo médio → bom equilíbrio entre escala e custo fixo de instalação.</li>
  <li><strong>Perfil C</strong>: consumo alto → grande economia potencial, mas exige engenharia e elétrica mais robustas.</li>
</ul>
<p>
  Para sair do exemplo e ir para o real, use seus kWh e a tarifa no simulador.
</p>

              <h2 id={slugifyId(toc[5])}>{toc[5]}</h2>

              <p>Os erros mais comuns:</p>
<ul>
  <li>Prometer “conta zerada” como regra.</li>
  <li>Usar geração otimista sem perdas.</li>
  <li>Comparar potência (kWp) sem comparar geração (kWh).</li>
  <li>Ignorar custos e garantias no longo prazo.</li>
</ul>

              <h2 id={slugifyId(toc[6])}>{toc[6]}</h2>

              <p>Para comparar propostas, exija que todas mostrem:</p>
<ul>
  <li>Premissas (tarifa, perdas, geração estimada).</li>
  <li>Escopo (elétrica/homologação inclusas).</li>
  <li>Garantias e suporte.</li>
</ul>
<p>
  Payback é útil, mas deve andar junto com qualidade e risco. Um retorno “um pouco maior” com execução sólida costuma ser melhor do que um retorno “milagroso”.
</p>

              <h2 id={slugifyId(toc[7])}>{toc[7]}</h2>

              <div className="not-prose space-y-3">
  <details className="rounded-xl border border-border bg-background p-4">
    <summary className="cursor-pointer text-sm font-semibold">
      Quanto eu consigo economizar, em média?
    </summary>
    <p className="mt-2 text-sm text-muted-foreground">
      Depende do seu consumo (kWh), tarifa, insolação, sombreamento e dimensionamento. O mais confiável é simular com seus dados e validar com visita técnica.
    </p>
  </details>

  <details className="rounded-xl border border-border bg-background p-4">
    <summary className="cursor-pointer text-sm font-semibold">
      Preciso mudar meu padrão de energia para instalar?
    </summary>
    <p className="mt-2 text-sm text-muted-foreground">
      Em muitos casos não, mas pode haver adequações no quadro, proteções, aterramento e padrão conforme exigência da distribuidora.
    </p>
  </details>

  <details className="rounded-xl border border-border bg-background p-4">
    <summary className="cursor-pointer text-sm font-semibold">
      O que mais atrasa um projeto?
    </summary>
    <p className="mt-2 text-sm text-muted-foreground">
      Documentação incompleta, enquadramento errado (modalidade), e dimensionamento sem visita técnica (sombreamento/estrutura/padrão).
    </p>
  </details>
</div>

              <h2 id={slugifyId(toc[toc.length - 1])}>{toc[toc.length - 1]}</h2>
              <div className="not-prose rounded-2xl border border-border bg-primary/5 p-6">
                <h3 className="text-base font-bold">Atendemos RJ e Região com projeto + homologação orientada</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Se você está em <strong>Rio de Janeiro, Niterói, São Gonçalo, Itaboraí, Tanguá, Rio Bonito ou Maricá</strong>, a Ilumina Sun
                  faz o diagnóstico (residencial, comercial, industrial ou rural), dimensiona e orienta o caminho técnico e regulatório.
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
                  <Link href="/servicos">
                    <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-muted">
                      Ver serviços
                    </a>
                  </Link>
                </div>
              </div>

              <hr />

              <p className="text-sm text-muted-foreground">
                <strong>Observação:</strong> este conteúdo é educativo e não substitui uma avaliação técnica do seu imóvel, consumo e regras da sua distribuidora.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-120px)]">
            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-sm font-semibold">Neste artigo</div>

              <nav className="mt-3 space-y-2 text-sm text-muted-foreground">
                {toc.map((h, index) => (
                  <a
                    key={`${h}-${index}`}
                    href={`#${slugifyId(h)}`}
                    className="block hover:text-primary"
                  >
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
                </div>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </main>
  );
}
