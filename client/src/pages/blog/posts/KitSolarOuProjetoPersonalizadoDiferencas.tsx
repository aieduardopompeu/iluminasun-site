import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const HERO_IMAGE = "/blog/kit-solar-ou-projeto-personalizado-diferencas.webp";
const HERO_ALT = "kit-solar-ou-projeto-personalizado-diferencas";
const HERO_CAPTION = "";
const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";

// Imagem do post (capa dentro do artigo)
const POST_IMAGE_PATH = "/blog/kit-solar-ou-projeto-personalizado-diferencas.webp";
const POST_IMAGE_ABS = `${SITE_URL}${POST_IMAGE_PATH}`;

// OG (ideal 1200x630).
const OG_IMAGE = `${SITE_URL}/blog/kit-solar-ou-projeto-personalizado-diferencas.webp`;
const POST_PATH = "/blog/kit-solar-ou-projeto-personalizado-diferencas";
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

export default function KitSolarOuProjetoPersonalizadoDiferencas() {
  const title = "Kit solar ou projeto personalizado: diferenças, riscos e como escolher com segurança";

  const description = "Entenda a diferença entre comprar kit solar e contratar um projeto completo: engenharia, compatibilidade, garantias, instalação, homologação e suporte. Veja quando cada opção faz sentido — com foco em RJ e Região.";

  const keywords = "kit solar vs projeto fotovoltaico, kit energia solar vale a pena, projeto energia solar personalizado, homologação kit solar, inversor compatibilidade, instalação energia solar RJ";

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
      "Resumo rápido: a diferença em uma frase",
      "O que é um kit solar (e o que ele não inclui)",
      "O que é um projeto completo (e por que existe)",
      "Compatibilidade e dimensionamento: onde os erros nascem",
      "Garantias e suporte: o detalhe que pesa no longo prazo",
      "Quando o kit faz sentido (critérios)",
      "Quando o projeto personalizado é a melhor escolha",
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
      { "@type": "ListItem", position: 3, name: "Kit vs projeto", item: CANONICAL },
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
        name: "Comprar kit reduz muito o preço?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pode reduzir em cenários simples, mas o total pode subir se houver adequações, incompatibilidades, necessidade de reforço estrutural ou retrabalho na homologação.",
        },
      },
      {
        "@type": "Question",
        name: "Posso instalar o kit com qualquer instalador?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tecnicamente, pode, mas é importante garantir ART, documentação e responsabilidade técnica, além de experiência com o processo de homologação da distribuidora.",
        },
      },
      {
        "@type": "Question",
        name: "Projeto completo inclui homologação?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Em geral, sim. Um projeto bem contratado considera documentação, solicitação de acesso e acompanhamento até a conexão.",
        },
      },
      {
        "@type": "Question",
        name: "Qual é o maior risco do kit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Subdimensionar, ignorar sombras/estrutura/padrão, e perder a integração de garantias e suporte, gerando custos extras.",
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
          <span className="truncate">Kit x Projeto</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Conteúdo */}
          <div>
            <header className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Decisão · Kit x Projeto · Risco
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Kit solar ou projeto personalizado: entenda as diferenças antes de decidir
              </h1>

              <p className="text-base text-muted-foreground sm:text-lg">
                A decisão entre “comprar um kit” e “contratar um projeto completo” não é só preço. Envolve engenharia, compatibilidade, garantias, instalação e homologação. Este guia te ajuda a escolher com critérios claros e evitar retrabalho.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>Atualizado em 16/01/2026</span>
                <span>•</span>
                <span>9–13 min de leitura</span>
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
                  Kit pode ser bom em cenários simples, mas projeto completo reduz risco e aumenta previsibilidade de economia.
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
                  slug="kit-solar-ou-projeto-personalizado-diferencas"
                  contentType="blog"
                  heading=""
                />
              </div>
            </header>

            {/* Corpo */}
            <div className="prose prose-slate mt-10 max-w-none dark:prose-invert">
              <h2 id={slugifyId(toc[0])}>{toc[0]}</h2>

              <div className="not-prose rounded-2xl border border-border bg-muted/30 p-5">
  <p className="m-0 text-sm text-muted-foreground">
    Se você tiver que resumir em uma frase: <strong>kit é equipamento</strong>; <strong>projeto é resultado</strong> (engenharia + instalação + homologação + suporte).
  </p>
  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
    <Link href="/kit-solar">
      <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted">
        Ver opções de kit
      </a>
    </Link>
    <Link href="/contato">
      <a className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95">
        Validar meu cenário
      </a>
    </Link>
  </div>
</div>

              <h2 id={slugifyId(toc[1])}>{toc[1]}</h2>

              <p>
  Um kit geralmente inclui módulos, inversor e alguns itens básicos. O problema é que, sozinho, ele não responde perguntas críticas:
  seu telhado aguenta? há sombras? a elétrica está adequada? a distribuidora vai aprovar a documentação? quem garante o funcionamento?
</p>
<p>
  Kits funcionam melhor quando o cenário é simples, a instalação é padronizada e existe um instalador experiente assumindo responsabilidade técnica.
</p>

              <h2 id={slugifyId(toc[2])}>{toc[2]}</h2>

              <p>
  Projeto completo normalmente inclui: visita técnica, dimensionamento, layout, especificação compatível de equipamentos, escopo elétrico,
  instalação, documentação (ART) e homologação. Em outras palavras: ele reduz risco e aumenta previsibilidade.
</p>

              <h2 id={slugifyId(toc[3])}>{toc[3]}</h2>

              <p>
  A maioria dos problemas nasce aqui. Exemplos comuns:
</p>
<ul>
  <li><strong>Subdimensionamento</strong>: gera menos do que o esperado e frustra a economia.</li>
  <li><strong>Ignorar sombras</strong>: quedas relevantes em determinados horários/meses.</li>
  <li><strong>Incompatibilidade</strong>: strings e inversor mal casados, limitando performance.</li>
  <li><strong>Elétrica subestimada</strong>: proteções e adequações ausentes.</li>
</ul>
<p>
  Em projeto completo, esses pontos são avaliados antes da compra e instalação.
</p>

              <h2 id={slugifyId(toc[4])}>{toc[4]}</h2>

              <p>
  Uma diferença prática é como a garantia “fecha”. No kit, muitas vezes você tem garantias separadas por componente.
  No projeto, você tende a ter uma responsabilidade centralizada: quem instalou responde por compatibilidade, operação e suporte.
</p>
<p>
  Pergunte sempre: existe monitoramento? como é o SLA de suporte? quem responde se a geração cair?
</p>

              <h2 id={slugifyId(toc[5])}>{toc[5]}</h2>

              <p>Em geral, o kit faz sentido quando:</p>
<ul>
  <li>Seu telhado é simples, com baixa sombra e estrutura em bom estado.</li>
  <li>Você tem instalador qualificado e documentação assegurada.</li>
  <li>Você aceita gerenciar compras, prazos e garantias.</li>
</ul>

              <h2 id={slugifyId(toc[6])}>{toc[6]}</h2>

              <p>O projeto personalizado tende a ser melhor quando:</p>
<ul>
  <li>Há sombras, telhado complexo, múltiplas águas ou limitações de área.</li>
  <li>Você quer previsibilidade de geração/retorno e suporte centralizado.</li>
  <li>Precisa de homologação bem conduzida, sem “ida e volta” de documentos.</li>
  <li>Há múltiplas unidades (condomínio/remote) e necessidade de enquadramento correto.</li>
</ul>

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
