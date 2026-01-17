import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const HERO_IMAGE = "/blog/marco-legal-energia-solar-lei-14300-explicado.webp";
const HERO_ALT = "marco-legal-energia-solar-lei-14300-explicado";
const HERO_CAPTION = "";
const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";

// Imagem do post (capa dentro do artigo)
const POST_IMAGE_PATH = "/blog/marco-legal-energia-solar-lei-14300-explicado.webp";
const POST_IMAGE_ABS = `${SITE_URL}${POST_IMAGE_PATH}`;

// OG (ideal 1200x630).
const OG_IMAGE = `${SITE_URL}/blog/marco-legal-energia-solar-lei-14300-explicado.webp`;
const POST_PATH = "/blog/marco-legal-energia-solar-lei-14300-explicado";
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

export default function MarcoLegalEnergiaSolarLei14300Explicado() {
  const title = "Marco legal da energia solar (Lei 14.300): o que mudou, regras de transição e impactos na sua conta";

  const description = "Entenda a Lei 14.300 e as regras da geração distribuída: compensação de créditos, transição, por que a conta pode não zerar e como planejar seu sistema com previsibilidade — com foco em RJ e Região.";

  const keywords = "lei 14300 energia solar, marco legal geração distribuída, compensação de créditos SCEE, energia solar conta não zera, regras de transição GD, energia solar RJ, ANEEL geração distribuída";

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
      "Resumo rápido: o que a lei muda para o consumidor",
      "O que é geração distribuída e como funciona a compensação",
      "Regras de transição: por que existem e como pensar nelas",
      "Por que a conta pode não zerar (sem surpresa)",
      "Modalidades: autoconsumo remoto, condomínios e compartilhada",
      "O que exigir da empresa instaladora (documentos e garantias)",
      "Planejamento prático: como decidir o tamanho do sistema",
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
      { "@type": "ListItem", position: 3, name: "Marco legal (Lei 14.300)", item: CANONICAL },
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
        name: "A Lei 14.300 acabou com a energia solar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Não. Ela manteve a geração distribuída, definiu regras e transição e trouxe previsibilidade regulatória. O consumidor continua podendo gerar e compensar conforme as normas.",
        },
      },
      {
        "@type": "Question",
        name: "Por que algumas pessoas dizem que “a conta não zera”?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Porque permanecem itens mínimos e componentes tarifários e, em alguns casos, regras de faturamento podem limitar a compensação integral de determinadas parcelas.",
        },
      },
      {
        "@type": "Question",
        name: "Ainda vale a pena instalar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Para a maioria dos perfis, sim, mas depende de consumo, tarifa, telhado e dimensionamento. O ponto central é fazer o cálculo com dados reais e com projeto bem feito.",
        },
      },
      {
        "@type": "Question",
        name: "O que é SCEE?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "É o Sistema de Compensação de Energia Elétrica: excedentes viram créditos para abater consumo futuro, conforme regras vigentes e cadastro correto na distribuidora.",
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
          <span className="truncate">Marco legal</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Conteúdo */}
          <div>
            <header className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Regulação · Lei 14.300 · GD
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Marco legal da energia solar (Lei 14.300): o que mudou e como isso afeta sua conta de luz
              </h1>

              <p className="text-base text-muted-foreground sm:text-lg">
                A Lei 14.300 reorganizou a geração distribuída no Brasil e trouxe regras de transição. Aqui você entende, sem juridiquês, o que muda na prática, por que a conta não “zera” em alguns casos e como planejar seu sistema com previsibilidade.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>Atualizado em 16/01/2026</span>
                <span>•</span>
                <span>11–15 min de leitura</span>
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
                  Marco legal e regras de transição influenciam faturamento, compensação e expectativa de economia.
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
                  slug="marco-legal-energia-solar-lei-14300-explicado"
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
    <li>A Lei 14.300 organizou a <strong>geração distribuída</strong> e estabeleceu regras de transição.</li>
    <li>O excedente pode virar <strong>créditos</strong> no <strong>SCEE</strong>, mas a conta pode manter itens mínimos e componentes tarifários.</li>
    <li>O efeito prático para você é: dimensionamento correto + documentação/homologação bem conduzida = previsibilidade.</li>
  </ul>
  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
    <Link href="/blog/regulamentacao-aneel-energia-solar">
      <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted">
        Ver guia ANEEL (GD)
      </a>
    </Link>
    <Link href="/simulador">
      <a className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95">
        Simular economia
      </a>
    </Link>
  </div>
</div>

              <h2 id={slugifyId(toc[1])}>{toc[1]}</h2>

              <p>
  Geração distribuída é quando você gera energia perto do consumo (casa, comércio, indústria ou área rural). Em sistemas conectados à rede,
  parte do que você gera é consumida na hora; o excedente pode ser injetado na rede e convertido em créditos conforme o SCEE.
</p>
<p>
  A lei não “promete conta zerada”; ela estrutura direitos e deveres: como conectar, como compensar e como faturar.
</p>

              <h2 id={slugifyId(toc[2])}>{toc[2]}</h2>

              <p>
  Regras de transição existem para equilibrar a expansão da GD com a sustentabilidade do sistema elétrico. Para o consumidor, isso significa:
  compreender que existem componentes tarifários e itens mínimos que podem permanecer, além de prazos e condições que variam conforme enquadramento.
</p>
<p>
  Na prática, a forma de evitar frustração é dimensionar com base no seu consumo real, considerar margens e acompanhar as primeiras faturas.
</p>

              <h2 id={slugifyId(toc[3])}>{toc[3]}</h2>

              <p>
  Mesmo com energia solar, sua conta pode incluir: custo de disponibilidade, tarifas mínimas, iluminação pública e outros componentes.
  Isso não significa que “não funcionou”; significa que existe uma parte do serviço de distribuição e encargos que não é compensada como você imaginava.
</p>
<p>
  O objetivo correto é reduzir fortemente o que é variável (energia) e ganhar previsibilidade.
</p>

              <h2 id={slugifyId(toc[4])}>{toc[4]}</h2>

              <p>
  Além do autoconsumo no mesmo imóvel, existem modalidades para abater consumo em múltiplas unidades, conforme regras:
</p>
<ul>
  <li><strong>Autoconsumo remoto</strong>: quando o titular compensa em outra unidade cadastrada corretamente.</li>
  <li><strong>Condomínios/múltiplas unidades</strong>: rateio de créditos por unidade.</li>
  <li><strong>Geração compartilhada</strong>: organização entre participantes, conforme enquadramento e cadastro.</li>
</ul>
<p>
  O erro mais comum é instalar pensando em uma modalidade e, depois, tentar enquadrar em outra.
</p>

              <h2 id={slugifyId(toc[5])}>{toc[5]}</h2>

              <p>Para reduzir risco e atraso, exija:</p>
<ul>
  <li>Responsabilidade técnica (ART) e documentação do projeto.</li>
  <li>Escopo claro de homologação e acompanhamento.</li>
  <li>Proposta com marcas/modelos e garantias por escrito.</li>
  <li>Estimativa de geração com perdas realistas (sem “milagre”).</li>
</ul>

              <h2 id={slugifyId(toc[6])}>{toc[6]}</h2>

              <p>
  Um bom planejamento começa no consumo (kWh) e termina na fatura. Em vez de “chutar” potência, faça o caminho:
</p>
<ol>
  <li>Consumo médio e sazonalidade (verão/inverno).</li>
  <li>Telhado: área, orientação e sombras.</li>
  <li>Meta: reduzir quanto da fatura? (total não é sempre possível).</li>
  <li>Proposta com geração estimada e payback conservador.</li>
</ol>

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
