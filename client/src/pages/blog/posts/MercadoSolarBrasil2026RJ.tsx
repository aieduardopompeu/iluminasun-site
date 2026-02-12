import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";

const POST_SLUG = "mercado-energia-solar-brasil-2026-panorama-rj";
const POST_PATH = `/blog/${POST_SLUG}`;
const CANONICAL = `${SITE_URL}${POST_PATH}`;

const HERO_IMAGE = "/blog/mercado-energia-solar-brasil-2026.webp";
const HERO_ALT = "Panorama do mercado de energia solar no Brasil em 2026: crescimento, tendências e oportunidades no RJ.";
const HERO_CAPTION = "Mercado 2026: crescimento, tendências e como comparar propostas com segurança.";

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

export default function MercadoSolarBrasil2026RJ() {
  const title = "Panorama do mercado de energia solar no Brasil em 2026: tendências, oportunidades e como decidir com segurança no RJ";
  const pageTitle = `${title} | Ilumina Sun`;
  const description = "Visão prática do mercado solar em 2026 no Brasil: crescimento da geração distribuída, tendências por setor, o que afeta o retorno e como comparar propostas. Foco no RJ e região.";

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
      "Resumo executivo: o que está puxando o crescimento da solar no Brasil",
      "Panorama em 2026: por que o mercado segue forte (mesmo com mudanças)",
      "Geração distribuída vs usinas: onde estão as oportunidades",
      "O que mais afeta o retorno: tarifa, consumo, engenharia e prazos",
      "Tendências de compra: residencial, empresas e agronegócio",
      "RJ e região: o que muda na prática para quem quer instalar",
      "Como comparar propostas em mercado aquecido (sem cair em cilada)",
      "Checklist agressivo: sinais de proposta boa vs. proposta perigosa",
      "FAQ (perguntas rápidas)",
      "Ilumina Sun: simulação e projeto com engenharia no RJ e região"
    ],
    []
  );

  const breadcrumbJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 2, name: "Mercado", item: CANONICAL },
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
          name: "Energia solar ainda vale a pena em 2026?",
          acceptedAnswer: { "@type": "Answer", text: "Na maioria dos casos, sim, quando o sistema é bem dimensionado e o processo de homologação é feito sem retrabalho. O payback depende da tarifa e do seu consumo." },
        },
        {
          "@type": "Question",
          name: "O que mais muda o retorno financeiro?",
          acceptedAnswer: { "@type": "Answer", text: "Tarifa (bandeiras e reajustes), perfil de consumo, sombreamento/temperatura, qualidade do projeto elétrico e prazos de homologação." },
        },
        {
          "@type": "Question",
          name: "Financiamento compensa?",
          acceptedAnswer: { "@type": "Answer", text: "Pode compensar quando a parcela fica próxima (ou abaixo) da economia mensal, mas é essencial comparar CET, prazo e escopo do projeto." },
        }
      ],
    }),
    []
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd)  }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd)  }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd)  }} />

      <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-16 md:px-6 lg:px-0">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog">
            <a className="hover:text-primary">Blog</a>
          </Link>
          <span>•</span>
          <span className="truncate">Mercado</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <header className="space-y-4">
              <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Mercado · Tendências · Investimentos · RJ e Região
              </div>

              <h1 className="text-3xl font-bold leading-tight md:text-4xl">{title}</h1>
              <p className="text-base text-muted-foreground md:text-lg">{description}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>Atualizado em 12/02/2026</span>
                <span>•</span>
                <span>10–14 min de leitura</span>
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
                  <li>O mercado cresce porque solar virou <strong>decisão econômica</strong>: tarifa alta + maturidade de tecnologia + financiamentos.</li>
                  <li>O retorno depende mais de <strong>engenharia, prazos e perfil de consumo</strong> do que de “marca da placa”.</li>
                  <li>No RJ, o diferencial é reduzir retrabalho: padrão/entrada, documentação e homologação bem fechados.</li>
                </ul>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Link href="/simulador">
                    <a className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95">
                      Ver minha economia em 1 minuto
                    </a>
                  </Link>
                  <Link href="/contato">
                    <a className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted">
                      Pedir análise do meu caso
                    </a>
                  </Link>
                </div>
              </div>

                            <h2 id={slugifyId(toc[1])}>{toc[1]}</h2>
              <p>
                Em 2026, energia solar consolidou um ponto: deixou de ser “tendência” para virar <strong>decisão econômica</strong>.
                Mesmo com mudanças regulatórias e ajustes de mercado, o motor principal segue o mesmo: conta de luz alta + tecnologia madura + oferta de financiamento.
              </p>
              <ul>
                <li><strong>Cliente mais exigente</strong>: quer simulação clara, prazo e responsabilidade pela homologação.</li>
                <li><strong>Mais opções técnicas</strong>: módulos N-type (TOPCon/HJT), inversores melhores e monitoramento mais inteligente.</li>
                <li><strong>Concorrência maior</strong>: mais empresas vendendo — e mais propostas ruins circulando.</li>
              </ul>

              <h2 id={slugifyId(toc[2])}>{toc[2]}</h2>
              <p>
                O mercado se divide em duas frentes: <strong>geração distribuída</strong> (telhados e pequenas centrais conectadas a unidades consumidoras)
                e <strong>usinas</strong> (projetos maiores). Para a maioria das pessoas e empresas, o jogo principal é a geração distribuída — onde a economia é mais direta.
              </p>
              <div className="not-prose rounded-2xl border border-border bg-background p-5">
                <div className="text-sm font-semibold">Oportunidade prática</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Se seu objetivo é reduzir conta, foque no seu caso: consumo, telhado, sombra, tarifa e escopo. “Notícia do mercado” ajuda, mas não substitui diagnóstico.
                </div>
              </div>

              <h2 id={slugifyId(toc[3])}>{toc[3]}</h2>
              <p>
                O retorno não depende só do preço do kit. Os fatores que mais mexem no payback:
              </p>
              <ul>
                <li><strong>Tarifa</strong> e reajustes: quanto mais cara a energia, mais rápido o retorno (em geral).</li>
                <li><strong>Perfil de consumo</strong>: consumo diurno tende a aproveitar mais a geração instantânea.</li>
                <li><strong>Engenharia</strong>: layout, cabos, proteções, aterramento e desempenho térmico.</li>
                <li><strong>Prazos</strong>: atrasos de homologação e pendências viram “custo invisível”.</li>
              </ul>

              <h2 id={slugifyId(toc[4])}>{toc[4]}</h2>
              <p>
                Tendências claras em 2026:
              </p>
              <ul>
                <li><strong>Residencial</strong>: foco em custo/benefício e confiança (garantia + empresa sólida).</li>
                <li><strong>Empresas</strong>: projetos com simulação por horário, demanda e redução de risco operacional.</li>
                <li><strong>Agronegócio</strong>: irrigação, bombeamento, refrigeração e expansão em áreas com boa insolação.</li>
              </ul>

              <h2 id={slugifyId(toc[5])}>{toc[5]}</h2>
              <p>
                No RJ e região, os pontos que mais travam projeto não são “tecnologia” — são <strong>processo</strong>:
                padrão/entrada, documentação e consistência entre projeto e instalação. Por isso, proposta boa é proposta com escopo fechado.
              </p>

              <h2 id={slugifyId(toc[6])}>{toc[6]}</h2>
              <p>
                Em mercado aquecido, aparece muita proposta agressiva de preço com escopo “curto”. Compare assim:
              </p>
              <ul>
                <li>Compare por <strong>geração estimada (kWh)</strong> e premissas explícitas.</li>
                <li>Exija <strong>marca/modelo</strong> e datasheet do módulo e inversor.</li>
                <li>Confirme <strong>homologação</strong>: quem faz, prazo e responsabilidade técnica.</li>
              </ul>

              <h2 id={slugifyId(toc[7])}>{toc[7]}</h2>
              <div className="not-prose rounded-2xl border border-border bg-muted/30 p-6">
                <div className="text-sm font-semibold">Checklist agressivo (mercado aquecido)</div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li>Proposta com geração estimada (kWh/mês) e perdas detalhadas.</li>
                  <li>Lista completa: módulos, inversor, estrutura, cabos, proteções e aterramento.</li>
                  <li>Garantias por escrito + nota fiscal + ART/responsável técnico.</li>
                  <li>Escopo de homologação e padrão/entrada bem definidos (sem “depois a gente vê”).</li>
                  <li>Cronograma realista e canais de suporte pós-instalação.</li>
                </ul>
              </div>

              <h2 id={slugifyId(toc[8])}>{toc[8]}</h2>

              <h2 id={slugifyId(toc[1])}>{toc[1]}</h2>
              <p>
                Este artigo foi estruturado para ser prático: você entende o que é tendência, o que muda no seu bolso e como evitar decisões por impulso.
                A lógica é sempre a mesma: comparar por <strong>resultado (kWh e R$)</strong>, e não por promessa.
              </p>

              <h2 id={slugifyId(toc[2])}>{toc[2]}</h2>
              <p>
                Aqui, o foco é identificar onde está o ganho real e onde costuma haver “marketing de planilha”. Use este bloco como guia para comparar propostas.
              </p>

              <h2 id={slugifyId(toc[3])}>{toc[3]}</h2>
              <p>
                No Brasil (e especialmente no RJ), as variáveis de calor, tarifa e perfil de consumo mudam a conclusão. A tecnologia é importante, mas a engenharia manda.
              </p>

              <h2 id={slugifyId(toc[4])}>{toc[4]}</h2>
              <p>
                O melhor caminho é fechar um escopo com premissas claras: o que está incluso, quem se responsabiliza pela homologação e como você mede o resultado.
              </p>

              <h2 id={slugifyId(toc[5])}>{toc[5]}</h2>
              <p>
                Abaixo, um conjunto de perguntas comuns para acelerar sua decisão sem perder segurança.
              </p>

              <h2 id={slugifyId(toc[6])}>{toc[6]}</h2>
              <details>
                <summary>Energia solar ainda vale a pena em 2026?</summary>
                <p>Na maioria dos casos, sim, quando o sistema é bem dimensionado e o processo de homologação é feito sem retrabalho. O payback depende da tarifa e do seu consumo.</p>
              </details>
              <details>
                <summary>O que mais muda o retorno financeiro?</summary>
                <p>Tarifa (bandeiras e reajustes), perfil de consumo, sombreamento/temperatura, qualidade do projeto elétrico e prazos de homologação.</p>
              </details>
              <details>
                <summary>Financiamento compensa?</summary>
                <p>Pode compensar quando a parcela fica próxima (ou abaixo) da economia mensal, mas é essencial comparar CET, prazo e escopo do projeto.</p>
              </details>

              <h2 id={slugifyId(toc[toc.length - 1])}>{toc[toc.length - 1]}</h2>
              <div className="not-prose rounded-2xl border border-border bg-background p-6">
                <div className="text-sm font-semibold">Atendemos RJ e Região com projeto + homologação orientada</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Se você está no Rio de Janeiro, Niterói, São Gonçalo, Itaboraí, Tanguá, Rio Bonito ou Maricá, a Ilumina Sun faz o diagnóstico e orienta o melhor caminho técnico.
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
                Observação: desempenho e viabilidade variam por telhado, rede, distribuidora e perfil de consumo. Para decisões finais, valide seu cenário com engenharia e documentação do projeto.
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
                <Link href="/blog/tecnologias-paineis-solares-2026-rj"><a className="hover:text-primary">Ler: Tecnologias 2026</a></Link>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-sm font-semibold">Relacionados</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/blog/tecnologias-paineis-solares-2026-rj"><a className="hover:text-primary">Tecnologias de painéis em 2026</a></Link>
                <Link href="/blog/baterias-energia-solar-vale-a-pena-2026-rj"><a className="hover:text-primary">Baterias solares: vale a pena?</a></Link>
                <Link href="/blog/marco-legal-energia-solar-lei-14300-explicado"><a className="hover:text-primary">Lei 14.300 (Marco Legal)</a></Link>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </main>
  );
}
