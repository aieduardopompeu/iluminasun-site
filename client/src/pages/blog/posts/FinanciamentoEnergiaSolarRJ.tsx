import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";

const POST_SLUG = "financiamento-energia-solar-rj";
const POST_PATH = `/blog/${POST_SLUG}`;
const CANONICAL = `${SITE_URL}${POST_PATH}`;

const HERO_IMAGE = "/blog/financiamento-energia-solar-rj.webp";
const HERO_ALT = "Financiamento de energia solar no RJ: parcelas, juros e como acelerar a aprovação.";
const HERO_CAPTION = "Financiamento no RJ: documentos, prazos e como acelerar a análise — residencial e empresas.";

const OG_IMAGE = `${SITE_URL}${HERO_IMAGE}`;

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

function slugifyId(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function FinanciamentoEnergiaSolarRJ() {
  const title = "Financiamento de Energia Solar no RJ: Parcelas, Juros e Como Aprovar Mais Rápido";
  const pageTitle = `${title} | Ilumina Sun`;
  const description =
    "Guia prático de financiamento de energia solar no RJ (residencial e empresas): documentos, prazos, pontos que travam aprovação e como acelerar a análise em Rio de Janeiro, Niterói, São Gonçalo, Itaboraí, Maricá e região.";

  const toc = useMemo(
    () => [
      "Resumo rápido: o que realmente define o financiamento",
      "O que normalmente entra no financiamento",
      "Documentos que costumam ser exigidos",
      "Como melhorar a aprovação e reduzir prazos",
      "Comparando propostas: o que olhar além da parcela",
      "Perguntas frequentes (FAQ)",
      "Atendimento Ilumina Sun: RJ e Região",
    ],
    []
  );

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
  }, [pageTitle, description]);

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
      headline: title,
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
    }),
    [title, description]
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
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Financiamento · RJ
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>

              <p className="text-base text-muted-foreground sm:text-lg">{description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>10 de Janeiro, 2025</span>
                <span>•</span>
                <span>8–11 min de leitura</span>
              </div>

              <figure className="mt-6 overflow-hidden rounded-2xl border border-border bg-muted">
                <img
                  src={HERO_IMAGE}
                  alt={HERO_ALT}
                  className="h-[340px] w-full object-cover sm:h-[420px]"
                  loading="eager"
                  decoding="async"
                />
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
                  <li>
                    O banco costuma aprovar melhor quando há <strong>projeto técnico claro</strong> (potência, layout e
                    responsabilidades).
                  </li>
                  <li>
                    O que mais trava é <strong>documento inconsistente</strong>, renda mal comprovada e proposta sem escopo
                    (elétrica/homologação).
                  </li>
                  <li>
                    Parcela baixa pode esconder <strong>prazo longo</strong>, seguro caro ou taxa maior. Compare taxa efetiva e
                    custo total.
                  </li>
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
              <p>Na prática, o financiamento pode incluir:</p>
              <ul>
                <li>
                  <strong>Equipamentos</strong> (módulos, inversor, estrutura e proteções).
                </li>
                <li>
                  <strong>Projeto/engenharia</strong> (memorial, ART, layout e responsabilidade técnica).
                </li>
                <li>
                  <strong>Instalação</strong> e <strong>adequações elétricas</strong> (quadro/padrão quando necessário).
                </li>
                <li>
                  <strong>Homologação</strong> e acompanhamento com a distribuidora.
                </li>
              </ul>

              <h2 id={slugifyId(toc[2])}>{toc[2]}</h2>
              <ul>
                <li>Documento pessoal e comprovante de residência</li>
                <li>Comprovante de renda (CLT/holerite, pró-labore, extratos)</li>
                <li>Conta de luz recente (última competência)</li>
                <li>Orçamento técnico (dimensionamento + itens)</li>
              </ul>

              <h2 id={slugifyId(toc[3])}>{toc[3]}</h2>
              <ol>
                <li>
                  Envie a conta de luz <strong>mais recente</strong> e confirme titularidade.
                </li>
                <li>
                  Evite divergência cadastral (nome, endereço, telefone).
                </li>
                <li>
                  Tenha um projeto técnico claro para evitar reanálise.
                </li>
                <li>
                  Faça a simulação com consumo real (kWh) e objetivo (economia x investimento).
                </li>
              </ol>

              <h2 id={slugifyId(toc[4])}>{toc[4]}</h2>
              <p>Checklist rápido para comparar:</p>
              <ul>
                <li>Taxa efetiva, CET e custo total (não só parcela)</li>
                <li>Prazo (meses), carência e multas</li>
                <li>Seguro embutido e tarifas</li>
                <li>Escopo do projeto (inclui elétrica/homologação?)</li>
                <li>Garantias e suporte pós-instalação</li>
              </ul>

              <h2 id={slugifyId(toc[5])}>{toc[5]}</h2>
              <details>
                <summary>Preciso dar entrada?</summary>
                <p>
                  Depende do perfil e do banco. Em geral, uma entrada menor pode melhorar taxa e aprovação, mas não é regra.
                </p>
              </details>
              <details>
                <summary>Qual documento mais importante para o banco?</summary>
                <p>
                  A combinação de renda comprovada + conta de luz + proposta técnica completa. Proposta “genérica” costuma travar.
                </p>
              </details>
              <details>
                <summary>Financiamento inclui homologação?</summary>
                <p>
                  Nem sempre. Confirme se a proposta explicita homologação e acompanhamento com a distribuidora.
                </p>
              </details>
              <details>
                <summary>Como evitar atraso na análise?</summary>
                <p>
                  Envie documentação completa e consistente, e alinhe o escopo técnico antes de solicitar a aprovação.
                </p>
              </details>

              <h2 id={slugifyId(toc[6])}>{toc[6]}</h2>
              <p>
                A Ilumina Sun atende <strong>Rio de Janeiro</strong>, <strong>Niterói</strong>, <strong>São Gonçalo</strong>,{" "}
                <strong>Itaboraí</strong>, <strong>Maricá</strong>, <strong>Tanguá</strong> e <strong>Rio Bonito</strong>, com suporte
                para perfis residencial, comercial, industrial e rural.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-muted/30 p-6">
              <div className="text-sm font-semibold">Quer simular parcelas e economia?</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Envie seu consumo e a gente estrutura uma comparação técnica e financeira.
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

            <p className="mt-6 text-xs text-muted-foreground">
              Observação: este conteúdo é educativo e não substitui uma avaliação técnica do seu imóvel, consumo e regras da sua distribuidora.
            </p>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-sm font-semibold">Neste artigo</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                {toc.map((t) => (
                  <a key={t} href={`#${slugifyId(t)}`} className="hover:text-primary">
                    {t}
                  </a>
                ))}
              </div>
              <div className="mt-4 border-t border-border pt-4">
                <div className="text-sm font-semibold">Ações rápidas</div>
                <div className="mt-3 flex flex-col gap-2 text-sm">
                  <Link href="/simulador">
                    <a className="hover:text-primary">Simular economia</a>
                  </Link>
                  <Link href="/kit-solar">
                    <a className="hover:text-primary">Ver Kits</a>
                  </Link>
                  <Link href="/contato">
                    <a className="hover:text-primary">Falar com especialista</a>
                  </Link>
                  <Link href="/blog/marco-legal-lei-14300-energia-solar-rj">
                    <a className="hover:text-primary">Ler: Lei 14.300 (Marco Legal)</a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-sm font-semibold">Relacionados</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/blog/quanto-custa-energia-solar-brasil-2026">
                  <a className="hover:text-primary">Quanto custa energia solar em 2026</a>
                </Link>
                <Link href="/blog/payback-energia-solar-em-quanto-tempo-se-paga">
                  <a className="hover:text-primary">Payback: em quanto tempo se paga</a>
                </Link>
                <Link href="/blog/como-escolher-empresa-energia-solar">
                  <a className="hover:text-primary">Como escolher uma empresa</a>
                </Link>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </main>
  );
}
