import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";

const POST_SLUG = "inteligencia-artificial-energia-solar-rj";
const POST_PATH = `/blog/${POST_SLUG}`;
const CANONICAL = `${SITE_URL}${POST_PATH}`;

const HERO_IMAGE = "/blog/inteligencia-artificial-energia-solar.webp";
const HERO_ALT = "Inteligência artificial aplicada à energia solar: monitoramento, previsão e manutenção preditiva no RJ.";
const HERO_CAPTION = "IA na prática: prever, detectar e corrigir perdas para gerar mais kWh e reduzir falhas.";

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

export default function IAEnergiaSolarRJ() {
  const title = "Como a inteligência artificial está otimizando a energia solar: mais geração, menos falhas e decisões melhores no RJ";
  const pageTitle = `${title} | Ilumina Sun`;
  const description = "Entenda como IA e análise de dados aumentam a performance de sistemas fotovoltaicos: previsão de geração, manutenção preditiva, detecção de falhas e monitoramento inteligente. Guia prático para RJ e região.";

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
      "Resumo executivo: como a IA aumenta geração e reduz falhas",
      "IA aplicada à energia solar: o que é real e o que é marketing",
      "Previsão de geração e consumo: onde nasce a economia",
      "Manutenção preditiva: como evitar perda invisível (e cara)",
      "Detecção de falhas e sombreamento: ganhos no dia a dia",
      "IA no inversor, no monitoramento e no app: o que pedir na proposta",
      "Como aplicar no RJ: calor, variabilidade e qualidade de rede",
      "Checklist agressivo: requisitos técnicos e de dados",
      "FAQ (perguntas rápidas)",
      "Ilumina Sun: monitoramento, projeto e orientação no RJ e região"
    ],
    []
  );

  const breadcrumbJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 2, name: "IA", item: CANONICAL },
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
          name: "IA é obrigatória para ter energia solar?",
          acceptedAnswer: { "@type": "Answer", text: "Não. O sistema funciona sem IA. A IA entra como camada de otimização: melhor monitoramento, alertas e decisões que reduzem perdas e falhas." },
        },
        {
          "@type": "Question",
          name: "O que mais derruba a geração sem o cliente perceber?",
          acceptedAnswer: { "@type": "Answer", text: "Falhas intermitentes, sujeira, sombreamento novo (árvore/obra), conectores ruins e aquecimento excessivo. Monitoramento com alertas reduz esse “vazamento” de energia." },
        },
        {
          "@type": "Question",
          name: "Preciso de internet para o monitoramento?",
          acceptedAnswer: { "@type": "Answer", text: "Na maioria dos casos, sim, porque dados do inversor/medidor precisam ser enviados. Existem alternativas com armazenamento local, mas é importante planejar isso no projeto." },
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
          <span className="truncate">IA</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <header className="space-y-4">
              <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                IA · Monitoramento · Performance · RJ e Região
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
                  <li>IA aumenta resultado quando vira rotina: <strong>medir → detectar → corrigir</strong> (não “dashboard bonito”).</li>
                  <li>Os maiores ganhos vêm de <strong>previsão</strong> (geração/consumo) e <strong>manutenção preditiva</strong> (menos downtime).</li>
                  <li>No RJ, calor e variação de irradiância tornam a análise de dados mais valiosa — principalmente para comércio e empresas.</li>
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
                “IA na energia solar” pode significar três coisas bem diferentes: <strong>automação</strong> (regras e alertas), <strong>análise estatística</strong> (modelos que detectam anomalias)
                e <strong>modelos preditivos</strong> (prever geração/consumo e sugerir ações). O que interessa para você é simples: se isso vira <strong>mais kWh</strong> e <strong>menos dor de cabeça</strong>.
              </p>
              <ul>
                <li><strong>Real</strong>: alertas de falha, queda de performance, comparação por histórico e clima, previsão de geração.</li>
                <li><strong>Meio-termo</strong>: “insights” genéricos sem plano de ação (bom, mas pouco decisivo).</li>
                <li><strong>Marketing</strong>: promessas sem acesso a dados, sem métricas e sem responsabilidade por corrigir.</li>
              </ul>

              <h2 id={slugifyId(toc[2])}>{toc[2]}</h2>
              <p>
                A maior economia nasce quando você entende <strong>quanto vai gerar</strong> e <strong>quando você consome</strong>. Isso evita dois erros caros:
                subdimensionar (economia abaixo do esperado) ou superdimensionar (investimento maior sem retorno proporcional).
              </p>
              <p>
                Na prática, IA entra para:
              </p>
              <ul>
                <li>Prever a geração (kWh) por sazonalidade e clima, reduzindo surpresa no inverno/verão.</li>
                <li>Identificar desvio: “seu sistema deveria estar gerando X hoje, mas está gerando Y”.</li>
                <li>Sugerir ajustes de uso (para comércio/empresa): deslocar cargas para horário de maior geração.</li>
              </ul>

              <h2 id={slugifyId(toc[3])}>{toc[3]}</h2>
              <p>
                “Downtime” (tempo parado) e quedas parciais de performance são os vilões silenciosos. Você pode passar semanas perdendo energia sem perceber.
                Manutenção preditiva é detectar o problema antes de virar prejuízo grande.
              </p>
              <div className="not-prose rounded-2xl border border-border bg-background p-5">
                <div className="text-sm font-semibold">Exemplos comuns de perda invisível</div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li>Conector com mau contato aquecendo (perde energia e aumenta risco).</li>
                  <li>String com desempenho abaixo do histórico (sombra nova, sujeira, microfissura).</li>
                  <li>Inversor reiniciando ou operando com limitação por temperatura.</li>
                </ul>
              </div>

              <h2 id={slugifyId(toc[4])}>{toc[4]}</h2>
              <p>
                Detecção de falhas e sombreamento é onde a IA “brilha” no dia a dia: comparar séries históricas, correlacionar com clima e apontar anomalias.
                Isso reduz visitas desnecessárias e acelera correção quando realmente precisa.
              </p>
              <ul>
                <li><strong>Sombreamento novo</strong>: árvore cresceu, obra vizinha, antena, caixa d’água.</li>
                <li><strong>Sujeira</strong>: poeira, fuligem, maresia e resíduos (varia por bairro e vento).</li>
                <li><strong>Falhas elétricas</strong>: disjuntores, DPS, aterramento e conectores.</li>
              </ul>

              <h2 id={slugifyId(toc[5])}>{toc[5]}</h2>
              <p>
                Para aplicar IA de verdade, você precisa de três coisas no escopo: <strong>dados</strong>, <strong>alertas</strong> e <strong>processo</strong>.
                Pergunte na proposta:
              </p>
              <ul>
                <li>Quais dados ficam disponíveis (inversor, medidor, tensão/corrente, histórico)?</li>
                <li>Quais alertas existem (queda de geração, falha de comunicação, aquecimento, anomalia)?</li>
                <li>Quem reage ao alerta (você ou a equipe técnica)? Em quanto tempo?</li>
              </ul>

              <h2 id={slugifyId(toc[6])}>{toc[6]}</h2>
              <p>
                No RJ, o conjunto <strong>calor + variação de irradiância + características de rede</strong> torna o monitoramento mais valioso.
                Sistemas em telhado quente sofrem mais com temperatura; comércio e empresas ganham muito quando ajustam uso para o pico solar.
              </p>

              <h2 id={slugifyId(toc[7])}>{toc[7]}</h2>
              <div className="not-prose rounded-2xl border border-border bg-muted/30 p-6">
                <div className="text-sm font-semibold">Checklist agressivo (dados + operação)</div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li>Monitoramento com acesso do cliente + histórico exportável.</li>
                  <li>Alertas configurados (queda de geração, falha, temperatura, comunicação).</li>
                  <li>Plano de operação: quem recebe alertas e como abre chamado.</li>
                  <li>Rede/Internet: solução planejada (Wi‑Fi, cabo, repetidor, 4G quando necessário).</li>
                  <li>Relatório mensal (opcional) comparando geração prevista vs real.</li>
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
                <summary>IA é obrigatória para ter energia solar?</summary>
                <p>Não. O sistema funciona sem IA. A IA entra como camada de otimização: melhor monitoramento, alertas e decisões que reduzem perdas e falhas.</p>
              </details>
              <details>
                <summary>O que mais derruba a geração sem o cliente perceber?</summary>
                <p>Falhas intermitentes, sujeira, sombreamento novo (árvore/obra), conectores ruins e aquecimento excessivo. Monitoramento com alertas reduz esse “vazamento” de energia.</p>
              </details>
              <details>
                <summary>Preciso de internet para o monitoramento?</summary>
                <p>Na maioria dos casos, sim, porque dados do inversor/medidor precisam ser enviados. Existem alternativas com armazenamento local, mas é importante planejar isso no projeto.</p>
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
                <Link href="/blog/marco-legal-energia-solar-lei-14300-explicado"><a className="hover:text-primary">Ler: Marco Legal (Lei 14.300)</a></Link>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-sm font-semibold">Relacionados</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/blog/tecnologias-paineis-solares-2026-rj"><a className="hover:text-primary">Tecnologias de painéis em 2026</a></Link>
                <Link href="/blog/marco-legal-energia-solar-lei-14300-explicado"><a className="hover:text-primary">Lei 14.300 (Marco Legal)</a></Link>
                <Link href="/blog/regulamentacao-aneel-energia-solar"><a className="hover:text-primary">Regulamentação ANEEL</a></Link>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </main>
  );
}
