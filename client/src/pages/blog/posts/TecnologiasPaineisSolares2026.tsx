import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";

const POST_SLUG = "tecnologias-paineis-solares-2026-rj";
const POST_PATH = `/blog/${POST_SLUG}`;
const CANONICAL = `${SITE_URL}${POST_PATH}`;

const HERO_IMAGE = "/blog/tecnologias-paineis-solares-2026.webp";
const HERO_ALT =
  "Tecnologias de painéis solares em 2026 (TOPCon, HJT, bifacial e tandens) e como escolher a melhor opção no RJ.";
const HERO_CAPTION =
  "Tecnologias 2026: o que muda nos módulos (células), no ganho de energia e na escolha certa para seu telhado/solo.";

const OG_IMAGE = `${SITE_URL}${HERO_IMAGE}`;

const DATE_PUBLISHED = "2026-02-12";
const DATE_MODIFIED = "2026-02-12";

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

export default function TecnologiasPaineisSolares2026() {
  const title =
    "Tecnologias de painéis solares em 2026: TOPCon, HJT, bifacial e tandens — como escolher o melhor módulo no RJ sem cair em armadilhas";
  const pageTitle = `${title} | Ilumina Sun`;
  const description =
    "Guia atualizado sobre as principais tecnologias de painéis solares em 2026 (TOPCon, HJT, N-type, bifacial, vidro-vidro e tandens). Entenda ganhos reais, quando vale pagar mais e como escolher com segurança no RJ e região.";

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
      "Resumo executivo: o que realmente mudou nos painéis em 2026",
      "Primeiro, pare de escolher por “W” e comece por performance real",
      "TOPCon (N-type): por que virou padrão do mercado e onde ganha",
      "HJT: quando vale pagar mais (especialmente em calor)",
      "Bifacial + trackers: quando faz sentido e quando é marketing",
      "Vidro-vidro, half-cut, multi-busbar e outras melhorias que importam",
      "Perovskita e tandens: o que é tendência real e o que ainda é promessa",
      "Como escolher o painel certo no RJ: litoral, calor, salinidade e telhado",
      "Checklist de compra (anti-golpe): o que exigir no orçamento",
      "FAQ rápido (perguntas que mais recebemos)",
      "Ilumina Sun: simulação e projeto com engenharia no RJ e região",
    ],
    []
  );

  const breadcrumbJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 2, name: "Tecnologias 2026", item: CANONICAL },
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
          name: "TOPCon é melhor do que PERC?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Na maioria dos cenários, sim: TOPCon (N-type) tende a ter melhor eficiência, menor degradação e melhor desempenho em baixa irradiância. O custo pode ser um pouco maior, então o ideal é comparar ganho real de geração (kWh) e garantia.",
          },
        },
        {
          "@type": "Question",
          name: "HJT vale a pena no calor do RJ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Pode valer quando o telhado esquenta muito e a instalação sofre com altas temperaturas. HJT costuma ter ótimo desempenho térmico, mas a decisão deve considerar ganho de geração, preço e disponibilidade de marcas/garantias.",
          },
        },
        {
          "@type": "Question",
          name: "Bifacial faz sentido em telhado residencial?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Nem sempre. O bifacial rende mais quando existe refletância adequada (albedo) e ventilação por trás do módulo. Em telhado colado na telha, o ganho pode ser pequeno. Para solo/estrutura elevada, costuma fazer mais sentido.",
          },
        },
        {
          "@type": "Question",
          name: "Perovskita já é para comprar em 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Ainda está mais perto de uma tendência de médio prazo (principalmente em formato tandem com silício). É promissora em eficiência, mas a maturidade, disponibilidade e garantias de longo prazo ainda variam.",
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
          <span className="truncate">Tecnologias 2026</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <header className="space-y-4">
              <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Tecnologias 2026 · Painéis solares · RJ e Região
              </div>

              <h1 className="text-3xl font-bold leading-tight md:text-4xl">{title}</h1>
              <p className="text-base text-muted-foreground md:text-lg">{description}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>Atualizado em 12/02/2026</span>
                <span>•</span>
                <span>12–16 min de leitura</span>
              </div>

              <figure className="overflow-hidden rounded-2xl border border-border bg-muted/30">
                <img
                  src={HERO_IMAGE}
                  alt={HERO_ALT}
                  className="h-[340px] w-full object-cover sm:h-[420px]"
                  loading="lazy"
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
                    Em 2026, o avanço real veio da <strong>mudança de tecnologia de célula</strong> (principalmente para N-type, como TOPCon),
                    e não de “milagres” de marketing.
                  </li>
                  <li>
                    O que mais muda seu resultado é: <strong>kWh gerado</strong>, comportamento em calor, baixa luz, degradação e garantia — e não só o número “Wp”.
                  </li>
                  <li>
                    No RJ, calor e maresia aumentam a importância de escolha de módulo, estrutura, aterramento e boas práticas elétricas (evita perda e dor de cabeça).
                  </li>
                </ul>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Link href="/simulador">
                    <a className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95">
                      Ver minha economia em 1 minuto
                    </a>
                  </Link>
                  <Link href="/blog/marco-legal-lei-14300-energia-solar-rj">
                    <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted">
                      Ler: Marco Legal (Lei 14.300)
                    </a>
                  </Link>
                </div>
              </div>

              <h2 id={slugifyId(toc[1])}>{toc[1]}</h2>
              <p>
                O erro mais comum na compra de energia solar é escolher pelo “maior W” ou pelo “menor preço por placa”.
                Em 2026, isso ficou ainda mais perigoso porque existem tecnologias diferentes convivendo no mercado.
              </p>
              <p>
                O que você deve comparar para uma decisão segura (e agressiva em economia):
              </p>
              <ul>
                <li><strong>Geração estimada (kWh/mês)</strong> com premissas claras (irradiância, inclinação, sombreamento, perdas).</li>
                <li><strong>Coeficiente de temperatura</strong> (quanto o módulo “sofre” no calor).</li>
                <li><strong>Degradação</strong> (quanto perde de potência ao longo dos anos) e <strong>garantias</strong> (produto + performance).</li>
                <li><strong>Qualidade do conjunto</strong>: inversor/otimizadores, cabos, conectores, estrutura, proteção e aterramento.</li>
              </ul>
              <p>
                Em resumo: o “melhor painel” é o que entrega <strong>mais kWh com estabilidade</strong> no seu cenário (telhado, calor, sombra, rede elétrica) — com garantia real e instalação certa.
              </p>

              <h2 id={slugifyId(toc[2])}>{toc[2]}</h2>
              <p>
                TOPCon (Tunnel Oxide Passivated Contact) é uma das razões pelas quais 2026 é um bom momento para comparar propostas com calma.
                Na prática, TOPCon virou o “novo padrão” em muitos portfólios porque entrega eficiência elevada e boa estabilidade, especialmente em:
              </p>
              <ul>
                <li><strong>Baixa irradiância</strong> (manhã/tarde, nebulosidade, inverno).</li>
                <li><strong>Degradação</strong> tipicamente menor em tecnologias N-type (dependendo do fabricante e linha).</li>
                <li><strong>Compatibilidade</strong> com módulos modernos (half-cut, multi-busbar) e projetos residenciais/comerciais.</li>
              </ul>
              <p>
                Para o cliente final, o ganho aparece como <strong>mais energia ao longo do ano</strong>, principalmente quando o sistema passa por dias quentes e com variação de luz.
              </p>
              <div className="not-prose rounded-2xl border border-border bg-background p-5">
                <div className="text-sm font-semibold">Como identificar TOPCon no orçamento</div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li>Procure “TOPCon”, “N-type” ou “Tunnel Oxide” na ficha técnica.</li>
                  <li>Compare <strong>garantia de performance</strong> (ex.: 25–30 anos) e degradação anual declarada.</li>
                  <li>Evite proposta sem datas, sem marca/linha e sem datasheet do módulo.</li>
                </ul>
              </div>

              <h2 id={slugifyId(toc[3])}>{toc[3]}</h2>
              <p>
                HJT (heterojunction) costuma aparecer como “painel premium” porque combina camadas que ajudam a reduzir perdas na superfície da célula.
                Na vida real, o principal ponto é: <strong>HJT tende a performar muito bem em calor</strong>.
              </p>
              <p>
                No RJ, isso pode fazer diferença em telhados com pouca ventilação (telha colada, laje quente, telhas metálicas), onde a temperatura do módulo sobe e derruba geração.
                Mas a decisão deve ser matemática: <strong>ganho de kWh vs. diferença de preço</strong>.
              </p>
              <ul>
                <li>Se o ganho de geração anual for pequeno para seu telhado, TOPCon pode ser o melhor “custo/benefício”.</li>
                <li>Se o cenário for muito quente, com sol forte e altas temperaturas, HJT pode se pagar melhor.</li>
              </ul>

              <h2 id={slugifyId(toc[4])}>{toc[4]}</h2>
              <p>
                Bifacial é a tecnologia que gera energia também pela parte traseira do módulo. Parece “sempre melhor”, mas não é.
                O bifacial precisa de condição para ganhar:
              </p>
              <ul>
                <li><strong>Refletância (albedo)</strong>: piso claro, brita clara, pintura, laje clara, solo específico.</li>
                <li><strong>Distância/ventilação</strong>: módulo elevado para a luz chegar atrás.</li>
                <li><strong>Projeto correto</strong>: espaçamento, inclinação e (em usinas) trackers.</li>
              </ul>
              <p>
                Em telhado residencial muito próximo à telha, o ganho pode ser baixo. Em solo/estrutura elevada, pode ser ótimo.
              </p>
              <div className="not-prose rounded-2xl border border-border bg-muted/30 p-5">
                <div className="text-sm font-semibold">Regra de ouro</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Se a proposta promete “+30%” sem explicar albedo e distância do telhado, trate como sinal de alerta. Peça o racional técnico (e não só marketing).
                </div>
              </div>

              <h2 id={slugifyId(toc[5])}>{toc[5]}</h2>
              <p>
                Além da tecnologia da célula, 2026 consolidou “melhorias de engenharia” que afetam confiabilidade e ganho no dia a dia:
              </p>
              <ul>
                <li><strong>Vidro-vidro</strong>: tende a aumentar robustez e resistência a microfissuras (bom para longo prazo e ambientes agressivos).</li>
                <li><strong>Half-cut</strong>: ajuda a reduzir perdas elétricas internas e melhora comportamento em sombra parcial.</li>
                <li><strong>Multi-busbar</strong>: melhora coleta de corrente e reduz perdas, além de ajudar com microtrincas.</li>
                <li><strong>Melhor encapsulante e backsheet</strong>: impacta durabilidade e resistência a umidade/maresia.</li>
              </ul>
              <p>
                Essas escolhas costumam aparecer como diferença de preço pequena, mas podem significar <strong>menos falhas</strong> e <strong>melhor estabilidade</strong> ao longo do tempo.
              </p>

              <h2 id={slugifyId(toc[6])}>{toc[6]}</h2>
              <p>
                Perovskita e células “tandem” (perovskita + silício) são o assunto mais quente quando falamos de eficiência.
                Em laboratório e protótipos, os recordes são impressionantes — mas o ponto do consumidor é: <strong>disponibilidade e garantia</strong>.
              </p>
              <p>
                Para 2026, a leitura prática é:
              </p>
              <ul>
                <li><strong>É tendência real</strong> (o setor está investindo pesado) e deve amadurecer para mercado ao longo dos próximos anos.</li>
                <li><strong>Não é o “padrão seguro” para a maioria dos telhados hoje</strong> se você prioriza garantia consolidada e reposição fácil.</li>
              </ul>
              <p>
                Se você quer economia com risco baixo: foque em N-type (TOPCon) e/ou HJT com marcas e garantias claras.
              </p>

              <h2 id={slugifyId(toc[7])}>{toc[7]}</h2>
              <p>
                No RJ, algumas condições tornam a escolha do painel (e do projeto) mais crítica:
              </p>
              <ul>
                <li><strong>Calor</strong>: módulo quente gera menos — por isso, coeficiente térmico e ventilação importam.</li>
                <li><strong>Maresia/salinidade</strong> em áreas litorâneas: exige atenção em estrutura, fixação, conectores e proteção.</li>
                <li><strong>Telhados</strong> (inclinação, material, sombreamento): o projeto manda na performance final.</li>
              </ul>
              <p>
                É comum duas propostas terem a mesma potência (kWp) e entregarem resultados diferentes no ano.
                Por isso, escolha por <strong>estimativa de geração + engenharia + qualidade</strong>.
              </p>

              <h2 id={slugifyId(toc[8])}>{toc[8]}</h2>
              <div className="not-prose rounded-2xl border border-border bg-muted/30 p-6">
                <div className="text-sm font-semibold">Checklist agressivo (o que exigir antes de fechar)</div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li><strong>Datasheet</strong> do módulo (marca, modelo e tecnologia: TOPCon/HJT, etc.).</li>
                  <li><strong>Garantia</strong>: produto (defeito) e performance (degradação/anos) por escrito.</li>
                  <li><strong>Simulação</strong> com perdas explícitas (sombreamento, temperatura, eficiência de inversor, cabos).</li>
                  <li><strong>Escopo elétrico</strong>: proteções, aterramento, DPS, disjuntores e padrão/entrada quando aplicável.</li>
                  <li><strong>Homologação</strong>: quem faz, prazos, documentação e responsabilidade técnica.</li>
                  <li><strong>Nota fiscal</strong>, ART e relatório final (comissionamento).</li>
                </ul>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Link href="/simulador">
                    <a className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                      Simular e comparar com clareza
                    </a>
                  </Link>
                  <Link href="/contato">
                    <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted">
                      Pedir análise do meu caso
                    </a>
                  </Link>
                </div>
              </div>

              <h2 id={slugifyId(toc[9])}>{toc[9]}</h2>
              <details>
                <summary>Qual tecnologia entrega mais energia no dia a dia?</summary>
                <p>
                  Depende do seu cenário. Em geral, TOPCon (N-type) entrega ótimo custo/benefício e HJT pode levar vantagem em ambientes muito quentes.
                  A escolha certa é a que maximiza <strong>kWh/ano</strong> com garantia e instalação corretas.
                </p>
              </details>
              <details>
                <summary>Existe “painel melhor” para qualquer telhado?</summary>
                <p>
                  Não. Um telhado com sombra parcial pode se beneficiar de estratégias como layout diferente, inversor adequado e, em alguns casos, otimizadores.
                  A tecnologia do módulo ajuda, mas o projeto manda.
                </p>
              </details>
              <details>
                <summary>Placa mais cara sempre compensa?</summary>
                <p>
                  Não. O que compensa é o ganho real de geração ao longo do ano versus a diferença de preço. Por isso, compare proposta por geração (kWh) e garantia.
                </p>
              </details>

              <h2 id={slugifyId(toc[10])}>{toc[10]}</h2>
              <div className="not-prose rounded-2xl border border-border bg-background p-6">
                <div className="text-sm font-semibold">Atendemos RJ e Região com projeto + homologação orientada</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Se você está no Rio de Janeiro, Niterói, São Gonçalo, Itaboraí, Tanguá, Rio Bonito ou Maricá, a Ilumina Sun faz o diagnóstico,
                  recomenda a tecnologia ideal e fecha o escopo com engenharia para reduzir retrabalho.
                </div>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Link href="/simulador">
                    <a className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                      Simular economia
                    </a>
                  </Link>
                  <Link href="/kit-solar">
                    <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted">
                      Ver Kits
                    </a>
                  </Link>
                  <Link href="/contato">
                    <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted">
                      Solicitar contato
                    </a>
                  </Link>
                </div>
              </div>

              <p className="mt-6 text-xs text-muted-foreground">
                Observação: desempenho e viabilidade variam por telhado, rede, distribuição e perfil de consumo. Para decisões finais, valide seu cenário com engenharia e documentação do projeto.
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
                <Link href="/blog/marco-legal-lei-14300-energia-solar-rj"><a className="hover:text-primary">Ler: Lei 14.300 (Marco Legal)</a></Link>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-sm font-semibold">Relacionados</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/blog/marco-legal-lei-14300-energia-solar-rj"><a className="hover:text-primary">Lei 14.300 (Marco Legal) no RJ</a></Link>
                <Link href="/blog/regulamentacao-aneel-energia-solar"><a className="hover:text-primary">Regulamentação ANEEL</a></Link>
                <Link href="/blog/quanto-custa-energia-solar-brasil-2026"><a className="hover:text-primary">Quanto custa energia solar em 2026</a></Link>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </main>
  );
}
