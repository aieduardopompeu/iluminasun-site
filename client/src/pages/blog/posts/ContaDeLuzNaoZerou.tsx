import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";

const POST_SLUG = "conta-de-luz-nao-zerou-energia-solar";
const POST_PATH = `/blog/${POST_SLUG}`;
const CANONICAL = `${SITE_URL}${POST_PATH}`;

const HERO_IMAGE = "/blog/conta-de-luz-nao-zerou.webp";
const HERO_ALT =
  "Conta de luz não zerou com energia solar: entenda mínimo, taxas e compensação (RJ e região).";
const HERO_CAPTION =
  "Conta não zera por itens mínimos, regras de compensação, consumo fora de ponta e dimensionamento - RJ e região.";

const OG_IMAGE = `${SITE_URL}${HERO_IMAGE}`;

const DATE_PUBLISHED = "2025-01-07";
const DATE_MODIFIED = "2025-01-07";

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

export default function ContaDeLuzNaoZerou() {
  const pageTitle = "Conta de Luz Não Zerou com Energia Solar? Entenda Mínimos, Taxas e Compensação no RJ | Ilumina Sun";
  const description =
    "Mesmo com energia solar, sua fatura pode não zerar. Entenda custo mínimo, compensação de créditos, demandas e o que ajustar no sistema — com foco no RJ, Niterói, São Gonçalo, Itaboraí, Maricá e região.";

  const toc = useMemo(
    () => [
      "Resumo rápido: por que a conta não zera",
      "O custo mínimo (e quando ele aparece)",
      "Compensação de créditos: o que entra e o que fica fora",
      "5 motivos mais comuns (e como diagnosticar)",
      "Checklist: o que checar antes de pedir ajuste",
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
        { "@type": "ListItem", position: 2, name: "Regulamentação", item: CANONICAL },
      ],
    }),
    []
  );

  const articleJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: pageTitle,
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
    [pageTitle, description]
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-16 md:px-6 lg:px-0">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog">
            <a className="hover:text-primary">Blog</a>
          </Link>
          <span>•</span>
          <span className="truncate">Regulamentação</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <header className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Conta de luz · Compensação
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Conta de Luz Não Zerou com Energia Solar? Entenda Mínimos, Taxas e Compensação no RJ
              </h1>

              <p className="text-base text-muted-foreground sm:text-lg">{description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>07/01/2025</span>
                <span>•</span>
                <span>7–10 min de leitura</span>
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
                <ShareBar
                  title={pageTitle.replace(" | Ilumina Sun", "")}
                  url={CANONICAL}
                  slug={POST_SLUG}
                  contentType="blog"
                  heading=""
                />
              </div>
            </header>

            <div className="prose prose-slate mt-10 max-w-none dark:prose-invert">
              <h2 id={slugifyId(toc[0])}>{toc[0]}</h2>

              <div className="not-prose rounded-2xl border border-border bg-muted/30 p-5">
                <ul className="m-0 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li><strong>Conta não zera</strong> porque sempre existem itens que não entram em compensação (ex.: custo mínimo, iluminação pública, taxas).</li>
                  <li>Se o sistema foi dimensionado “no limite”, <strong>sombreamento</strong> e perdas (temperatura/sujeira) derrubam a geração.</li>
                  <li><strong>Consumo fora do horário de geração</strong> (muito à noite) pode aumentar a parte “não compensada”.</li>
                  <li>Créditos têm regra: <strong>nem tudo vira desconto integral</strong>, e podem existir períodos de ajuste pela distribuidora.</li>
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
                A maioria das distribuidoras mantém um <strong>custo mínimo</strong> (também chamado de “disponibilidade”) que aparece mesmo quando você gera bastante.
                Além disso, alguns itens são cobrados à parte e <strong>não são abatidos por créditos</strong>.
              </p>

              <h2 id={slugifyId(toc[2])}>{toc[2]}</h2>
              <p>
                A compensação depende do seu enquadramento e das regras vigentes. Na prática, você compara <strong>energia injetada</strong> x <strong>energia consumida</strong>,
                mas a fatura pode ter componentes que ficam fora do abatimento e períodos de ajuste.
              </p>

              <h2 id={slugifyId(toc[3])}>{toc[3]}</h2>
              <ul>
                <li><strong>Dimensionamento no limite</strong>: pouca folga para perdas e sazonalidade.</li>
                <li><strong>Sombreamento</strong> (novo ou subestimado): árvores, antenas, prédios, cabos.</li>
                <li><strong>Consumo concentrado à noite</strong>: sem gestão de carga, sobra menos compensação.</li>
                <li><strong>Perdas e sujeira</strong>: limpeza e temperatura impactam bastante no verão.</li>
                <li><strong>Leitura/fechamento de ciclo</strong>: período de faturamento pode “cortar” parte do ganho no mês.</li>
              </ul>

              <h2 id={slugifyId(toc[4])}>{toc[4]}</h2>
              <ol>
                <li>Compare <strong>kWh consumido</strong> x <strong>kWh injetado</strong> (ou compensado) na fatura.</li>
                <li>Veja o detalhamento de “créditos” e “componentes mínimos”.</li>
                <li>Considere o perfil: residencial/comercial/industrial/rural (e se há demanda).</li>
                <li>Verifique se houve mudança de consumo após instalar (ar, boiler, bomba, etc.).</li>
                <li>Cheque alertas no inversor/app e histórico de geração dos últimos 30–90 dias.</li>
              </ol>

              <h2 id={slugifyId(toc[5])}>{toc[5]}</h2>
              <details>
                <summary>A conta pode zerar totalmente algum mês?</summary>
                <p>
                  Em alguns casos, a parcela de energia pode ficar muito baixa, mas normalmente ainda existem cobranças mínimas e itens que não são compensados.
                </p>
              </details>
              <details>
                <summary>Como saber se meu sistema foi subdimensionado?</summary>
                <p>
                  Compare seu consumo médio (kWh/mês) com a geração estimada e verifique se houve aumento de carga após a instalação. A análise ideal considera perdas e sazonalidade.
                </p>
              </details>
              <details>
                <summary>Limpeza do painel muda a fatura?</summary>
                <p>
                  Pode mudar, principalmente quando há sujeira/maresia e o sistema já está “no limite”. Limpeza e checagem de sombreamento são ações simples com impacto real.
                </p>
              </details>

              <h2 id={slugifyId(toc[6])}>{toc[6]}</h2>
              <p>
                Se você está em <strong>Rio de Janeiro</strong>, <strong>Niterói</strong>, <strong>São Gonçalo</strong>, <strong>Itaboraí</strong>, <strong>Tanguá</strong>,
                <strong>Rio Bonito</strong> ou <strong>Maricá</strong>, a Ilumina Sun pode analisar sua fatura e indicar o ajuste ideal (dimensionamento e uso).
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-muted/30 p-6">
              <div className="text-sm font-semibold">Quer que a gente analise sua conta?</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Envie a fatura e diga seu perfil (residencial/comercial/industrial/rural). A gente te orienta com clareza.
              </div>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Link href="/contato">
                  <a className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                    Falar com especialista →
                  </a>
                </Link>
                <Link href="/simulador">
                  <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold">
                    Simular economia
                  </a>
                </Link>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Observação: este conteúdo é educativo e não substitui uma avaliação técnica do seu imóvel, consumo e regras da sua distribuidora.
            </p>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-sm font-semibold">Neste artigo</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                {toc.map((item) => (
                  <a key={item} href={`#${slugifyId(item)}`} className="hover:text-primary">
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-5">
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

            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-sm font-semibold">Relacionados</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/blog/financiamento-energia-solar-rj">
                  <a className="hover:text-primary">Financiamento no RJ</a>
                </Link>
                <Link href="/blog/regulamentacao-aneel-energia-solar">
                  <a className="hover:text-primary">Regulamentação ANEEL</a>
                </Link>
                <Link href="/blog/quanto-custa-energia-solar-brasil-2026">
                  <a className="hover:text-primary">Quanto custa energia solar em 2026</a>
                </Link>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </main>
  );
}
