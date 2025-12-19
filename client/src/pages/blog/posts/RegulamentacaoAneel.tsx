import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";

// Imagem do post (capa dentro do artigo)
const POST_IMAGE_PATH = "/blog/regulamentacao-aneel.webp";
const POST_IMAGE_ABS = `${SITE_URL}${POST_IMAGE_PATH}`;

// OG (ideal 1200x630). Se você tiver uma OG específica, defina VITE_OG_IMAGE_REG_ANEEL.
const OG_IMAGE = import.meta.env.VITE_OG_IMAGE_REG_ANEEL || `${SITE_URL}/og.png`;

const POST_PATH = "/blog/regulamentacao-aneel-energia-solar";
const CANONICAL = `${SITE_URL}${POST_PATH}`;

// Datas para schema (ISO)
const DATE_PUBLISHED = "2025-12-17";
const DATE_MODIFIED = "2025-12-17";

function upsertMetaBy(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(
    `meta[${attr}="${key}"]`
  ) as HTMLMetaElement | null;

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
    "Regulamentação da ANEEL na Energia Solar: Guia Completo da Geração Distribuída (RJ e Região — 2025)";

  const description =
    "Entenda as regras da ANEEL para energia solar conectada à rede (GD), SCEE/créditos, modalidades (autoconsumo remoto/condomínios/compartilhada), conexão e homologação — com foco em RJ, Niterói, São Gonçalo, Itaboraí, Tanguá, Rio Bonito e Maricá.";

  const keywords =
    "regulamentação ANEEL energia solar, geração distribuída, SCEE créditos energia, homologação energia solar, autoconsumo remoto, geração compartilhada, condomínio energia solar, Light geração distribuída, Enel RJ geração distribuída, energia solar Rio de Janeiro, energia solar Niterói, energia solar São Gonçalo, energia solar Itaboraí, energia solar Maricá";

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
      "Resumo rápido: o que você precisa saber",
      "O que a ANEEL regula na energia solar conectada à rede",
      "O que é Geração Distribuída e como funciona o SCEE",
      "Microgeração x Minigeração: qual é o seu enquadramento",
      "Modalidades: autoconsumo remoto, condomínios e geração compartilhada",
      "REN 1000, REN 1059 e Lei 14.300: o que importa para o consumidor",
      "Faturamento: por que a conta não zera em alguns casos",
      "RJ e Região: Light x Enel e o que muda no processo",
      "Passo a passo: conexão e homologação do sistema",
      "Segmentos e estratégia: residencial, comercial, industrial e rural",
      "Projetos acima de 500 kW: cuidados adicionais",
      "Erros que mais geram reprovação e atraso",
      "Checklist rápido antes de contratar energia solar",
      "Perguntas frequentes (FAQ)",
      "Atendimento Ilumina Sun: RJ, Niterói, São Gonçalo e Região",
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
      { "@type": "ListItem", position: 3, name: "Regulamentação da ANEEL na Energia Solar", item: CANONICAL },
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
        name: "O que é SCEE e como funcionam os créditos de energia?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "O SCEE é o Sistema de Compensação de Energia Elétrica. A energia excedente injetada na rede vira créditos e pode abater consumo futuro, conforme as regras do marco legal da GD e as normas da distribuidora.",
        },
      },
      {
        "@type": "Question",
        name: "Posso compensar energia solar em outro imóvel no RJ (ex.: Niterói/Maricá)?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Em muitos casos, sim. Isso pode ocorrer via autoconsumo remoto, condomínios (múltiplas unidades) ou geração compartilhada, seguindo as regras aplicáveis e o cadastro correto na distribuidora.",
        },
      },
      {
        "@type": "Question",
        name: "Por que minha conta pode não zerar com energia solar?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Porque existem itens mínimos e componentes tarifários que podem permanecer, além de particularidades do seu grupo tarifário (baixa/alta tensão) e do modelo de faturamento aplicado pela distribuidora.",
        },
      },
      {
        "@type": "Question",
        name: "Microgeração e minigeração: quais são os limites?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Em geral, microgeração é até 75 kW. Minigeração é acima de 75 kW até 3 MW (podendo chegar a 5 MW em situações específicas previstas em lei).",
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
          <span className="truncate">Regulamentação</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Conteúdo */}
          <div>
            <header className="space-y-4">
            <ShareBar
              title="TÍTULO DO POST"
              url={CANONICAL}
              slug="slug-do-post"
              contentType="blog"
            />  
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Regulamentação · ANEEL · RJ e Região
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Regulamentação da ANEEL: Tudo o que Você Precisa Saber sobre Energia Solar
              </h1>

              <p className="text-base text-muted-foreground sm:text-lg">
                Um guia prático (sem juridiquês) para entender geração distribuída, compensação de energia (SCEE),
                modalidades e como homologar seu sistema com segurança — com foco em Rio de Janeiro, Niterói,
                São Gonçalo, Itaboraí, Tanguá, Rio Bonito e Maricá.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>Atualizado em 17/12/2025</span>
                <span>•</span>
                <span>10–14 min de leitura</span>
              </div>

              {/* Imagem de capa */}
              <figure className="mt-6 overflow-hidden rounded-2xl border border-border bg-muted">
                <img
                  src={POST_IMAGE_PATH}
                  alt="Regulamentação da ANEEL e energia solar: geração distribuída, créditos e homologação"
                  className="h-[260px] w-full object-cover sm:h-[320px]"
                  loading="eager"
                  decoding="async"
                />
                <figcaption className="px-4 py-3 text-xs text-muted-foreground">
                  Regulamentação ANEEL (GD/SCEE) e o caminho de homologação na distribuidora — visão prática para RJ e Região.
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
            </header>

            {/* Corpo */}
            <div className="prose prose-slate mt-10 max-w-none dark:prose-invert">
              <h2 id={slugifyId(toc[0])}>{toc[0]}</h2>
              <div className="not-prose rounded-2xl border border-border bg-muted/30 p-5">
                <ul className="m-0 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li>
                    Energia solar <strong>on-grid</strong> (conectada à rede) segue regras de conexão, compensação e faturamento.
                    No Brasil, isso é estruturado pelo marco legal e por normas da ANEEL — e executado pela distribuidora.
                  </li>
                  <li>
                    O excedente pode virar <strong>créditos</strong> no <strong>SCEE</strong> para abater consumo futuro, conforme as regras vigentes.
                  </li>
                  <li>
                    Existem modalidades como <strong>autoconsumo remoto</strong>, <strong>condomínios (múltiplas unidades)</strong> e <strong>geração compartilhada</strong>.
                  </li>
                  <li>
                    A conta pode não “zerar” por itens mínimos e componentes tarifários — o importante é dimensionar certo e acompanhar as primeiras faturas.
                  </li>
                  <li>
                    No RJ (Rio/Niterói/São Gonçalo/Itaboraí/Maricá e entorno), o seu fluxo e checklist mudam conforme a distribuidora (ex.: Light/Enel).
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
                Quando falamos de energia solar <strong>on-grid</strong>, a regulamentação define como a sua usina se conecta,
                como o excedente vira crédito e como a distribuidora deve faturar sua conta. Na prática, isso determina o
                caminho de homologação e o nível de previsibilidade da sua economia.
              </p>

              <h2 id={slugifyId(toc[2])}>{toc[2]}</h2>
              <p>
                A <strong>Geração Distribuída (GD)</strong> é a geração próxima do consumo (residência, comércio, indústria,
                propriedade rural). Quando o sistema gera além do consumo instantâneo, o excedente pode ser injetado na rede e
                convertido em crédito no <strong>SCEE</strong> (Sistema de Compensação de Energia Elétrica), conforme regras vigentes.
              </p>
              <p>
                Se você quer uma noção de economia antes de entrar na parte regulatória, comece pelo{" "}
                <Link href="/simulador">
                  <a>Simulador</a>
                </Link>{" "}
                e depois valide o enquadramento com um especialista.
              </p>

              <h2 id={slugifyId(toc[3])}>{toc[3]}</h2>
              <p>O enquadramento define exigências e, em alguns casos, o nível de engenharia e documentação. Em geral:</p>
              <ul>
                <li><strong>Microgeração distribuída:</strong> até <strong>75 kW</strong>.</li>
                <li>
                  <strong>Minigeração distribuída:</strong> acima de <strong>75 kW</strong> e até <strong>3 MW</strong> (podendo
                  chegar a <strong>5 MW</strong> em situações específicas previstas em lei).
                </li>
              </ul>

              <h2 id={slugifyId(toc[4])}>{toc[4]}</h2>
              <p>Além do autoconsumo no mesmo endereço, existem modalidades para distribuir créditos em múltiplas unidades:</p>
              <ul>
                <li><strong>Autoconsumo local</strong> (mesma unidade)</li>
                <li><strong>Autoconsumo remoto</strong> (outra unidade do mesmo titular, conforme regras)</li>
                <li><strong>Condomínios / múltiplas unidades</strong> (rateio)</li>
                <li><strong>Geração compartilhada</strong> (associação/cooperativa/consórcio, conforme enquadramento)</li>
              </ul>

              <div className="not-prose my-8 rounded-2xl border border-border bg-background p-5">
                <div className="text-sm font-semibold">Atalho para evitar atraso</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Antes de “fechar kit”, valide o modelo: local, remoto, condomínio ou compartilhada. O erro mais comum é instalar
                  e tentar enquadrar depois — isso costuma gerar pendência documental e semanas de atraso.
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
              <p>Para 2025, o que interessa ao consumidor é entender o “tripé”:</p>
              <ul>
                <li><strong>Lei 14.300/2022</strong>: marco legal da GD e regras de transição.</li>
                <li><strong>REN 1059/2023</strong>: regras de conexão e faturamento relacionadas à micro/minigeração e SCEE.</li>
                <li><strong>REN 1000/2021</strong>: consolida regras do serviço de distribuição (impacta fluxo e obrigações).</li>
              </ul>

              <h2 id={slugifyId(toc[6])}>{toc[6]}</h2>
              <p>
                Mesmo com energia solar, a conta pode não “zerar” em todos os casos. Em geral, existem componentes mínimos e itens
                tarifários que permanecem, e isso varia conforme seu perfil (baixa ou alta tensão) e regras de faturamento aplicadas.
              </p>

              <h2 id={slugifyId(toc[7])}>{toc[7]}</h2>
              <p>
                No Rio de Janeiro e entorno, o fluxo de solicitação e a lista de documentos são disponibilizados pela própria distribuidora.
                O passo mais rápido é identificar a distribuidora do seu endereço e seguir o checklist oficial.
              </p>

              <h2 id={slugifyId(toc[8])}>{toc[8]}</h2>
              <ol>
                <li><strong>Diagnóstico do consumo</strong> (kWh, hábitos, perfil tarifário)</li>
                <li><strong>Dimensionamento técnico</strong> (potência, inversor, layout, sombreamento)</li>
                <li><strong>Solicitação de acesso</strong> na distribuidora</li>
                <li><strong>Envio de documentação</strong> (ART, diagrama unifilar, certificados, formulários)</li>
                <li><strong>Instalação</strong> por equipe qualificada</li>
                <li><strong>Vistoria / adequações</strong> e liberação para operação</li>
                <li><strong>Compensação</strong> e acompanhamento das primeiras faturas</li>
              </ol>

              <h2 id={slugifyId(toc[9])}>{toc[9]}</h2>
              <p>A mesma regulação atende perfis diferentes — mas a estratégia e o projeto mudam por segmento:</p>

              <h3>Residencial</h3>
              <ul>
                <li>Foco em economia e previsibilidade de fatura.</li>
                <li>Dimensionar para consumo real e sazonalidade (ex.: ar-condicionado no verão).</li>
                <li>Em condomínios, avaliar regras de múltiplas unidades e rateio.</li>
              </ul>

              <h3>Comercial</h3>
              <ul>
                <li>Mapear pico de consumo (horário comercial) e cargas críticas.</li>
                <li>Priorizar retorno, disponibilidade e plano de manutenção.</li>
                <li>Para mais de uma unidade, avaliar compensação por modalidade adequada.</li>
              </ul>

              <h3>Industrial</h3>
              <ul>
                <li>Tratamento de engenharia: demanda, proteções, adequações e documentação.</li>
                <li>Planejar implantação sem interromper operação.</li>
              </ul>

              <h3>Rural</h3>
              <ul>
                <li>Checar padrão de entrada, sombras, estrutura e logística.</li>
                <li>Cargas típicas: bombeamento, refrigeração, ordenha, irrigação.</li>
              </ul>

              <h2 id={slugifyId(toc[10])}>{toc[10]}</h2>
              <p>
                Em projetos maiores, surgem exigências adicionais e maior rigor documental. Se seu cenário é indústria, condomínio grande
                ou operação multiunidade, trate como engenharia — não como “compra de kit”.
              </p>

              <h2 id={slugifyId(toc[11])}>{toc[11]}</h2>
              <ul>
                <li><strong>Documentação incompleta</strong> (formulários/ART/diagramas/certificados)</li>
                <li><strong>Enquadramento errado</strong> (local vs remoto vs condomínio vs compartilhada)</li>
                <li><strong>Dimensionamento sem visita técnica</strong> (sombreamento/estrutura/padrão de entrada)</li>
                <li><strong>Expectativa de “conta zerada”</strong> sem entender itens mínimos e regras de faturamento</li>
              </ul>

              <h2 id={slugifyId(toc[12])}>{toc[12]}</h2>
              <ul>
                <li>Tenho meu consumo médio (kWh) e minha tarifa?</li>
                <li>Meu objetivo é autoconsumo local ou compensar em outra unidade?</li>
                <li>Meu telhado/área tem sombreamento relevante?</li>
                <li>Em condomínio/múltiplas unidades, o rateio está definido?</li>
              </ul>

              <h2 id={slugifyId(toc[13])}>{toc[13]}</h2>
              <div className="not-prose space-y-3">
                <details className="rounded-xl border border-border bg-background p-4">
                  <summary className="cursor-pointer text-sm font-semibold">
                    Energia solar é permitida e segura do ponto de vista regulatório?
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Sim. Desde que o processo de solicitação, instalação e homologação seja feito conforme as exigências da distribuidora
                    e normas aplicáveis.
                  </p>
                </details>

                <details className="rounded-xl border border-border bg-background p-4">
                  <summary className="cursor-pointer text-sm font-semibold">
                    Posso abater energia em outro imóvel (ex.: do Rio para Niterói)?
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Em muitos casos, sim — via autoconsumo remoto, geração compartilhada ou rateio em condomínios, conforme regras e cadastros.
                  </p>
                </details>

                <details className="rounded-xl border border-border bg-background p-4">
                  <summary className="cursor-pointer text-sm font-semibold">
                    Onde faço a Solicitação de Acesso?
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Normalmente no portal/canais de Geração Distribuída da sua distribuidora (com formulários e upload de documentos).
                  </p>
                </details>

                <details className="rounded-xl border border-border bg-background p-4">
                  <summary className="cursor-pointer text-sm font-semibold">
                    Por que minha conta pode não zerar?
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Por itens mínimos e componentes tarifários e particularidades do seu grupo tarifário. O melhor caminho é dimensionar
                    com base no seu perfil real e acompanhar as primeiras faturas.
                  </p>
                </details>
              </div>

              <h2 id={slugifyId(toc[14])}>{toc[14]}</h2>
              <div className="not-prose rounded-2xl border border-border bg-primary/5 p-6">
                <h3 className="text-base font-bold">Atendemos RJ e Região com projeto + homologação orientada</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Se você está em <strong>Rio de Janeiro, Niterói, São Gonçalo, Itaboraí, Tanguá, Rio Bonito ou Maricá</strong>, a Ilumina Sun
                  faz o diagnóstico (residencial, comercial, industrial ou rural), dimensiona e orienta o caminho regulatório.
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
                <strong>Observação:</strong> para máxima precisão regulatória, sempre valide o checklist e o fluxo oficial da sua distribuidora
                e o enquadramento do seu projeto antes de instalar.
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
