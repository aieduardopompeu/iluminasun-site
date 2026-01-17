import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const HERO_IMAGE = "/blog/vida-util-e-manutencao-paineis-solares.webp";
const HERO_ALT = "vida-util-e-manutencao-paineis-solares";
const HERO_CAPTION = "";
const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";

// Imagem do post (capa dentro do artigo)
const POST_IMAGE_PATH = "/blog/vida-util-e-manutencao-paineis-solares.webp";
const POST_IMAGE_ABS = `${SITE_URL}${POST_IMAGE_PATH}`;

// OG (ideal 1200x630).
const OG_IMAGE = `${SITE_URL}/blog/vida-util-e-manutencao-paineis-solares.webp`;
const POST_PATH = "/blog/vida-util-e-manutencao-paineis-solares";
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

export default function VidaUtilEManutencaoPaineisSolares() {
  const title = "Vida útil e manutenção de painéis solares: garantias, cuidados e custos ao longo do tempo";

  const description = "Entenda a vida útil real de módulos, inversores e estruturas; o que as garantias cobrem; quais manutenções fazem sentido; e como planejar custos ao longo dos anos — com foco em RJ e Região.";

  const keywords = "vida útil painel solar, manutenção energia solar, garantia módulos fotovoltaicos, garantia inversor, limpeza placas solares, degradação painéis, energia solar RJ";

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
      "Resumo rápido: o que dura mais e o que dura menos",
      "Módulos: degradação, garantia e o que observar",
      "Inversores: por que são o “coração” do sistema",
      "Estrutura e elétrica: segurança e conformidade",
      "Limpeza: quando vale a pena (e quando é excesso)",
      "Manutenção preventiva: checklist anual",
      "Custos ao longo do tempo: como planejar",
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
      { "@type": "ListItem", position: 3, name: "Vida útil e manutenção", item: CANONICAL },
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
        name: "Preciso limpar as placas todo mês?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Na maioria dos casos, não. A necessidade depende de poeira, maresia, inclinação e chuva. O ideal é monitorar a geração e limpar quando houver queda consistente sem outra causa.",
        },
      },
      {
        "@type": "Question",
        name: "O inversor dura quanto tempo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Varia por modelo e condições (temperatura, ventilação, instalação). É comum planejar que o inversor possa exigir atenção antes dos módulos.",
        },
      },
      {
        "@type": "Question",
        name: "A manutenção é cara?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Em geral, é baixa quando o projeto é bem feito e há rotina preventiva. Custos aumentam quando há instalação inadequada ou falta de monitoramento.",
        },
      },
      {
        "@type": "Question",
        name: "Perder garantia é comum?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pode acontecer se houver instalação fora de norma, falta de documentação técnica, ou intervenções sem responsabilidade técnica. Por isso, exija ART e registro do projeto.",
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
          <span className="truncate">Manutenção</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Conteúdo */}
          <div>
            <header className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Operação · Vida útil · Garantias
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Vida útil e manutenção de painéis solares: o que esperar ao longo dos anos
              </h1>

              <p className="text-base text-muted-foreground sm:text-lg">
                Energia solar é um investimento de longo prazo. Por isso, entender vida útil, degradação, garantias e manutenção evita frustrações e protege seu retorno. Este guia mostra o que realmente exige cuidado e o que é mito.
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
                  Manutenção correta preserva geração, segurança elétrica e garantia do sistema ao longo do tempo.
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
                  slug="vida-util-e-manutencao-paineis-solares"
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
    <li>Módulos tendem a durar muito, com degradação gradual.</li>
    <li>Inversor costuma demandar mais atenção ao longo dos anos.</li>
    <li>Monitoramento e manutenção preventiva evitam perdas silenciosas de geração.</li>
  </ul>
  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
    <Link href="/contato">
      <a className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95">
        Avaliar meu sistema
      </a>
    </Link>
    <Link href="/simulador">
      <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted">
        Simular economia
      </a>
    </Link>
  </div>
</div>

              <h2 id={slugifyId(toc[1])}>{toc[1]}</h2>

              <p>
  Módulos fotovoltaicos têm vida útil longa, mas não são “eternos”. Eles degradam aos poucos: isso significa que, ano a ano,
  a produção pode cair ligeiramente. Garantias normalmente tratam de <strong>produto</strong> e <strong>performance</strong> (produção).
</p>
<p>
  O que observar: microtrincas, hot spots, conexões, e sinais de infiltração ou corrosão em ambientes agressivos.
</p>

              <h2 id={slugifyId(toc[2])}>{toc[2]}</h2>

              <p>
  O inversor converte a energia gerada e é sensível a temperatura, ventilação e instalação elétrica correta.
  Uma boa prática é instalar em local protegido, ventilado e com proteções adequadas.
</p>
<p>
  Monitoramento ajuda a identificar falhas cedo: queda de geração, desligamentos e alarmes.
</p>

              <h2 id={slugifyId(toc[3])}>{toc[3]}</h2>

              <p>
  A estrutura precisa ser compatível com o telhado/solo e com o ambiente. Em regiões com maresia, a escolha de fixação e proteção
  contra corrosão é essencial. Já na elétrica, o foco é segurança: DPS, disjuntores, aterramento e organização do quadro.
</p>

              <h2 id={slugifyId(toc[4])}>{toc[4]}</h2>

              <p>
  Limpeza é um tema que gera exageros. Chuva e inclinação podem reduzir a necessidade. Em contrapartida, poeira intensa, fuligem e maresia
  podem justificar limpeza periódica. O critério mais inteligente é: <strong>acompanhar geração</strong> e agir quando houver queda consistente.
</p>

              <h2 id={slugifyId(toc[5])}>{toc[5]}</h2>

              <p>Checklist preventivo (anual ou semestral, conforme ambiente):</p>
<ul>
  <li>Verificar fixações e integridade da estrutura.</li>
  <li>Inspecionar cabos, conectores e caixas de proteção.</li>
  <li>Revisar aterramento e proteções (DPS/disjuntores).</li>
  <li>Checar logs/alertas do inversor e consistência da geração.</li>
  <li>Avaliar necessidade de limpeza com base em geração.</li>
</ul>

              <h2 id={slugifyId(toc[6])}>{toc[6]}</h2>

              <p>
  Planejamento financeiro simples: reserve uma pequena provisão anual para inspeções e eventuais substituições (quando aplicável).
  Um projeto bem executado reduz custos inesperados e preserva o payback.
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
