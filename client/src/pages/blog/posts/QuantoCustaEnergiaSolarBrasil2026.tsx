import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const HERO_IMAGE = "/blog/quanto-custa-energia-solar-brasil-2026.webp";
const HERO_ALT = "quanto-custa-energia-solar-brasil-2026";
const HERO_CAPTION = "";
const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";

// Imagem do post (capa dentro do artigo)
const POST_IMAGE_PATH = "/blog/quanto-custa-energia-solar-brasil-2026.webp";
const POST_IMAGE_ABS = `${SITE_URL}${POST_IMAGE_PATH}`;

// OG (ideal 1200x630).
const OG_IMAGE = `${SITE_URL}/blog/quanto-custa-energia-solar-brasil-2026.webp`;
const POST_PATH = "/blog/quanto-custa-energia-solar-brasil-2026";
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

export default function QuantoCustaEnergiaSolarBrasil2026() {
  const title = "Quanto custa energia solar no Brasil em 2026? Guia completo com valores e fatores que mudam o preço";

  const description = "Entenda o que compõe o custo de um sistema fotovoltaico em 2026 (equipamentos, instalação, homologação, garantias), faixas por consumo e como estimar retorno com segurança — com foco em RJ e Região.";

  const keywords = "quanto custa energia solar 2026, preço energia solar brasil, valor sistema fotovoltaico, custo instalação placas solares, inversor fotovoltaico preço, homologação energia solar, energia solar RJ, payback energia solar";

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
      "Resumo rápido: o que define o preço",
      "Quanto custa energia solar em 2026: faixas por consumo",
      "O que compõe o orçamento (itens que você deve exigir)",
      "O que mais encarece (e como evitar surpresas)",
      "Kit x projeto completo: por que o barato pode sair caro",
      "Como comparar propostas: checklist objetivo",
      "Como estimar payback sem se enganar",
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
      { "@type": "ListItem", position: 3, name: "Quanto custa energia solar em 2026", item: CANONICAL },
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
        name: "Qual é o preço médio de um sistema residencial?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Varia por consumo, telhado e equipamentos. O mais confiável é estimar por faixa de kWh e validar com visita técnica para evitar subdimensionamento ou gastos com adequações.",
        },
      },
      {
        "@type": "Question",
        name: "O orçamento inclui homologação na distribuidora?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Deve incluir. A homologação envolve solicitação de acesso, documentação técnica e acompanhamento do processo com a distribuidora.",
        },
      },
      {
        "@type": "Question",
        name: "Posso economizar comprando equipamentos por conta própria?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Às vezes, mas você pode perder compatibilidade, garantia integrada e suporte. Em geral, o ganho no preço precisa ser comparado ao risco técnico e ao custo de retrabalho.",
        },
      },
      {
        "@type": "Question",
        name: "O que muda o preço entre casas semelhantes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sombreamento, tipo de telha, estrutura, distância do quadro, padrão de entrada, necessidade de reforço e a qualidade do inversor/garantias.",
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
          <span className="truncate">Custos</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Conteúdo */}
          <div>
            <header className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Custos · Orçamento · 2026
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Quanto custa energia solar no Brasil em 2026? Guia completo com valores reais
              </h1>

              <p className="text-base text-muted-foreground sm:text-lg">
                Veja o que realmente entra no preço de um sistema fotovoltaico (sem pegadinha): equipamentos, engenharia, instalação, homologação e garantias. No fim, você sai com um método prático para estimar seu orçamento e comparar propostas com segurança.
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
                  Preço de energia solar em 2026 depende de consumo, telhado, sombreamento, equipamento e qualidade do projeto.
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
                  slug="quanto-custa-energia-solar-brasil-2026"
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
    <li><strong>Preço final</strong> é a soma de equipamentos + engenharia + instalação + elétrica + homologação + garantia + pós-venda.</li>
    <li>O que muda mais o orçamento é <strong>consumo (kWh)</strong>, <strong>sombreamento</strong>, tipo de telha/estrutura e distância até o quadro/padrão.</li>
    <li>Desconfie de propostas sem marca/modelo de equipamentos, sem escopo de elétrica e sem explicitar homologação.</li>
    <li>Para comparar com justiça, use o mesmo critério: potência instalada, estimativa de geração, perdas assumidas e garantia.</li>
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
  Em 2026, o mercado tem grande variação de preços por região, marcas e qualidade de escopo. Em vez de decorar um número,
  o caminho mais seguro é pensar em <strong>faixas</strong> e em como seu consumo (kWh) se converte em potência necessária.
</p>
<p>
  Como referência prática, muitos orçamentos residenciais ficam distribuídos em faixas que acompanham o consumo:
