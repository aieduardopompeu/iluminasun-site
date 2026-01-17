import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";
const POST_PATH = "/blog/financiamento-energia-solar-rj";
const CANONICAL = `${SITE_URL}${POST_PATH}`;
const HERO_IMAGE = "/blog/financiamento-energia-solar-rj.webp";
const HERO_ALT = "Financiamento de energia solar no RJ: parcelas, juros e aprovação.";
const HERO_CAPTION = "Financiamento no RJ: documentos, prazos e como acelerar a aprovação.";
const OG_IMAGE = `${SITE_URL}/blog/financiamento-energia-solar-rj.webp`;
const DATE_PUBLISHED = "2025-01-10";
const DATE_MODIFIED = "2025-01-10";

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

export default function FinanciamentoEnergiaSolarRJ() {
  const title = "Financiamento de Energia Solar no RJ: parcelas, juros e como aprovar mais rápido";
  const description =
    "Guia prático de financiamento de energia solar no RJ (residencial e empresas): documentos, prazos, pontos que travam aprovação e como acelerar a análise em Rio de Janeiro, Niterói, São Gonçalo, Itaboraí, Maricá e região.";

  const toc = useMemo(
    () => [
      "Resumo rápido: como financiar sem cair em cilada",
      "Como funciona o financiamento de energia solar (na prática)",
      "O que deve (e o que não deve) entrar no orçamento financiado",
      "O que mais trava a aprovação no RJ",
      "Financiar ou pagar à vista? como decidir com segurança",
      "Erros comuns que aumentam juros e atrasam liberação",
      "Checklist de documentos e dados para aprovar mais rápido",
      "Perguntas frequentes (FAQ)",
      "Atendimento Ilumina Sun: RJ e Região",
    ],
    []
  );

  useEffect(() => {
    document.title = `${title} | Ilumina Sun`;

    upsertLink("canonical", CANONICAL);
    upsertMetaBy("name", "description", description);

    upsertMetaBy("property", "og:type", "article");
    upsertMetaBy("property", "og:title", `${title} | Ilumina Sun`);
    upsertMetaBy("property", "og:description", description);
    upsertMetaBy("property", "og:url", CANONICAL);
    upsertMetaBy("property", "og:image", OG_IMAGE);

    upsertMetaBy("name", "twitter:card", "summary_large_image");
    upsertMetaBy("name", "twitter:title", `${title} | Ilumina Sun`);
    upsertMetaBy("name", "twitter:description", description);
    upsertMetaBy("name", "twitter:image", OG_IMAGE);
  }, [title, description]);

  const breadcrumbJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 2, name: "Financiamento", item: CANONICAL },
      ],
    }),
    []
  );

  const articleJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${title} | Ilumina Sun`,
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
      inLanguage: "pt-BR",
    }),
    [title, description]
  );

  const faqJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Dá para financiar energia solar para residência e para empresa no RJ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Sim. Existem modalidades para residencial, comercial e até rural, variando conforme renda/faturamento, garantias e análise de crédito. O mais seguro é financiar com um orçamento técnico completo (itens + engenharia + homologação).",
          },
        },
        {
          "@type": "Question",
          name: "O que mais trava a aprovação do financiamento?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Documentação incompleta, divergências cadastrais (nome/endereço), comprovação de renda/faturamento insuficiente, restrições de crédito e orçamento técnico inconsistente (itens não detalhados ou dimensionamento sem base na conta de luz).",
          },
        },
        {
          "@type": "Question",
          name: "Como acelerar a aprovação?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Organize documentos, mantenha cadastros atualizados, envie uma conta de luz recente, defina o perfil (residencial/comercial) e encaminhe um orçamento com escopo fechado. Isso reduz idas e voltas na análise.",
          },
        },
        {
          "@type": "Question",
          name: "Vale financiar quando a parcela fica parecida com a economia?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Pode valer, desde que as premissas sejam realistas (tarifa, consumo, geração estimada, custos mínimos da fatura) e que você tenha horizonte de permanência no imóvel/negócio. O erro é decidir por “parcela bonita” sem escopo e sem premissas.",
          },
        },
      ],
    }),
    []
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-16 md:px-6 lg:px-0">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog">
            <a className="hover:text-primary">Blog</a>
          </Link>
          <span>•</span>
          <span className="truncate">Financiamento</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <header className="space-y-4">
              <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Financiamento
              </div>
              <h1 className="text-3xl font-bold leading-tight md:text-4xl">{title}</h1>
              <p className="text-base text-muted-foreground md:text-lg">{description}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>10 de Janeiro, 2025</span>
                <span>•</span>
                <span>10–14 min</span>
              </div>

              <div className="pt-2">
                <ShareBar title={title} url={CANONICAL} slug="financiamento-energia-solar-rj" contentType="blog" heading="" />
              </div>
            </header>

            <figure className="overflow-hidden rounded-2xl border border-border bg-muted/30">
              <img
                src={HERO_IMAGE}
                alt={HERO_ALT}
                className="h-[340px] w-full object-cover sm:h-[420px]"
                loading="lazy"
              />
              {HERO_CAPTION ? (
                <figcaption className="px-4 py-3 text-xs text-muted-foreground">{HERO_CAPTION}</figcaption>
              ) : null}
            </figure>

            <section className="prose prose-slate max-w-none dark:prose-invert">
              <h2 id={slugifyId("Resumo rápido: como financiar sem cair em cilada")}>
                Resumo rápido: como financiar sem cair em cilada
              </h2>
              <ul>
                <li>
                  <strong>Financiamento bom começa no orçamento técnico.</strong> Se o orçamento não detalha itens e escopo, a análise tende a travar.
                </li>
                <li>
                  <strong>Parcela não pode ser o único critério.</strong> Compare parcela x economia, mas também <em>prazo</em>, <em>juros</em>, <em>garantias</em> e <em>escopo</em>.
                </li>
                <li>
                  <strong>Conta de luz recente é peça-chave.</strong> Ela sustenta dimensionamento e evita sub/superdimensionamento.
                </li>
                <li>
                  <strong>Evite “aprovação rápida” sem documentação.</strong> A maioria dos atrasos vem de divergência cadastral e falta de comprovantes.
                </li>
              </ul>

              <h2 id={slugifyId("Como funciona o financiamento de energia solar (na prática)")}>Como funciona o financiamento de energia solar (na prática)</h2>
              <p>
                No dia a dia, o financiamento de energia solar é uma combinação de: (1) análise de crédito (PF ou PJ), (2) validação do orçamento (itens e valores),
                e (3) conferência de documentação. A parte que mais “dá ruim” é quando o orçamento é genérico ou quando documentos não batem (endereço, titularidade,
                renda/faturamento).
              </p>
              <p>
                Um bom financiamento não é o mais barato “no papel”. É o que deixa o escopo fechado e reduz risco de adequações inesperadas.
              </p>

              <h2 id={slugifyId("O que deve (e o que não deve) entrar no orçamento financiado")}>
                O que deve (e o que não deve) entrar no orçamento financiado
              </h2>
              <p>
                Para evitar frustração, o orçamento financiado precisa ser coerente com a instalação real. Em geral, o que <strong>deve</strong> estar claro:
              </p>
              <ul>
                <li>Equipamentos (módulos, inversor, estrutura, cabos, proteções e conectores);</li>
                <li>Engenharia/projeto (memorial, ART quando aplicável, documentação);</li>
                <li>Instalação e comissionamento;</li>
                <li>Homologação e acompanhamento junto à distribuidora;</li>
                <li>Garantias e condições de suporte.</li>
              </ul>
              <p>
                Desconfie quando o orçamento vem como “kit + instalação” sem detalhar proteções, quadro, estrutura e etapas. É aí que surgem custos fora do financiamento.
              </p>

              <h2 id={slugifyId("O que mais trava a aprovação no RJ")}>O que mais trava a aprovação no RJ</h2>
              <ul>
                <li>
                  <strong>Divergência cadastral:</strong> endereço diferente entre comprovante, conta de luz e cadastro.
                </li>
                <li>
                  <strong>Conta de luz desatualizada:</strong> dimensionamento sem base em consumo real.
                </li>
                <li>
                  <strong>Comprovação insuficiente:</strong> renda (PF) ou faturamento/declarações (PJ).
                </li>
                <li>
                  <strong>Orçamento genérico:</strong> sem itens, marcas, quantidades e escopo de serviço.
                </li>
                <li>
                  <strong>Expectativa desalinhada:</strong> “quero zerar a conta” sem considerar custos mínimos e regras.
                </li>
              </ul>

              <h2 id={slugifyId("Financiar ou pagar à vista? como decidir com segurança")}>Financiar ou pagar à vista? como decidir com segurança</h2>
              <p>
                A decisão não é só “juros x desconto”. O que importa é o <strong>custo total</strong> versus a <strong>economia mensal</strong>, considerando que a conta de luz
                não zera totalmente. Um método simples e conservador:
              </p>
              <ol>
                <li>Estime a economia mensal com base em consumo real e um cenário conservador de geração;</li>
                <li>Compare a economia com a parcela, mas também com o prazo e o custo total do financiamento;</li>
                <li>Valide se você ficará no imóvel/negócio por tempo suficiente para capturar o benefício.</li>
              </ol>

              <h2 id={slugifyId("Erros comuns que aumentam juros e atrasam liberação")}>Erros comuns que aumentam juros e atrasam liberação</h2>
              <ul>
                <li>
                  <strong>Escolher pelo “menor valor” sem escopo:</strong> vira aditivo fora do financiamento.
                </li>
                <li>
                  <strong>Não alinhar titularidade:</strong> quem financia, quem é titular da conta e quem assina documentos.
                </li>
                <li>
                  <strong>Não planejar adequações:</strong> quadro, padrão e proteções podem ser necessários.
                </li>
                <li>
                  <strong>Assinar sem garantias claras:</strong> suporte e assistência fazem diferença no pós-instalação.
                </li>
              </ul>

              <h2 id={slugifyId("Checklist de documentos e dados para aprovar mais rápido")}>
                Checklist de documentos e dados para aprovar mais rápido
              </h2>
              <ul>
                <li>Documento e comprovante de residência (atualizados);</li>
                <li>Conta de luz recente (preferencialmente do último mês);</li>
                <li>Comprovante de renda (PF) ou faturamento/declarações (PJ);</li>
                <li>Orçamento técnico detalhado (itens, quantidades, marcas, escopo e cronograma);</li>
                <li>Dados corretos de contato (telefone/e-mail) para evitar “ping-pong”.</li>
              </ul>

              <h2 id={slugifyId("Perguntas frequentes (FAQ)")}>Perguntas frequentes (FAQ)</h2>
              <h3>É possível incluir instalação e homologação no financiamento?</h3>
              <p>
                Em muitas linhas, sim, desde que o orçamento esteja detalhado e a instituição aceite serviços como parte do projeto. O erro é financiar apenas o “kit” e depois
                descobrir custos extras fora da parcela.
              </p>
              <h3>O que devo exigir no orçamento para não travar a aprovação?</h3>
              <p>
                Lista completa de itens, quantidades, marcas, escopo do serviço (instalação, comissionamento, homologação) e garantias. Orçamento genérico costuma gerar reanálise.
              </p>
              <h3>Financiamento vale a pena se eu pretendo me mudar?</h3>
              <p>
                Depende do prazo. Se há alta chance de mudança no curto prazo, vale avaliar alternativas (ou um projeto com possibilidade de transferência), porque o benefício é capturado
                no tempo.
              </p>
              <h3>Como comparar propostas de financiamento?</h3>
              <p>
                Compare custo total, CET/juros, prazo e se o escopo está fechado (sem itens “por fora”). A proposta mais barata pode ser a mais cara depois.
              </p>

              <h2 id={slugifyId("Atendimento Ilumina Sun: RJ e Região")}>Atendimento Ilumina Sun: RJ e Região</h2>
              <p>
                A Ilumina Sun atende <strong>Rio de Janeiro</strong>, <strong>Niterói</strong>, <strong>São Gonçalo</strong>, <strong>Itaboraí</strong>, <strong>Maricá</strong>,
                <strong> Tanguá</strong> e <strong>Rio Bonito</strong>, com suporte para perfis <strong>residencial</strong> e <strong>empresarial</strong>. Se você quer financiar,
                o caminho mais rápido é começar com consumo real + orçamento técnico detalhado.
              </p>
            </section>

            <div className="rounded-2xl border border-border bg-muted/30 p-6">
              <div className="text-sm font-semibold">Quer simular parcelas e economia no RJ?</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Faça uma simulação rápida e fale com um especialista para estruturar uma proposta técnica e financeira com premissas realistas.
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
              <div className="text-sm font-semibold">Relacionados</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/blog/quanto-custa-energia-solar-brasil-2026">
                  <a className="hover:text-primary">Quanto custa energia solar em 2026</a>
                </Link>
                <Link href="/blog/marco-legal-lei-14300-energia-solar-rj">
                  <a className="hover:text-primary">Lei 14.300 (Marco Legal)</a>
                </Link>
                <Link href="/blog/conta-de-luz-nao-zerou-energia-solar">
                  <a className="hover:text-primary">Conta não zerou? Entenda mínimos e taxas</a>
                </Link>
                <Link href="/servicos">
                  <a className="hover:text-primary">Serviços</a>
                </Link>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </main>
  );
}
