import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";

const POST_SLUG = "marco-legal-lei-14300-energia-solar-rj";
const POST_PATH = `/blog/${POST_SLUG}`;
const CANONICAL = `${SITE_URL}${POST_PATH}`;

const HERO_IMAGE = "/blog/marco-legal-lei-14300.webp";
const HERO_ALT = "Lei 14.300 (Marco Legal) e o que muda na geração distribuída no RJ.";
const HERO_CAPTION = "Marco Legal (Lei 14.300): efeitos práticos no projeto, no faturamento e na homologação.";

const OG_IMAGE = `${SITE_URL}${HERO_IMAGE}`;

const DATE_PUBLISHED = "2025-12-18";
const DATE_MODIFIED = "2025-12-18";

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

function slugifyId(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function MarcoLegal14300() {
  const title = "Lei 14.300 (Marco Legal da Geração Distribuída): o que muda na prática no RJ e como evitar erros na homologação";
  const pageTitle = `${title} | Ilumina Sun`;
  const description =
    "Entenda a Lei 14.300 (Marco Legal da geração distribuída), o que muda na compensação, prazos e regras de transição. Guia prático com foco no RJ e região.";

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
  }, []);

  const toc = useMemo(
    () => [
      "Resumo executivo: o que a Lei 14.300 muda para você",
      "Lei 14.300 em 1 minuto: o que ela organiza no mercado",
      "SCEE e créditos: o que continua valendo na prática",
      "Regras de transição: por que o timing do projeto importa",
      "Impacto por perfil: residencial, comercial, industrial e rural",
      "Autoconsumo remoto, condomínios e geração compartilhada",
      "Homologação no RJ: como reduzir atraso e reprovação",
      "Checklist do projeto para fechar com segurança",
      "Perguntas frequentes (FAQ)",
      "Ilumina Sun: projeto e orientação para RJ e Região",
    ],
    []
  );

  const breadcrumbJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 2, name: "Marco Legal", item: CANONICAL },
      ],
    }),
    []
  );

  const articleJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Article",
      mainEntityOfPage: { "@type": "WebPage", "@id": CANONICAL },
      headline: title,
      description,
      image: [OG_IMAGE],
      author: { "@type": "Organization", name: "Ilumina Sun" },
      publisher: { "@type": "Organization", name: "Ilumina Sun" },
      datePublished: DATE_PUBLISHED,
      dateModified: DATE_MODIFIED,
    }),
    []
  );

  const faqJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "A Lei 14.300 impede instalar energia solar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Não. Ela organiza regras e transições. O ponto é projetar e enquadrar corretamente para evitar pendências e prazos estourados.",
          },
        },
        {
          "@type": "Question",
          name: "O que mais causa reprovação na homologação?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Documentação incompleta, padrão/entrada com ajustes pendentes e incompatibilidade entre projeto elétrico e o que foi instalado.",
          },
        },
        {
          "@type": "Question",
          name: "Compensa para empresas e comércios no RJ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Geralmente sim quando o consumo ocorre no horário comercial e o dimensionamento considera demanda, perfil e sazonalidade.",
          },
        },
      ],
    }),
    []
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-16 md:px-6 lg:px-0">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog">
            <a className="hover:text-primary">Blog</a>
          </Link>
          <span>•</span>
          <span className="truncate">Marco Legal</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <header className="space-y-4">
              <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Lei 14.300 · Marco Legal · RJ e Região
              </div>

              <h1 className="text-3xl font-bold leading-tight md:text-4xl">{title}</h1>
              <p className="text-base text-muted-foreground md:text-lg">{description}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>Atualizado em 18/12/2025</span>
                <span>•</span>
                <span>10–13 min de leitura</span>
              </div>

              <figure className="overflow-hidden rounded-2xl border border-border bg-muted/30">
                <img src={HERO_IMAGE} alt={HERO_ALT} className="h-[340px] w-full object-cover sm:h-[420px]" loading="lazy" />
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
                  <li>A Lei 14.300 organiza regras e transições — o impacto real depende de enquadramento, documentação e prazos.</li>
                  <li>No RJ, o que mais atrasa projeto é pendência de padrão/entrada e inconsistência entre projeto e instalação.</li>
                  <li>Para evitar retrabalho, trate o processo como: dimensionamento → engenharia → documentação → instalação → homologação.</li>
                </ul>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Link href="/contato">
                    <a className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95">
                      Pedir análise do meu caso
                    </a>
                  </Link>
                  <Link href="/blog/regulamentacao-aneel-energia-solar">
                    <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted">
                      Ver regulamentação ANEEL
                    </a>
                  </Link>
                </div>
              </div>

              <h2 id={slugifyId(toc[1])}>{toc[1]}</h2>
              <p>
                Pense na Lei 14.300 como um marco que padroniza o setor: define princípios, dá previsibilidade e cria uma lógica de transição.
                O objetivo prático é reduzir incerteza e organizar o crescimento da energia solar conectada à rede.
              </p>

              <h2 id={slugifyId(toc[2])}>{toc[2]}</h2>
              <p>
                O SCEE e o mecanismo de compensação seguem existindo. O que o mercado aprende com o marco legal é simples:
                o “segredo” não é só instalar — é instalar <strong>enquadrando corretamente</strong> e com projeto limpo para não perder tempo em pendência.
              </p>

              <h2 id={slugifyId(toc[3])}>{toc[3]}</h2>
              <p>
                A transição prevê parâmetros que afetam principalmente novas conexões ao longo do tempo. Em vez de tratar timing como detalhe,
                trate como variável de projeto (planejamento e documentação).
              </p>
              <ul>
                <li>Dimensionar com base no seu perfil real (e não em “promessa genérica”).</li>
                <li>Evitar retrabalho (o custo oculto mais comum do cliente é atraso e desgaste).</li>
                <li>Impacto maior quando documentação e padrão estão bem fechados.</li>
              </ul>

              <h2 id={slugifyId(toc[4])}>{toc[4]}</h2>
              <p><strong>Residencial</strong>: mais sensível a consumo sazonal e hábitos. <strong>Comercial</strong>: melhor quando consumo ocorre no horário comercial.
                <strong>Industrial</strong>: demanda, proteções e cronograma de documentação contam muito. <strong>Rural</strong>: perfil de bombeamento/irrigação e robustez.
              </p>

              <h2 id={slugifyId(toc[5])}>{toc[5]}</h2>
              <p>
                Modalidades como autoconsumo remoto e geração compartilhada dependem de documentação e cadastro bem feitos.
                Se o objetivo é viabilizar em conjunto, o ponto central é: a documentação e o cadastro precisam estar consistentes com o modelo escolhido.
              </p>

              <h2 id={slugifyId(toc[6])}>{toc[6]}</h2>
              <p>
                No RJ, as reprovações mais comuns são: enquadramento errado, documentação incompleta e padrão de entrada com ajuste pendente.
                Quando isso acontece, o cliente entra em “ciclo de retrabalho”. A saída é checklist + validação técnica antes de instalar.
              </p>
              <ul>
                <li>Visita/diagnóstico antes de dimensionar</li>
                <li>Modalidade correta (local/remoto/condomínio/compartilhada)</li>
                <li>Instalação por equipe qualificada</li>
              </ul>

              <h2 id={slugifyId(toc[7])}>{toc[7]}</h2>
              <ul>
                <li>Consumo médio (kWh) e objetivo (economia/expansão/múltiplas unidades)</li>
                <li>Modalidade e finalidade antes da compra</li>
                <li>Layout e sombreamento validados</li>
                <li>Documentação técnica preparada</li>
                <li>Plano de manutenção (quando aplicável)</li>
              </ul>

              <h2 id={slugifyId(toc[8])}>{toc[8]}</h2>
              <details>
                <summary>A Lei 14.300 impede instalar energia solar?</summary>
                <p>Não. Ela organiza regras e transições. O foco é enquadrar e homologar corretamente.</p>
              </details>
              <details>
                <summary>O que mais impacta o resultado financeiro?</summary>
                <p>Dimensionamento, tarifa, perdas (sombreamento/temperatura) e qualidade do escopo (elétrica + homologação).</p>
              </details>
              <details>
                <summary>Preciso entender tudo para contratar?</summary>
                <p>Não. Mas você precisa de uma proposta transparente com escopo fechado e ART/responsabilidade técnica.</p>
              </details>

              <h2 id={slugifyId(toc[9])}>{toc[9]}</h2>
              <div className="not-prose rounded-2xl border border-border bg-muted/30 p-6">
                <div className="text-sm font-semibold">Atendemos RJ e Região com projeto + homologação orientada</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Se você está no Rio de Janeiro, Niterói, São Gonçalo, Itaboraí, Tanguá, Rio Bonito ou Maricá, a Ilumina Sun faz o diagnóstico e orienta o caminho técnico e regulatório.
                </div>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Link href="/simulador">
                    <a className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Simular economia</a>
                  </Link>
                  <Link href="/contato">
                    <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted">Solicitar contato</a>
                  </Link>
                </div>
              </div>

              <p className="mt-6 text-xs text-muted-foreground">
                Observação: regras operacionais podem variar conforme distribuidora e detalhes do seu enquadramento. Para decisões finais, valide seu cenário com base em documentação técnica e no fluxo oficial aplicável.
              </p>
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
              <div className="text-sm font-semibold">Ações rápidas</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/simulador"><a className="hover:text-primary">Simular economia</a></Link>
                <Link href="/kit-solar"><a className="hover:text-primary">Ver Kits</a></Link>
                <Link href="/contato"><a className="hover:text-primary">Falar com especialista</a></Link>
                <Link href="/blog/regulamentacao-aneel-energia-solar"><a className="hover:text-primary">Ler: Regulamentação ANEEL</a></Link>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-sm font-semibold">Relacionados</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/blog/regulamentacao-aneel-energia-solar"><a className="hover:text-primary">Regulamentação ANEEL</a></Link>
                <Link href="/blog/financiamento-energia-solar-rj"><a className="hover:text-primary">Financiamento no RJ</a></Link>
                <Link href="/blog/quanto-custa-energia-solar-brasil-2026"><a className="hover:text-primary">Quanto custa energia solar em 2026</a></Link>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </main>
  );
}
