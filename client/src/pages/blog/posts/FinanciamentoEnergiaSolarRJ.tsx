import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";
const POST_PATH = "/blog/financiamento-energia-solar-rj";
const CANONICAL = `${SITE_URL}${POST_PATH}`;
const OG_IMAGE = `${SITE_URL}/blog/regulamentacao-aneel.webp`;

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

export default function FinanciamentoEnergiaSolarRJ() {
  const title =
    "Financiamento de Energia Solar no RJ: Parcelas, Juros e Como Aprovar Mais Rápido | Ilumina Sun";
  const description =
    "Guia prático de financiamento de energia solar no RJ (residencial e empresas): documentos, prazos, pontos que travam aprovação e como acelerar a análise em Rio de Janeiro, Niterói, São Gonçalo, Itaboraí, Maricá e região.";

  useEffect(() => {
    document.title = title;

    upsertLink("canonical", CANONICAL);

    upsertMetaBy("name", "description", description);

    upsertMetaBy("property", "og:type", "article");
    upsertMetaBy("property", "og:title", title);
    upsertMetaBy("property", "og:description", description);
    upsertMetaBy("property", "og:url", CANONICAL);
    upsertMetaBy("property", "og:image", OG_IMAGE);

    upsertMetaBy("name", "twitter:card", "summary_large_image");
    upsertMetaBy("name", "twitter:title", title);
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
              "Sim. Existem modalidades para residencial, comercial e até rural, variando conforme renda/faturamento, garantias e análise de crédito. O ideal é simular com dados reais de consumo e perfil para dimensionar a parcela.",
          },
        },
        {
          "@type": "Question",
          name: "O que mais trava a aprovação do financiamento?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Geralmente: documentação incompleta, divergências cadastrais, renda/faturamento não comprovado, restrições de crédito e orçamento técnico inconsistente (dimensionamento e itens do kit).",
          },
        },
        {
          "@type": "Question",
          name: "Como acelerar a aprovação?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Organize documentos, mantenha cadastros atualizados, envie a conta de luz recente, defina o perfil (residencial/comercial/industrial/rural) e peça um projeto técnico objetivo. Isso reduz idas e voltas na análise.",
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
          <span className="truncate">Financiamento</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <header className="space-y-4">
              <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Financiamento
              </div>
              <h1 className="text-3xl font-bold leading-tight md:text-4xl">{title.replace(" | Ilumina Sun", "")}</h1>
              <p className="text-base text-muted-foreground md:text-lg">{description}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>10 de Janeiro, 2025</span>
                <span>•</span>
                <span>8–11 min</span>
              </div>
              
              {/* Compartilhamento (padrão do site) */}
              <div className="pt-2">
              </div>
              <ShareBar
                title="(cole aqui o título do post)"
                url={CANONICAL}
                slug="(cole aqui o slug do post)"
                contentType="blog"
                heading=""
              />
            </header>

            <section className="prose prose-slate max-w-none dark:prose-invert">
              <h2>O que normalmente entra no financiamento</h2>
              <ul>
                <li>Kit fotovoltaico (módulos, inversor, estrutura e proteções)</li>
                <li>Projeto e documentação</li>
                <li>Instalação (quando a linha permite incluir serviços)</li>
              </ul>

              <h2>Documentos que costumam ser exigidos</h2>
              <ul>
                <li>Documento pessoal e comprovante de residência</li>
                <li>Conta de luz recente (da unidade consumidora)</li>
                <li>Comprovação de renda ou faturamento (PJ)</li>
                <li>Orçamento técnico (dimensionamento + itens)</li>
              </ul>

              <h2>Como melhorar a aprovação e reduzir prazos</h2>
              <ol>
                <li>Envie a conta de luz mais recente e confirme titularidade</li>
                <li>Evite divergência cadastral (nome, endereço, telefone)</li>
                <li>Faça a simulação com consumo real (kWh) e objetivo (economia x investimento)</li>
                <li>Tenha um projeto técnico claro para evitar reanálise</li>
              </ol>

              <h2>Atendimento RJ e Região</h2>
              <p>
                A Ilumina Sun atende <strong>Rio de Janeiro</strong>, <strong>Niterói</strong>, <strong>São Gonçalo</strong>,
                <strong> Itaboraí</strong>, <strong>Tanguá</strong>, <strong>Rio Bonito</strong> e <strong>Maricá</strong>,
                com suporte para perfis <strong>residencial</strong>, <strong>comercial</strong>, <strong>industrial</strong> e <strong>rural</strong>.
              </p>
            </section>

            <div className="rounded-2xl border border-border bg-muted/30 p-6">
              <div className="text-sm font-semibold">Quer simular parcelas e economia?</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Faça uma simulação rápida e fale com um especialista para estruturar o financiamento.
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
              <div className="text-sm font-semibold">Relacionados</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/blog/regulamentacao-aneel-energia-solar">
                  <a className="hover:text-primary">Regulamentação ANEEL</a>
                </Link>
                <Link href="/blog/marco-legal-lei-14300-energia-solar-rj">
                  <a className="hover:text-primary">Lei 14.300 (Marco Legal)</a>
                </Link>
                <Link href="/kit-solar">
                  <a className="hover:text-primary">Kits Solares</a>
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
