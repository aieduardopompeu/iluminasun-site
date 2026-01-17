import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";
const POST_PATH = "/blog/energia-solar-empresas";
const CANONICAL = `${SITE_URL}${POST_PATH}`;

const HERO_IMAGE = "/blog/energia-solar-empresas.webp";
const HERO_ALT = "Energia solar para empresas: redução de custos, previsibilidade e competitividade";
const HERO_CAPTION =
  "Empresas: dimensionamento, demanda, perfil de consumo e payback - RJ e região.";

const OG_IMAGE = `${SITE_URL}/blog/energia-solar-empresas.webp`;
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

function slugifyId(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function EnergiaSolarEmpresas() {
  const title = "Energia Solar para Empresas: Como reduzir custos operacionais e ganhar previsibilidade";
  const description =
    "Guia prático para empresas que querem energia solar em 2026: como avaliar consumo e demanda, dimensionar com segurança, evitar erros no orçamento e estimar payback sem promessas vazias. Atendimento no RJ e Região.";
  const keywords =
    "energia solar para empresas, energia solar comercial, energia solar industrial, redução de custos energia, payback energia solar empresas, demanda contratada, energia solar RJ";

  const toc = useMemo(
    () => [
      "Resumo rápido: o que muda para empresas",
      "Por que a conta pesa mais no CNPJ (e por que solar ajuda)",
      "Como dimensionar do jeito certo: consumo x demanda",
      "Antes x depois: previsibilidade e controle de custo",
      "Erros comuns que destroem a economia",
      "Solar é para toda empresa? quando vale e quando não vale",
      "Checklist: o que exigir em uma proposta",
      "Perguntas frequentes (FAQ)",
      "Atendimento Ilumina Sun: RJ e Região",
    ],
    []
  );

  useEffect(() => {
    document.title = `${title} | Ilumina Sun`;

    upsertLink("canonical", CANONICAL);
    upsertMetaBy("name", "description", description);
    upsertMetaBy("name", "keywords", keywords);

    upsertMetaBy("property", "og:type", "article");
    upsertMetaBy("property", "og:site_name", "Ilumina Sun");
    upsertMetaBy("property", "og:title", title);
    upsertMetaBy("property", "og:description", description);
    upsertMetaBy("property", "og:url", CANONICAL);
    upsertMetaBy("property", "og:image", OG_IMAGE);

    upsertMetaBy("name", "twitter:card", "summary_large_image");
    upsertMetaBy("name", "twitter:title", title);
    upsertMetaBy("name", "twitter:description", description);
    upsertMetaBy("name", "twitter:image", OG_IMAGE);
  }, [title, description, keywords]);

  const breadcrumbJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: "Energia solar para empresas", item: CANONICAL },
      ],
    }),
    []
  );

  const articleJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      datePublished: DATE_PUBLISHED,
      dateModified: DATE_MODIFIED,
      mainEntityOfPage: CANONICAL,
      image: [OG_IMAGE],
      author: { "@type": "Organization", name: "Equipe Ilumina Sun" },
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
          name: "Empresa pode zerar a conta de luz com energia solar?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Em geral, não. Mesmo com solar, costumam existir valores mínimos e componentes tarifários. O objetivo realista é reduzir fortemente a parcela de energia e ganhar previsibilidade.",
          },
        },
        {
          "@type": "Question",
          name: "Qual o principal erro em projetos para empresas?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Dimensionar olhando apenas a média mensal, sem considerar picos, sazonalidade, demanda e o perfil de consumo (diurno/noturno). Isso pode gerar economia menor do que a esperada.",
          },
        },
        {
          "@type": "Question",
          name: "Quanto tempo leva para perceber economia?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Normalmente após a conexão e início da compensação, observando a fatura mês a mês. O impacto depende do perfil de consumo, do dimensionamento e das regras da distribuidora.",
          },
        },
        {
          "@type": "Question",
          name: "O que preciso exigir em uma proposta comercial?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Lista de equipamentos, projeto elétrico, memorial, garantias, cronograma, responsabilidades, itens de adequação e estimativa de geração com premissas explícitas.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-16 md:px-6 lg:px-0">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog">
            <a className="hover:text-primary">Blog</a>
          </Link>
          <span>•</span>
          <span className="truncate">Comercial</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <header className="space-y-4">
              <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Comercial
              </div>
              <h1 className="text-3xl font-bold leading-tight md:text-4xl">{title}</h1>
              <p className="text-base text-muted-foreground md:text-lg">{description}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>20 de Novembro, 2024</span>
                <span>•</span>
                <span>10–14 min</span>
              </div>

              <div className="pt-2">
                <ShareBar
                  title={title}
                  url={CANONICAL}
                  slug="energia-solar-empresas"
                  contentType="blog"
                  heading=""
                />
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
              <h2 id={slugifyId("Resumo rápido: o que muda para empresas")}>Resumo rápido: o que muda para empresas</h2>
              <ul>
                <li>
                  <strong>O ganho real não é “conta zerada”.</strong> É reduzir a parcela de energia e ganhar previsibilidade.
                </li>
                <li>
                  <strong>Empresas têm perfil diferente de residências.</strong> Picos, sazonalidade e demanda importam no dimensionamento.
                </li>
                <li>
                  <strong>Uma proposta “barata” costuma esconder custos.</strong> Adequações, proteção, estrutura e engenharia precisam estar claros.
                </li>
                <li>
                  <strong>Payback depende de premissas.</strong> Se a proposta não mostra premissas, desconfie.
                </li>
              </ul>

              <h2 id={slugifyId("Por que a conta pesa mais no CNPJ (e por que solar ajuda)")}>Por que a conta pesa mais no CNPJ (e por que solar ajuda)</h2>
              <p>
                Em muitos negócios, energia é custo fixo relevante: refrigeração, iluminação, motores, TI, climatização e operação em horário comercial.
                Quando tarifas e bandeiras sobem, o orçamento perde previsibilidade. A energia solar ajuda porque reduz a exposição a parte do custo de energia
                e permite planejar com mais estabilidade, mês a mês.
              </p>
              <p>
                O ponto central é entender que, para empresas, o consumo não é “linear”. Existe diferença entre consumo total (kWh), horário de uso e picos.
                Um projeto empresarial precisa refletir o comportamento real do negócio, não apenas a média da fatura.
              </p>

              <h2 id={slugifyId("Como dimensionar do jeito certo: consumo x demanda")}>Como dimensionar do jeito certo: consumo x demanda</h2>
              <p>
                O dimensionamento empresarial costuma falhar quando se olha apenas o total mensal de kWh. Em operações com motores, compressores ou climatização,
                o perfil de pico e a demanda contratada podem influenciar custos e adequações. O caminho seguro é:
              </p>
              <ol>
                <li>
                  <strong>Mapear o perfil de consumo:</strong> horário comercial, finais de semana, sazonalidade e expansão.
                </li>
                <li>
                  <strong>Entender picos:</strong> quais equipamentos ligam juntos e em quais horários.
                </li>
                <li>
                  <strong>Validar infraestrutura:</strong> quadro, proteções, padrão de entrada, espaço e sombreamento.
                </li>
                <li>
                  <strong>Definir meta realista:</strong> reduzir parte do custo e priorizar previsibilidade, não “milagre”.
                </li>
              </ol>

              <h2 id={slugifyId("Antes x depois: previsibilidade e controle de custo")}>Antes x depois: previsibilidade e controle de custo</h2>
              <p>
                Antes da energia solar, o negócio fica 100% exposto a reajustes tarifários, bandeiras e variações de consumo. Depois, a empresa passa a ter
                um componente de geração própria/compensação que estabiliza a fatura. A pergunta correta não é “quanto vou pagar?” e sim “quão previsível
                fica o meu custo ao longo do ano?”.
              </p>

              <h2 id={slugifyId("Erros comuns que destroem a economia")}>Erros comuns que destroem a economia</h2>
              <ul>
                <li>
                  <strong>Subdimensionar por pressa:</strong> reduz o investimento, mas entrega menos economia do que o esperado.
                </li>
                <li>
                  <strong>Ignorar sombreamento e orientação:</strong> impacta geração e pode exigir revisão de layout.
                </li>
                <li>
                  <strong>Proposta sem escopo:</strong> não detalha proteções, estrutura, homologação e adequações.
                </li>
                <li>
                  <strong>Payback “mágico”:</strong> retorno prometido sem premissas claras (tarifa, consumo, perdas, crescimento do negócio).
                </li>
              </ul>

              <h2 id={slugifyId("Solar é para toda empresa? quando vale e quando não vale")}>Solar é para toda empresa? quando vale e quando não vale</h2>
              <p>
                Energia solar costuma fazer mais sentido quando: (1) a conta de luz é relevante no custo, (2) o telhado/área é adequado, (3) há estabilidade
                de operação por alguns anos e (4) existe um objetivo claro (redução de custo e previsibilidade). Pode exigir análise mais cuidadosa quando:
                há mudança de endereço iminente, consumo muito baixo, telhado inadequado ou quando a empresa depende de cargas noturnas predominantes.
              </p>

              <h2 id={slugifyId("Checklist: o que exigir em uma proposta")}>Checklist: o que exigir em uma proposta</h2>
              <ul>
                <li>
                  <strong>Lista completa de equipamentos</strong> (módulos, inversor, proteções, estrutura e cabos).
                </li>
                <li>
                  <strong>Projeto elétrico e memorial</strong> com responsabilidades claras.
                </li>
                <li>
                  <strong>Estimativa de geração</strong> com premissas (sombreamento, perdas, orientação, sazonalidade).
                </li>
                <li>
                  <strong>Garantias</strong> (equipamentos e serviço) e SLA de suporte.
                </li>
                <li>
                  <strong>Cronograma</strong> e etapas (vistoria, homologação, instalação, comissionamento).
                </li>
              </ul>

              <h2 id={slugifyId("Perguntas frequentes (FAQ)")}>Perguntas frequentes (FAQ)</h2>
              <h3>Energia solar “zera” a conta de empresa?</h3>
              <p>
                Normalmente não. Mesmo com geração e compensação, a fatura costuma manter valores mínimos e componentes fixos. O foco é reduzir a parcela
                de energia e estabilizar custos.
              </p>
              <h3>O que mais influencia o retorno (payback) no CNPJ?</h3>
              <p>
                Tarifa, perfil de operação, dimensionamento correto, qualidade da execução, premissas de geração e crescimento do negócio. Payback sem premissas
                claras é sinal de risco.
              </p>
              <h3>Quanto tempo leva para instalar e começar a ver economia?</h3>
              <p>
                Depende de vistoria, homologação e cronograma. O importante é acompanhar o processo e comparar faturas nos primeiros meses para validar a performance.
              </p>
              <h3>Posso ampliar o sistema depois?</h3>
              <p>
                Em muitos casos, sim. Mas isso depende de espaço, padrão de entrada e regras de homologação. Planejar expansão desde o início reduz retrabalho.
              </p>

              <h2 id={slugifyId("Atendimento Ilumina Sun: RJ e Região")}>Atendimento Ilumina Sun: RJ e Região</h2>
              <p>
                Atendemos projetos comerciais e industriais em <strong>Rio de Janeiro</strong>, <strong>Niterói</strong>, <strong>São Gonçalo</strong>,
                <strong> Itaboraí</strong>, <strong>Maricá</strong>, <strong>Tanguá</strong> e <strong>Rio Bonito</strong>. O projeto ideal parte do seu
                perfil de consumo e da sua meta financeira, com escopo fechado (sem surpresas).
              </p>
            </section>

            <div className="rounded-2xl border border-border bg-muted/30 p-6">
              <div className="text-sm font-semibold">Quer uma estimativa de economia para sua empresa?</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Faça a simulação e, se fizer sentido, seguimos com uma proposta técnica com escopo claro.
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
              <div className="mt-3 flex flex-col gap-2 text-sm">
                {toc.map((t) => (
                  <a
                    key={t}
                    href={`#${slugifyId(t)}`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {t}
                  </a>
                ))}
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
                <Link href="/blog/quanto-custa-energia-solar-brasil-2026">
                  <a className="hover:text-primary">Quanto custa em 2026</a>
                </Link>
                <Link href="/kit-solar">
                  <a className="hover:text-primary">Kits Solares</a>
                </Link>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </main>
  );
}
