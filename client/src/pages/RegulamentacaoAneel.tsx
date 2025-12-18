import { useEffect, useMemo } from "react";
import { Link } from "wouter";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";

// Ajuste se você tiver uma imagem OG específica para o post.
// Recomendado: 1200x630
const OG_IMAGE =
  import.meta.env.VITE_OG_IMAGE_REG_ANEEL ||
  `${SITE_URL}/og.png`;

const POST_PATH = "/blog/regulamentacao-aneel-energia-solar";
const CANONICAL = `${SITE_URL}${POST_PATH}`;

// Datas para schema (use ISO)
const DATE_PUBLISHED = "2025-12-17";
const DATE_MODIFIED = "2025-12-17";

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

export default function RegulamentacaoAneel() {
  const title =
    "Regulamentação da ANEEL na Energia Solar: Guia Completo da Geração Distribuída (2025)";

  const description =
    "Entenda as regras para energia solar conectada à rede (GD), compensação de créditos (SCEE), modalidades (autoconsumo remoto/condomínios) e como homologar seu sistema com segurança.";

  const toc = useMemo(
    () => [
      "Resumo rápido: o que você precisa saber",
      "O que a ANEEL regula na energia solar conectada à rede",
      "O que é Geração Distribuída e como funciona o SCEE",
      "Microgeração x Minigeração: qual é o seu enquadramento",
      "Modalidades: autoconsumo remoto, condomínios e geração compartilhada",
      "O que mudou com REN 1000 e REN 1059 (e o marco legal)",
      "Faturamento: por que a conta não zera em alguns casos",
      "Passo a passo: conexão e homologação do sistema",
      "Projetos acima de 500 kW: cuidados adicionais",
      "Checklist rápido antes de contratar energia solar",
      "Perguntas frequentes (FAQ)",
    ],
    []
  );

  useEffect(() => {
    // Title + description
    document.title = title;
    upsertMetaBy("name", "description", description);
    upsertLink("canonical", CANONICAL);

    // Open Graph (usar property)
    upsertMetaBy("property", "og:type", "article");
    upsertMetaBy("property", "og:site_name", "Ilumina Sun");
    upsertMetaBy("property", "og:title", title);
    upsertMetaBy("property", "og:description", description);
    upsertMetaBy("property", "og:url", CANONICAL);
    upsertMetaBy("property", "og:image", OG_IMAGE);

    // Twitter Cards (usar name)
    upsertMetaBy("name", "twitter:card", "summary_large_image");
    upsertMetaBy("name", "twitter:title", title);
    upsertMetaBy("name", "twitter:description", description);
    upsertMetaBy("name", "twitter:image", OG_IMAGE);
  }, []);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Regulamentação da ANEEL na Energia Solar",
        item: CANONICAL,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": CANONICAL,
    },
    headline: title,
    description,
    image: [OG_IMAGE],
    author: {
      "@type": "Organization",
      name: "Equipe Ilumina Sun",
    },
    publisher: {
      "@type": "Organization",
      name: "Ilumina Sun",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    inLanguage: "pt-BR",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "O que é SCEE e como funcionam os créditos de energia?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "O SCEE é o Sistema de Compensação de Energia Elétrica. A energia excedente injetada na rede pode ser compensada com consumo posterior, conforme regras vigentes da geração distribuída e da distribuidora.",
        },
      },
      {
        "@type": "Question",
        name: "Posso compensar energia solar em outro imóvel?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Em muitos casos, sim. Isso pode ocorrer por modalidades como autoconsumo remoto, condomínios (múltiplas unidades) ou geração compartilhada, seguindo as regras aplicáveis e o cadastro correto na distribuidora.",
        },
      },
      {
        "@type": "Question",
        name: "Por que minha conta pode não zerar com energia solar?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Porque existem componentes mínimos e/ou itens tarifários que podem permanecer, além de particularidades do seu grupo tarifário (baixa/alta tensão) e do modelo de faturamento da distribuidora.",
        },
      },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-16 md:px-6 lg:px-0">
        {/* Breadcrumb visual */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog">
            <a className="hover:text-primary">Blog</a>
          </Link>
          <span>•</span>
          <span className="truncate">Regulamentação</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Conteúdo */}
          <div>
            <header className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Regulamentação
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Regulamentação da ANEEL: Tudo o que Você Precisa Saber sobre Energia Solar
              </h1>

              <p className="text-base text-muted-foreground sm:text-lg">
                Um guia prático para entender geração distribuída, compensação de energia (SCEE),
                modalidades e como homologar seu sistema com segurança — com foco em evitar erros
                que atrasam o projeto e reduzem a economia.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>Atualizado em 17/12/2025</span>
                <span>•</span>
                <span>8–12 min de leitura</span>
              </div>

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
            </header>

            {/* Corpo */}
            <div className="prose prose-slate mt-10 max-w-none dark:prose-invert">
              {/* Resumo rápido (snippet-friendly) */}
              <h2 id={slugifyId(toc[0])}>{toc[0]}</h2>
              <div className="not-prose rounded-2xl border border-border bg-muted/30 p-5">
                <ul className="m-0 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li>
                    Energia solar conectada à rede segue regras de conexão, compensação e faturamento definidas no marco
                    regulatório e aplicadas pela distribuidora.
                  </li>
                  <li>
                    O excedente pode virar créditos no SCEE, usados para abater consumo futuro conforme regras vigentes.
                  </li>
                  <li>
                    Existem modalidades como autoconsumo remoto, condomínios (múltiplas unidades) e geração compartilhada.
                  </li>
                  <li>
                    A conta pode não “zerar” por itens mínimos e/ou particularidades tarifárias.
                  </li>
                  <li>
                    Para fechar com segurança, faça um diagnóstico do seu perfil antes do dimensionamento.
                  </li>
                </ul>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Link href="/kit-solar">
                    <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted">
                      Ver Kits
                    </a>
                  </Link>
                  <Link href="/servicos">
                    <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted">
                      Serviços
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
                Quando falamos de energia solar <strong>on-grid</strong> (conectada à rede), as regras impactam:
                conexão, compensação de excedentes, faturamento e responsabilidades. Na prática, isso define o caminho
                de homologação e a previsibilidade da sua economia.
              </p>

              <h2 id={slugifyId(toc[2])}>{toc[2]}</h2>
              <p>
                A <strong>Geração Distribuída (GD)</strong> é a geração próxima do consumo (residência, comércio,
                indústria, propriedade rural). Quando o sistema gera além do consumo instantâneo, o excedente pode ser
                injetado na rede e contabilizado como crédito no <strong>SCEE</strong> (Sistema de Compensação de Energia Elétrica).
              </p>
              <p>
                Se você quer ter uma noção de economia antes de entrar na burocracia, comece pelo{" "}
                <Link href="/simulador">
                  <a>Simulador</a>
                </Link>{" "}
                e depois valide o enquadramento com um especialista.
              </p>

              <h2 id={slugifyId(toc[3])}>{toc[3]}</h2>
              <p>
                O enquadramento define exigências e o tipo de atendimento. Em linhas gerais:
              </p>
              <ul>
                <li>
                  <strong>Microgeração distribuída:</strong> até <strong>75 kW</strong>.
                </li>
                <li>
                  <strong>Minigeração distribuída:</strong> acima de <strong>75 kW</strong> e até <strong>3 MW</strong>
                  (podendo chegar a <strong>5 MW</strong> em situações específicas).
                </li>
              </ul>
              <p>
                Se você está em dúvida entre “kit padrão” e “projeto sob medida”, vale consultar a página de{" "}
                <Link href="/kit-solar">
                  <a>Kits</a>
                </Link>{" "}
                ou falar direto com a equipe.
              </p>

              <h2 id={slugifyId(toc[4])}>{toc[4]}</h2>
              <p>
                Além do autoconsumo no mesmo endereço, existem modalidades para distribuir créditos em múltiplas unidades:
              </p>
              <ul>
                <li><strong>Autoconsumo local</strong> (mesma unidade)</li>
                <li><strong>Autoconsumo remoto</strong> (outra unidade do mesmo titular, conforme regras)</li>
                <li><strong>Condomínios / múltiplas unidades</strong> (rateio)</li>
                <li><strong>Geração compartilhada</strong> (associação/cooperativa/consórcio, conforme enquadramento)</li>
              </ul>

              <div className="not-prose my-8 rounded-2xl border border-border bg-background p-5">
                <div className="text-sm font-semibold">Erro comum que vira atraso</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Muita gente instala primeiro e tenta “enquadrar depois”. O correto é validar o modelo (local/remoto/condomínio)
                  e a documentação antes, para evitar retrabalho e semanas de atraso.
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Link href="/servicos">
                    <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted">
                      Ver serviços
                    </a>
                  </Link>
                  <Link href="/contato">
                    <a className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95">
                      Validar meu enquadramento
                    </a>
                  </Link>
                </div>
              </div>

              <h2 id={slugifyId(toc[5])}>{toc[5]}</h2>
              <p>
                O cenário regulatório foi consolidado e atualizado para organizar regras de conexão, compensação e faturamento.
                Para o consumidor, o ponto prático é: <strong>o processo existe, funciona, mas precisa ser seguido</strong> para
                que os créditos e a fatura sejam aplicados corretamente.
              </p>

              <h2 id={slugifyId(toc[6])}>{toc[6]}</h2>
              <p>
                Mesmo com energia solar, a conta pode não “zerar” em todos os casos. Em geral, existem componentes mínimos e
                itens tarifários que permanecem, e isso varia conforme o seu perfil (ex.: baixa ou alta tensão) e regras da
                distribuidora.
              </p>

              <h2 id={slugifyId(toc[7])}>{toc[7]}</h2>
              <ol>
                <li><strong>Diagnóstico do consumo</strong> (kWh, hábitos e perfil tarifário)</li>
                <li><strong>Dimensionamento técnico</strong> (potência, inversor, layout, sombreamento)</li>
                <li><strong>Solicitação de acesso</strong> na distribuidora</li>
                <li><strong>Envio de documentação</strong> e projeto conforme exigências</li>
                <li><strong>Instalação</strong> por equipe qualificada</li>
                <li><strong>Vistoria / adequações</strong> e liberação para operação</li>
                <li><strong>Compensação</strong> e acompanhamento da fatura</li>
              </ol>

              <h2 id={slugifyId(toc[8])}>{toc[8]}</h2>
              <p>
                Em projetos maiores, surgem exigências adicionais e maior rigor documental. Se seu cenário é indústria,
                condomínio grande ou operação com múltiplas unidades, trate o projeto como engenharia e não como “compra de kit”.
              </p>

              <h2 id={slugifyId(toc[9])}>{toc[9]}</h2>
              <ul>
                <li>Tenho meu consumo médio (kWh) e minha tarifa?</li>
                <li>Quero autoconsumo local ou compensar em outra unidade?</li>
                <li>Meu telhado/área tem sombreamento relevante?</li>
                <li>Vou usar modelo de condomínio/múltiplas unidades?</li>
                <li>Quero economia estimada baseada no meu perfil real?</li>
              </ul>

              <h2 id={slugifyId(toc[10])}>{toc[10]}</h2>
              <div className="not-prose space-y-3">
                <details className="rounded-xl border border-border bg-background p-4">
                  <summary className="cursor-pointer text-sm font-semibold">
                    Energia solar é permitida e segura do ponto de vista regulatório?
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Sim, desde que o processo de solicitação, instalação e homologação seja feito conforme as regras e exigências
                    da distribuidora, com documentação correta.
                  </p>
                </details>

                <details className="rounded-xl border border-border bg-background p-4">
                  <summary className="cursor-pointer text-sm font-semibold">
                    Posso abater energia em outro imóvel?
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Em muitos casos, sim — via autoconsumo remoto, geração compartilhada ou rateio em condomínios, conforme regras
                    e cadastros aplicáveis.
                  </p>
                </details>

                <details className="rounded-xl border border-border bg-background p-4">
                  <summary className="cursor-pointer text-sm font-semibold">
                    Por que minha conta pode não zerar?
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Por componentes mínimos e/ou itens tarifários e particularidades do seu grupo tarifário. O melhor caminho é
                    dimensionar com base no seu perfil real.
                  </p>
                </details>
              </div>

              {/* CTA final forte */}
              <div className="not-prose mt-10 rounded-2xl border border-border bg-primary/5 p-6">
                <h3 className="text-base font-bold">
                  Quer um diagnóstico rápido (e o caminho regulatório correto)?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  A Ilumina Sun analisa seu consumo e objetivo (residencial, comercial, condomínio, autoconsumo remoto) e indica
                  a estratégia mais segura para dimensionar e homologar.
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

                <p className="mt-4 text-xs text-muted-foreground">
                  Ao entrar em contato, você concorda com nossas{" "}
                  <Link href="/politica-de-privacidade">
                    <a>Políticas</a>
                  </Link>{" "}
                  e{" "}
                  <Link href="/lgpd">
                    <a>LGPD</a>
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar (TOC + links internos) */}
          <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-120px)]">
            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-sm font-semibold">Neste artigo</div>
              <nav className="mt-3 space-y-2 text-sm text-muted-foreground">
                {toc.map((h) => (
                  <a key={h} href={`#${slugifyId(h)}`} className="block hover:text-primary">
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
