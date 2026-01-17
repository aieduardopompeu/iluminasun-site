import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const HERO_IMAGE = "/blog/como-escolher-empresa-energia-solar.webp";
const HERO_ALT = "como-escolher-empresa-energia-solar";
const HERO_CAPTION = "";
const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";

// Imagem do post (capa dentro do artigo)
const POST_IMAGE_PATH = "/blog/como-escolher-empresa-energia-solar.webp";
const POST_IMAGE_ABS = `${SITE_URL}${POST_IMAGE_PATH}`;

// OG (ideal 1200x630).
const OG_IMAGE = `${SITE_URL}/blog/como-escolher-empresa-energia-solar.webp`;
const POST_PATH = "/blog/como-escolher-empresa-energia-solar";
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

export default function ComoEscolherEmpresaEnergiaSolar() {
  const title = "Como escolher empresa de energia solar: checklist, sinais de confiança e contrato";

  const description = "Um checklist prático para escolher uma empresa de energia solar: visita técnica, proposta detalhada, projeto elétrico, homologação, garantias, suporte e contrato. Evite golpes e retrabalho — com foco em RJ e Região.";

  const keywords = "como escolher empresa energia solar, checklist energia solar, proposta energia solar o que avaliar, garantia energia solar, homologação distribuidora, contrato energia solar, energia solar RJ";

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
      "Resumo rápido: 7 critérios que resolvem 80% dos problemas",
      "Visita técnica: o que uma empresa séria verifica",
      "Proposta detalhada: itens que não podem faltar",
      "Projeto e responsabilidade técnica (ART): por que exigir",
      "Homologação: como evitar atrasos e retrabalho",
      "Garantias e suporte: perguntas que você deve fazer",
      "Contrato: cláusulas essenciais (sem pegadinha)",
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
      { "@type": "ListItem", position: 3, name: "Como escolher empresa", item: CANONICAL },
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
        name: "Toda empresa faz visita técnica?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nem todas, mas é um forte sinal de seriedade. Sem visita, aumentam as chances de erro por sombra, estrutura, padrão de entrada e rota de cabos.",
        },
      },
      {
        "@type": "Question",
        name: "O que precisa vir na proposta?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Especificação de módulos e inversor, potência, layout, estimativa de geração, escopo de instalação, itens elétricos, garantias, homologação e prazo.",
        },
      },
      {
        "@type": "Question",
        name: "ART é obrigatória?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "É uma forma importante de responsabilidade técnica e segurança. Além disso, costuma ser exigida ou solicitada em processos e documentação.",
        },
      },
      {
        "@type": "Question",
        name: "Como evitar golpes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Desconfie de preço muito abaixo sem detalhamento, ausência de CNPJ/contato claro, promessa de “conta zerada” garantida e falta de contrato transparente.",
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
          <span className="truncate">Empresa</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Conteúdo */}
          <div>
            <header className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Contratação · Checklist · Confiança
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Como escolher uma empresa de energia solar: checklist do que avaliar antes de contratar
              </h1>

              <p className="text-base text-muted-foreground sm:text-lg">
                A diferença entre um projeto “que funciona” e um projeto “que dá dor de cabeça” quase sempre está na contratação. Aqui você tem um checklist objetivo para comparar empresas e propostas: engenharia, documentação, garantias e suporte.
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
                  Uma boa contratação reduz risco, acelera homologação e aumenta previsibilidade de economia.
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
                  slug="como-escolher-empresa-energia-solar"
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
    <li><strong>Visita técnica</strong> + proposta detalhada evitam 80% das dores de cabeça.</li>
    <li>Exija marcas/modelos, escopo elétrico, homologação, prazos e garantias por escrito.</li>
    <li>Contrato claro e suporte pós-instalação importam tanto quanto o preço.</li>
  </ul>
  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
    <Link href="/contato">
      <a className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95">
        Pedir avaliação
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

              <p>Uma visita técnica séria avalia, no mínimo:</p>
<ul>
  <li>Sombreamento e orientação do telhado.</li>
  <li>Estrutura e estado da cobertura.</li>
  <li>Rota de cabos, quadro, padrão de entrada e aterramento.</li>
  <li>Meta de consumo e perfil (residencial/comercial/rural).</li>
</ul>
<p>
  Sem isso, a proposta vira “palpite” — e palpite costuma virar custo extra.
</p>

              <h2 id={slugifyId(toc[2])}>{toc[2]}</h2>

              <p>Itens que não podem faltar na proposta:</p>
<ul>
  <li>Potência instalada (kWp) e estimativa de geração (kWh) com perdas.</li>
  <li>Marca/modelo de módulos e inversor, com garantias.</li>
  <li>Escopo de elétrica (proteções, aterramento, adequações).</li>
  <li>Homologação e documentação inclusas.</li>
  <li>Prazos, cronograma e condições de pagamento.</li>
</ul>

              <h2 id={slugifyId(toc[3])}>{toc[3]}</h2>

              <p>
  Responsabilidade técnica é parte da segurança do projeto. Ela organiza documentação, reduz risco de reprovação e dá base para suporte.
  Pergunte: quem assina? qual documentação será entregue? o que fica registrado?
</p>

              <h2 id={slugifyId(toc[4])}>{toc[4]}</h2>

              <p>
  Homologação é onde muitos projetos travam. Para evitar atrasos:
</p>
<ul>
  <li>Confirme se a empresa já tem experiência com sua distribuidora.</li>
  <li>Exija o passo a passo: solicitação de acesso, documentos, vistoria e prazos.</li>
  <li>Peça clareza sobre quem acompanha e como você é atualizado.</li>
</ul>

              <h2 id={slugifyId(toc[5])}>{toc[5]}</h2>

              <p>Perguntas que você deve fazer:</p>
<ul>
  <li>Existe monitoramento? Como recebo alertas de falha?</li>
  <li>Qual é o prazo de atendimento (SLA)?</li>
  <li>Garantia de produto e performance: como acionar?</li>
  <li>O que está excluído do escopo?</li>
</ul>

              <h2 id={slugifyId(toc[6])}>{toc[6]}</h2>

              <p>Cláusulas essenciais:</p>
<ul>
  <li>Escopo completo (equipamentos, elétrica, instalação, homologação).</li>
  <li>Garantias e responsabilidades.</li>
  <li>Prazos e penalidades por atraso (quando aplicável).</li>
  <li>Condições de pagamento vinculadas a marcos de entrega.</li>
</ul>
<p>
  E um sinal simples: empresa séria não tem medo de contrato transparente.
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
