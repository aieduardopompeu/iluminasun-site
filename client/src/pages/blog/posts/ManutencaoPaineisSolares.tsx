import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";

const POST_SLUG = "manutencao-paineis-solares";
const POST_PATH = `/blog/${POST_SLUG}`;
const CANONICAL = `${SITE_URL}${POST_PATH}`;

const HERO_IMAGE = "/blog/manutencao-paineis-solares.webp";
const HERO_ALT = "Manutenção de painéis solares: limpeza, inspeção e cuidados para máxima eficiência.";
const HERO_CAPTION = "Manutenção: limpeza, inspeção, sombreamento e performance - RJ e região.";

const OG_IMAGE = `${SITE_URL}${HERO_IMAGE}`;

const DATE_PUBLISHED = "2024-11-28";
const DATE_MODIFIED = "2024-11-28";

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

function slugifyId(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function ManutencaoPaineisSolares() {
  const title = "Manutenção de Painéis Solares: Guia Completo para Máxima Eficiência";
  const pageTitle = `${title} | Ilumina Sun`;
  const description =
    "Checklist de manutenção de painéis solares (limpeza, inspeção, sombreamento e performance), com sinais de alerta e periodicidade - com foco no RJ e Região.";

  const toc = useMemo(
    () => [
      "Resumo rápido: o que preserva performance",
      "Quando limpar e quando não limpar",
      "Checklist mensal: o que você mesmo pode fazer",
      "Checklist técnico: o que é de profissional",
      "Sinais de alerta (e o que fazer)",
      "RJ e Região: maresia, poeira e frequência",
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
        { "@type": "ListItem", position: 2, name: "Manutenção", item: CANONICAL },
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
          <span className="truncate">Manutenção</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Coluna principal */}
          <div className="space-y-8">
            <header className="space-y-4">
              <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Manutenção
              </div>

              <h1 className="text-3xl font-bold leading-tight md:text-4xl">{title}</h1>

              <p className="text-base text-muted-foreground md:text-lg">{description}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>28 de Novembro, 2024</span>
                <span>•</span>
                <span>6 min</span>
              </div>

              {/* Hero */}
              <figure className="overflow-hidden rounded-2xl border border-border bg-muted/30">
                <img
                  src={HERO_IMAGE}
                  alt={HERO_ALT}
                  className="h-[340px] w-full object-cover sm:h-[420px]"
                  loading="lazy"
                />
                <figcaption className="px-4 py-3 text-xs text-muted-foreground">{HERO_CAPTION}</figcaption>
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

              {/* Compartilhar */}
              <div className="pt-2">
                <ShareBar title={title} url={CANONICAL} slug={POST_SLUG} contentType="blog" heading="" />
              </div>
            </header>

            {/* Corpo */}
            <div className="prose prose-slate mt-10 max-w-none dark:prose-invert">
              <h2 id={slugifyId(toc[0])}>{toc[0]}</h2>

              <div className="not-prose rounded-2xl border border-border bg-muted/30 p-5">
                <ul className="m-0 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li>
                    O que mais derruba a geração no dia a dia é <strong>sujeira + sombreamento</strong> + conexões ruins.
                  </li>
                  <li>
                    Limpeza não é “sempre”: <strong>limpar errado</strong> pode riscar vidro, criar choque térmico e anular garantia.
                  </li>
                  <li>
                    Se a queda de geração é súbita, pense primeiro em <strong>falha elétrica / inversor / string</strong>, não em “poeira”.
                  </li>
                </ul>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Link href="/contato">
                    <a className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95">
                      Pedir análise do meu sistema
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
                A regra prática é simples: se a geração está normal e você tem chuva regular, muitas vezes a limpeza não muda quase
                nada. Já em <strong>maresia, poeira e períodos longos sem chuva</strong>, a sujeira acumula e a diferença aparece.
              </p>
              <ul>
                <li>
                  <strong>Não limpe</strong> com sol forte no pico do dia (risco de choque térmico e manchas).
                </li>
                <li>
                  <strong>Não use</strong> produtos abrasivos, esponjas ásperas ou jato de alta pressão.
                </li>
                <li>
                  Prefira <strong>água + pano macio</strong> e, se possível, faça cedo (manhã) ou no fim da tarde.
                </li>
              </ul>

              <h2 id={slugifyId(toc[2])}>{toc[2]}</h2>
              <ul>
                <li>Verificar geração no app (comparar com meses anteriores).</li>
                <li>Inspecionar sujeira/folhas/fezes de aves e pontos de sombra novos.</li>
                <li>Checar se há alertas no inversor (códigos/avisos).</li>
                <li>Confirmar se o relógio do inversor/app está com horário correto (para leitura por faixa).</li>
              </ul>

              <h2 id={slugifyId(toc[3])}>{toc[3]}</h2>
              <p>Itens que normalmente exigem técnico/empresa (segurança e garantia):</p>
              <ul>
                <li>Aperto/conferência de conexões (string box, disjuntores, aterramento).</li>
                <li>Termografia (pontos quentes) e verificação de conectores/MC4.</li>
                <li>Teste de isolamento e inspeção de cabos expostos.</li>
                <li>Diagnóstico de queda por string (módulos em série) ou falha no inversor.</li>
              </ul>

              <h2 id={slugifyId(toc[4])}>{toc[4]}</h2>
              <ul>
                <li>
                  <strong>Queda súbita</strong> (de um dia para o outro): priorize checar alertas do inversor e disjuntores.
                </li>
                <li>
                  <strong>Queda gradual</strong> (ao longo de semanas): sujeira, sombra nova, variação sazonal.
                </li>
                <li>
                  <strong>Geração “zerada”</strong>: verifique alimentação do inversor, string box e proteção.
                </li>
              </ul>

              <h2 id={slugifyId(toc[5])}>{toc[5]}</h2>
              <p>
                Em áreas costeiras e urbanas do RJ, é comum haver mais acúmulo por <strong>maresia + poluição</strong>. Em casas com
                muitas árvores, a frequência depende do sombreamento e da queda de folhas.
              </p>

              <h2 id={slugifyId(toc[6])}>{toc[6]}</h2>
              <details>
                <summary>Limpeza aumenta muito a economia?</summary>
                <p>
                  Aumenta quando a sujeira é relevante e persistente. Se a queda é pequena e você tem chuva regular, o ganho pode ser
                  marginal.
                </p>
              </details>
              <details>
                <summary>Posso usar mangueira com pressão?</summary>
                <p>
                  Evite alta pressão. Prefira fluxo suave, sem direcionar água para caixas elétricas/conexões. Segurança em primeiro
                  lugar.
                </p>
              </details>
              <details>
                <summary>Quais sinais indicam problema elétrico?</summary>
                <p>
                  Alertas no inversor, queda súbita de geração, strings inconsistentes ou disjuntores desarmando com frequência.
                </p>
              </details>

              <h2 id={slugifyId(toc[7])}>{toc[7]}</h2>
              <div className="not-prose rounded-2xl border border-border bg-muted/30 p-6">
                <div className="text-sm font-semibold">Atendemos RJ e Região com diagnóstico e manutenção orientada</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Se você está no Rio de Janeiro, Niterói, São Gonçalo, Itaboraí, Tanguá, Rio Bonito ou Maricá, a Ilumina Sun pode
                  avaliar geração, sombreamento e conexões com foco em performance e segurança.
                </div>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Link href="/contato">
                    <a className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95">
                      Solicitar contato
                    </a>
                  </Link>
                  <Link href="/simulador">
                    <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted">
                      Simular economia
                    </a>
                  </Link>
                  <Link href="/servicos">
                    <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted">
                      Ver serviços
                    </a>
                  </Link>
                </div>
              </div>

              <p className="mt-6 text-xs text-muted-foreground">
                Observação: este conteúdo é educativo e não substitui uma avaliação técnica no seu imóvel.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-muted/30 p-5">
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
              <div className="mt-4 border-t border-border pt-4">
                <div className="text-sm font-semibold">Ações rápidas</div>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link href="/simulador">
                      <a className="text-muted-foreground hover:text-primary">Simular economia</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contato">
                      <a className="text-muted-foreground hover:text-primary">Falar com especialista</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/servicos">
                      <a className="text-muted-foreground hover:text-primary">Ver serviços</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-sm font-semibold">Relacionados</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/blog/vida-util-e-manutencao-paineis-solares">
                  <a className="hover:text-primary">Vida útil e manutenção: o que esperar</a>
                </Link>
                <Link href="/blog/conta-de-luz-nao-zerou-energia-solar">
                  <a className="hover:text-primary">Conta não zerou: mínimos e compensação</a>
                </Link>
                <Link href="/blog/como-escolher-empresa-energia-solar">
                  <a className="hover:text-primary">Checklist para contratar uma empresa</a>
                </Link>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </main>
  );
}
