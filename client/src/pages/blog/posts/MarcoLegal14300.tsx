import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";



const HERO_IMAGE = "/blog/marco-legal-lei-14300-energia-solar-rj.webp";
const HERO_ALT = "marco-legal-lei-14300-energia-solar-rj";
const HERO_CAPTION = "";
const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";

// Imagem do post (capa dentro do artigo)
const POST_IMAGE_PATH = "/blog/marco-legal-14300.webp";
const POST_IMAGE_ABS = `${SITE_URL}${POST_IMAGE_PATH}`;

// OG (ideal 1200x630). Se você tiver uma OG específica, defina VITE_OG_IMAGE_MARCO_14300.
const OG_IMAGE = `${SITE_URL}/blog/marco-legal-lei-14300-energia-solar-rj.webp`;
const POST_PATH = "/blog/marco-legal-lei-14300-energia-solar-rj";
const CANONICAL = `${SITE_URL}${POST_PATH}`;

// Datas para schema (ISO)
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

function slugifyId(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function MarcoLegal14300() {
  const title =
    "Lei 14.300 (Marco Legal da Geração Distribuída): o que muda na prática no RJ e como evitar erros na homologação";

  const description =
    "Guia direto sobre a Lei 14.300 (marco legal da geração distribuída), SCEE/créditos, regras de transição e impacto por perfil (residencial, comercial, industrial e rural) — com foco no Rio de Janeiro, Niterói, São Gonçalo, Itaboraí, Tanguá, Rio Bonito e Maricá.";

  const keywords =
    "lei 14300 energia solar, marco legal geração distribuída, SCEE créditos, regra de transição GD, homologação energia solar RJ, energia solar rio de janeiro, energia solar niterói, energia solar são gonçalo, energia solar itaboraí, energia solar maricá, autoconsumo remoto, geração compartilhada";

  const areaCities = useMemo(
    () => ["Rio de Janeiro", "Niterói", "São Gonçalo", "Itaboraí", "Tanguá", "Rio Bonito", "Maricá"],
    []
  );

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
      "FAQ: dúvidas comuns sobre o marco legal",
      "Ilumina Sun: projeto e orientação para RJ e Região",
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
      { "@type": "ListItem", position: 3, name: "Lei 14.300 (Marco Legal da GD)", item: CANONICAL },
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
        name: "A Lei 14.300 acabou com os créditos de energia solar?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Não. A lei organiza o marco legal da geração distribuída e mantém o SCEE, mas define regras de transição e parâmetros que influenciam o faturamento, principalmente para novas conexões, conforme regulamentação e práticas da distribuidora.",
        },
      },
      {
        "@type": "Question",
        name: "Energia solar ainda vale a pena no RJ com o marco legal?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Na maioria dos casos, sim. O que muda é que o projeto deve ser dimensionado com precisão, considerando perfil de consumo, modalidade (local/remoto/condomínio/compartilhada) e o fluxo de homologação da distribuidora no seu endereço.",
        },
      },
      {
        "@type": "Question",
        name: "Qual o maior erro que gera atraso na homologação?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Fechar o sistema sem validar enquadramento e documentação (ART, diagrama, formulários e requisitos do padrão). Esse tipo de falha costuma gerar pendências, retrabalho e semanas de atraso.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* JSON-LD (SEO) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
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
          <div>
            <header className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Lei 14.300 · Marco Legal · RJ e Região
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>

              <p className="text-base text-muted-foreground sm:text-lg">
                Se você está em{" "}
                <strong>Rio de Janeiro, Niterói, São Gonçalo, Itaboraí, Tanguá, Rio Bonito ou Maricá</strong>, este guia vai te
                ajudar a entender o que realmente muda na prática e como tomar decisões sem cair em ruído ou desinformação.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>Atualizado em 18/12/2025</span>
                <span>•</span>
                <span>10–13 min de leitura</span>
              </div>

              <figure className="mt-6 overflow-hidden rounded-2xl border border-border bg-muted">
                <img
                  src={POST_IMAGE_PATH}
                  alt="Lei 14.300 (Marco Legal da Geração Distribuída) e energia solar no RJ"
                  className="h-[260px] w-full object-cover sm:h-[320px]"
                  loading="eager"
                  decoding="async"
                />
                <figcaption className="px-4 py-3 text-xs text-muted-foreground">
                  Marco Legal (Lei 14.300): efeitos práticos no projeto, no faturamento e na homologação.
                </figcaption>
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

              {/* Compartilhamento (padrão do site) */}
              <div className="pt-2">
              </div>
              <ShareBar
                title="Lei 14.300 (Marco Legal da Geração Distribuída): o que muda na prática no RJ e como evitar erros na homologação"
                url={CANONICAL}
                slug="(cole aqui o slug do post)"
                contentType="blog"
                heading=""
              />
            </header>

            <div className="prose prose-slate mt-10 max-w-none dark:prose-invert">
              <h2 id={slugifyId(toc[0])}>{toc[0]}</h2>
              <div className="not-prose rounded-2xl border border-border bg-muted/30 p-5">
                <ul className="m-0 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li>
                    A Lei 14.300 cria o “manual do jogo” da geração distribuída e organiza a relação entre consumidor, integrador e distribuidora.
                  </li>
                  <li>
                    O SCEE (compensação/créditos) permanece, mas o marco legal introduz parâmetros e transições que impactam principalmente novas conexões.
                  </li>
                  <li>
                    Na prática, a economia continua forte — desde que o projeto seja dimensionado corretamente e homologado sem pendências.
                  </li>
                  <li>
                    Para RJ e Região, o caminho mais seguro é: consumo → modalidade (local/remoto/condomínio/compartilhada) → documentação → homologação.
                  </li>
                </ul>
              </div>

              <h2 id={slugifyId(toc[1])}>{toc[1]}</h2>
              <p>
                Pense na Lei 14.300 como um marco que padroniza o setor: define princípios, dá previsibilidade e cria uma lógica de transição.
                O objetivo prático é reduzir incerteza e organizar o crescimento da energia solar conectada à rede, incluindo modelos como autoconsumo remoto,
                condomínios e geração compartilhada.
              </p>

              <h2 id={slugifyId(toc[2])}>{toc[2]}</h2>
              <p>
                O SCEE é o mecanismo em que a energia excedente vira crédito e ajuda a abater consumo futuro. O que o mercado aprende com o marco legal é simples:
                o “segredo” não é só instalar — é instalar com <strong>enquadramento correto</strong> e <strong>projeto limpo</strong> para não perder tempo em pendência.
              </p>

              <h2 id={slugifyId(toc[3])}>{toc[3]}</h2>
              <p>
                O marco legal prevê transições que afetam principalmente novas conexões ao longo do tempo. Em vez de decorar regra, a decisão inteligente é:
              </p>
              <ul>
                <li><strong>Tratar timing como variável do projeto</strong> (planejamento e documentação)</li>
                <li><strong>Dimensionar com base no seu perfil real</strong> (e não em “promessa genérica”)</li>
                <li><strong>Evitar retrabalho</strong> (o custo oculto mais comum do cliente é atraso e desgaste)</li>
              </ul>

              <h2 id={slugifyId(toc[4])}>{toc[4]}</h2>

              <h3>Residencial</h3>
              <ul>
                <li>Mais sensível a consumo sazonal (verão/inverno) e hábitos.</li>
                <li>Mais rápido quando documentação e padrão estão bem fechados.</li>
              </ul>

              <h3>Comercial</h3>
              <ul>
                <li>Economia forte quando o consumo ocorre no horário comercial (sinergia com geração).</li>
                <li>Para redes com mais de uma unidade, avaliar modalidade antes de instalar.</li>
              </ul>

              <h3>Industrial</h3>
              <ul>
                <li>Projeto é engenharia: demanda, proteções, qualidade de energia, cronograma e documentação.</li>
                <li>Evita surpresa no comissionamento e reduz risco de reprovação.</li>
              </ul>

              <h3>Rural</h3>
              <ul>
                <li>Perfil específico (bombeamento, irrigação, refrigeração) e logística.</li>
                <li>Dimensionamento e robustez do sistema têm peso maior do que “preço do kit”.</li>
              </ul>

              <div className="not-prose my-8 rounded-2xl border border-border bg-background p-5">
                <div className="text-sm font-semibold">Ação recomendada</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Quer saber o impacto no seu caso (RJ, Niterói, São Gonçalo, Itaboraí, Tanguá, Rio Bonito ou Maricá)? Faça a simulação
                  e peça análise do enquadramento antes de fechar.
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Link href="/simulador">
                    <a className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95">
                      Simular economia
                    </a>
                  </Link>
                  <Link href="/contato">
                    <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted">
                      Pedir análise
                    </a>
                  </Link>
                </div>
              </div>

              <h2 id={slugifyId(toc[5])}>{toc[5]}</h2>
              <p>
                A Lei 14.300 dá sustentação para modalidades que ajudam muito quem tem mais de um imóvel/empresa ou quer viabilizar energia solar em conjunto.
                O ponto central é: a documentação e o cadastro precisam estar consistentes com o modelo escolhido.
              </p>

              <h2 id={slugifyId(toc[6])}>{toc[6]}</h2>
              <p>
                O que mais acelera homologação no RJ e Região é organização. As reprovações mais comuns são: enquadramento errado, documentação incompleta e padrão
                de entrada com ajuste pendente. Quando isso acontece, o cliente perde semanas e entra em “ciclo de retrabalho”.
              </p>
              <ul>
                <li><strong>Visita/diagnóstico</strong> antes de dimensionar</li>
                <li><strong>Checklist de documentos</strong> fechado</li>
                <li><strong>Modalidade correta</strong> (local/remoto/condomínio/compartilhada)</li>
                <li><strong>Instalação por equipe qualificada</strong></li>
              </ul>

              <h2 id={slugifyId(toc[7])}>{toc[7]}</h2>
              <ul>
                <li>Consumo médio (kWh) e objetivo (economia/expansão/múltiplas unidades)</li>
                <li>Modalidade definida antes da compra</li>
                <li>Layout e sombreamento validados</li>
                <li>Documentação técnica preparada</li>
                <li>Plano de manutenção (principalmente comercial/industrial/rural)</li>
              </ul>

              <h2 id={slugifyId(toc[8])}>{toc[8]}</h2>
              <div className="not-prose space-y-3">
                <details className="rounded-xl border border-border bg-background p-4">
                  <summary className="cursor-pointer text-sm font-semibold">Ainda vale a pena instalar energia solar?</summary>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Em grande parte dos casos, sim. O diferencial é fazer projeto correto e homologar sem pendência. Energia solar ruim não é “a lei” — é “projeto mal fechado”.
                  </p>
                </details>

                <details className="rounded-xl border border-border bg-background p-4">
                  <summary className="cursor-pointer text-sm font-semibold">O que mais impacta o resultado financeiro?</summary>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Dimensionamento (consumo real), modalidade (local/remoto/condomínio/compartilhada) e execução/homologação sem retrabalho.
                  </p>
                </details>

                <details className="rounded-xl border border-border bg-background p-4">
                  <summary className="cursor-pointer text-sm font-semibold">Preciso entender tudo para contratar?</summary>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Não. Você precisa de um integrador que explique em linguagem simples e entregue um projeto com premissas claras, checklist e expectativa realista de prazo.
                  </p>
                </details>
              </div>

              <h2 id={slugifyId(toc[9])}>{toc[9]}</h2>
              <div className="not-prose rounded-2xl border border-border bg-primary/5 p-6">
                <h3 className="text-base font-bold">Ilumina Sun — RJ, Niterói, São Gonçalo e Região</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Projetamos e orientamos o caminho de homologação para reduzir risco de pendência e atraso — atendendo{" "}
                  <strong>residencial, comercial, industrial e rural</strong>.
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
                </div>

                <div className="mt-5">
                </div>
              </div>

              <p className="mt-8 text-sm text-muted-foreground">
                Observação: regras operacionais podem variar conforme distribuidora e detalhes do seu enquadramento. Para decisões finais,
                valide seu cenário com base em documentação técnica e no fluxo oficial aplicável.
              </p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-120px)]">
            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-sm font-semibold">Neste artigo</div>
              <nav className="mt-3 space-y-2 text-sm text-muted-foreground">
                {toc.map((h, index) => (
                  <a key={`${h}-${index}`} href={`#${slugifyId(h)}`} className="block hover:text-primary">
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
                  <Link href="/blog/regulamentacao-aneel-energia-solar">
                    <a className="text-muted-foreground hover:text-primary">Ler: Regulamentação ANEEL</a>
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