</p>
<ul>
  <li><strong>Baixo consumo</strong> (até ~250 kWh/mês): sistemas menores, geralmente mais simples de instalar.</li>
  <li><strong>Médio consumo</strong> (~250–500 kWh/mês): já exige atenção a sombreamento, layout e elétrica.</li>
  <li><strong>Alto consumo</strong> (acima de ~500 kWh/mês): pode exigir reforço estrutural, mais strings e planejamento de inversor.</li>
</ul>
<p>
  A melhor comparação é sempre feita com três dados: seu consumo médio, a tarifa e a estimativa de geração mensal com perdas realistas.
</p>

              <h2 id={slugifyId(toc[2])}>{toc[2]}</h2>

              <p>Um orçamento profissional deve explicitar, no mínimo, os seguintes itens:</p>
<ul>
  <li><strong>Módulos (placas)</strong>: marca/modelo, potência unitária, quantidade, garantias.</li>
  <li><strong>Inversor</strong>: marca/modelo, potência, garantias e condições de instalação (ventilação, proteção).</li>
  <li><strong>Estrutura</strong>: tipo (telha, laje, solo), fixação e proteção contra corrosão (importante em áreas com maresia).</li>
  <li><strong>Elétrica</strong>: string box, DPS, disjuntores, aterramento, adequações no quadro/padrão.</li>
  <li><strong>Engenharia</strong>: diagrama, memorial, ART/responsabilidade técnica e layout.</li>
  <li><strong>Homologação</strong>: solicitação de acesso, documentação e acompanhamento com a distribuidora.</li>
  <li><strong>Monitoramento</strong>: como você acompanha geração e alertas de falha.</li>
</ul>
<p>
  Quando um desses blocos não aparece, o “preço baixo” costuma ser apenas um preço <em>incompleto</em>.
</p>

              <h2 id={slugifyId(toc[3])}>{toc[3]}</h2>

              <p>Os maiores multiplicadores de custo (e de atraso) são previsíveis:</p>
<ul>
  <li><strong>Sombreamento</strong> sem estudo: reduz geração e pode exigir reorganização do layout ou tecnologia diferente.</li>
  <li><strong>Estrutura frágil</strong> ou telhado antigo: pode exigir reforço antes de instalar.</li>
  <li><strong>Distância/rota de cabos</strong>: percurso longo aumenta material e mão de obra.</li>
  <li><strong>Padrão de entrada</strong> fora do esperado: adequações podem ser necessárias para conformidade.</li>
  <li><strong>Maresia</strong> e ambientes agressivos: pedem componentes e fixações mais adequados.</li>
</ul>
<p>
  A forma correta de evitar surpresas é simples: <strong>visita técnica</strong> e proposta com escopo detalhado.
</p>

              <h2 id={slugifyId(toc[4])}>{toc[4]}</h2>

              <p>
  Um kit pode atender bem cenários simples, mas ele não resolve automaticamente: sombras, estrutura, elétrica, homologação e garantia integrada.
  Já o projeto completo “fecha o ciclo”: dimensiona, instala, documenta e acompanha até a conexão.
</p>
<p>
  Se você está comparando propostas, procure responder: <strong>quem assina a responsabilidade técnica</strong>, quem responde por suporte e
  se o cálculo de geração é conservador.
</p>

              <h2 id={slugifyId(toc[5])}>{toc[5]}</h2>

              <p>Use este checklist rápido para comparar propostas de forma justa:</p>
<ul>
  <li>Potência total instalada (kWp) e estimativa de geração mensal (kWh) com perdas.</li>
  <li>Marca/modelo de módulos e inversor + garantias por escrito.</li>
  <li>Escopo elétrico e itens de proteção (DPS, disjuntores, aterramento).</li>
  <li>Homologação inclusa? O que exatamente está incluso?</li>
  <li>Prazo, condições de pagamento e cronograma.</li>
  <li>Suporte e monitoramento pós-instalação.</li>
</ul>

              <h2 id={slugifyId(toc[6])}>{toc[6]}</h2>

              <p>
  Para estimar payback, não use apenas “economia máxima”. Use premissas conservadoras: uma margem para perdas,
  variações sazonais e itens mínimos na conta.
</p>
<ol>
  <li>Defina consumo médio (kWh/mês) e tarifa (R$/kWh).</li>
  <li>Estime geração com margem (perdas e sazonalidade).</li>
  <li>Converta geração em economia mensal aproximada.</li>
  <li>Payback ≈ custo total / economia anual.</li>
</ol>
<p>
  Se quiser, use o <Link href="/simulador"><a>Simulador</a></Link> para começar pelo seu consumo real.
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
