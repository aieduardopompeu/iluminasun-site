import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";
const POST_PATH = "/blog/tendencias-mercado-solar-2026";
const CANONICAL = `${SITE_URL}${POST_PATH}`;
const HERO_IMAGE = "/blog/tendencias-mercado-solar-2026.webp";
const HERO_ALT = "Tendências do mercado solar em 2026: baterias, eficiência e regulação.";
const HERO_CAPTION = "Eficiência, baterias, inversores, precificação e regulação: o que realmente importa em 2026.";
const OG_IMAGE = `${SITE_URL}/blog/tendencias-mercado-solar-2026.webp`;
const DATE_PUBLISHED = "2025-11-15";
const DATE_MODIFIED = "2025-11-15";

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

export default function TendenciasMercadoSolar2026() {
  const title = "Tendências do mercado solar em 2026: o que realmente muda (e o que é só barulho)";
  const description =
    "Eficiência, baterias, inversores, regulação e preços: veja o que impacta sua decisão em 2026, como comparar propostas e onde estão os principais riscos — com foco no RJ e Região.";

  const toc = useMemo(
    () => [
      "Resumo rápido: as 7 tendências que importam",
      "Por que 2026 é diferente: maturidade do mercado e decisões mais técnicas",
      "Tendência 1: eficiência e qualidade do sistema (não só potência)",
      "Tendência 2: baterias e armazenamento (quando faz sentido)",
      "Tendência 3: inversores, monitoramento e proteção",
      "Tendência 4: preço e financiamento (o que mudou)",
      "Tendência 5: regulação e regras de compensação",
      "Erros comuns ao ‘seguir tendência’",
      "Checklist: como comprar com segurança em 2026",
      "Perguntas frequentes (FAQ)",
      "Atendimento Ilumina Sun: RJ e Região",
    ],
    []
  );

  useEffect(() => {
    document.title = `${title} | Ilumina Sun`;

    upsertLink("canonical", CANONICAL);
    upsertMetaBy("name", "description", description);

    upsertMetaBy("property", "og:type", "article");
    upsertMetaBy("property", "og:site_name", "Ilumina Sun");
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
        { "@type": "ListItem", position: 2, name: "Mercado", item: CANONICAL },
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
      inLanguage: "pt-BR",
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
          name: "Bateria vale a pena em 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Depende do seu perfil. Em geral, bateria faz mais sentido para quem precisa de backup, tem consumo noturno relevante ou quer estabilidade em casos de interrupção. Para muitos residenciais, a análise deve ser econômica e de necessidade real.",
          },
        },
        {
          "@type": "Question",
          name: "O que mais diferencia uma proposta boa de uma proposta ruim?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Escopo claro, premissas de geração transparentes, proteções e engenharia bem descritas, garantias, e um dimensionamento alinhado ao seu consumo real. ‘Preço baixo’ sem escopo costuma gerar custo depois.",
          },
        },
        {
          "@type": "Question",
          name: "Em 2026 os preços caem ou sobem?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "O preço final pode variar por câmbio, logística, demanda e componentes. O importante é comparar propostas por qualidade, garantias e premissas — e não apenas por valor total.",
          },
        },
        {
          "@type": "Question",
          name: "Qual tendência impacta mais a economia na conta?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Dimensionamento correto e qualidade de execução continuam sendo os maiores determinantes. Tecnologias novas ajudam, mas não compensam projeto ruim.",
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
          <span className="truncate">Mercado</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <header className="space-y-4">
              <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Mercado
              </div>

              <h1 className="text-3xl font-bold leading-tight md:text-4xl">{title}</h1>
              <p className="text-base text-muted-foreground md:text-lg">{description}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>15 de Novembro, 2025</span>
                <span>•</span>
                <span>10–13 min</span>
              </div>

              <div className="pt-2">
                <ShareBar
                  title={title}
                  url={CANONICAL}
                  slug="tendencias-mercado-solar-2026"
                  contentType="blog"
                  heading=""
                />
              </div>
            </header>

            <figure className="overflow-hidden rounded-2xl border border-border bg-muted/30">
              <img
                src={HERO_IMAGE}
                alt={HERO_ALT}
                className="h-[340px] w-full object-cover sm:h-[420px]"
                loading="lazy"
              />
              {HERO_CAPTION ? (
                <figcaption className="px-4 py-3 text-xs text-muted-foreground">{HERO_CAPTION}</figcaption>
              ) : null}
            </figure>

            <section className="prose prose-slate max-w-none dark:prose-invert">
              <h2 id={slugifyId("Resumo rápido: as 7 tendências que importam")}>Resumo rápido: as 7 tendências que importam</h2>
              <ul>
                <li>
                  <strong>Qualidade do sistema ganhou peso.</strong> Em 2026, comparar proposta por escopo, proteção e engenharia é mais importante que “potência”.
                </li>
                <li>
                  <strong>Baterias viraram conversa séria.</strong> Mas só fazem sentido econômico para perfis específicos (backup, consumo noturno, continuidade).
                </li>
                <li>
                  <strong>Monitoramento e performance.</strong> Sistemas bem monitorados identificam perdas cedo e protegem o retorno.
                </li>
                <li>
                  <strong>Financiamento e fluxo de caixa.</strong> Empresas e residenciais olham para parcela e previsibilidade, não apenas preço à vista.
                </li>
                <li>
                  <strong>Regulação continua definindo comportamento.</strong> Regras de compensação orientam o dimensionamento e a expectativa de economia.
                </li>
                <li>
                  <strong>Propostas “baratas” ficaram mais arriscadas.</strong> O risco migra para adequações, retrabalho e garantia.
                </li>
                <li>
                  <strong>Decisão mais técnica, menos emocional.</strong> Em 2026, o mercado amadureceu: escopo, premissas e garantias são o coração.
                </li>
              </ul>

              <h2 id={slugifyId("Por que 2026 é diferente: maturidade do mercado e decisões mais técnicas")}>Por que 2026 é diferente: maturidade do mercado e decisões mais técnicas</h2>
              <p>
                A energia solar deixou de ser “novidade”. Isso muda o comportamento do consumidor e das empresas: a discussão sai do entusiasmo e entra em
                engenharia, qualidade do projeto e retorno financeiro. Em resumo: quem compra melhor em 2026 é quem compara com método.
              </p>

              <h2 id={slugifyId("Tendência 1: eficiência e qualidade do sistema (não só potência)")}>Tendência 1: eficiência e qualidade do sistema (não só potência)</h2>
              <p>
                Potência (kWp) é só um pedaço. Em 2026, quem entrega resultado é o conjunto: layout, sombreamento, orientações, cabos, proteções, inversor,
                fixação e comissionamento. Dois sistemas com a mesma potência podem gerar diferente por causas bem práticas.
              </p>

              <h2 id={slugifyId("Tendência 2: baterias e armazenamento (quando faz sentido)")}>Tendência 2: baterias e armazenamento (quando faz sentido)</h2>
              <p>
                Bateria não é “obrigatória”. Ela vira interessante quando o objetivo não é só economia, mas <strong>continuidade</strong> (backup), consumo noturno
                relevante ou situações em que o custo de ficar sem energia é alto. O segredo é separar desejo de necessidade e fazer conta com premissas realistas.
              </p>

              <h2 id={slugifyId("Tendência 3: inversores, monitoramento e proteção")}>Tendência 3: inversores, monitoramento e proteção</h2>
              <p>
                Inversor e proteções elétricas viraram o “cérebro e o cinto de segurança” do sistema. Monitoramento robusto ajuda a detectar falhas, sujeira,
                degradação e comportamento fora do esperado. Em 2026, monitorar performance é parte do retorno.
              </p>

              <h2 id={slugifyId("Tendência 4: preço e financiamento (o que mudou)")}>Tendência 4: preço e financiamento (o que mudou)</h2>
              <p>
                O preço final pode variar por câmbio, logística e disponibilidade de componentes. O que mudou foi a maturidade: cada vez mais pessoas e empresas
                comparam pelo custo total (equipamentos + engenharia + instalação + homologação + garantias), e não só pelo número final no orçamento.
              </p>

              <h2 id={slugifyId("Tendência 5: regulação e regras de compensação")}>Tendência 5: regulação e regras de compensação</h2>
              <p>
                Regulação define expectativa. A regra do jogo afeta como créditos são compensados e qual estratégia de dimensionamento faz sentido. A melhor prática
                continua sendo alinhar proposta com seu perfil de consumo e com a regra vigente no seu enquadramento.
              </p>

              <h2 id={slugifyId("Erros comuns ao ‘seguir tendência’")}>Erros comuns ao ‘seguir tendência’</h2>
              <ul>
                <li>
                  <strong>Comprar tecnologia antes de definir objetivo.</strong> Primeiro decide “para quê”, depois escolhe “com o quê”.
                </li>
                <li>
                  <strong>Comparar só preço.</strong> Em 2026, o risco mora no escopo escondido.
                </li>
                <li>
                  <strong>Ignorar premissas de geração.</strong> Sem premissas, payback vira chute.
                </li>
                <li>
                  <strong>Subestimar manutenção e monitoramento.</strong> Performance é parte do retorno.
                </li>
              </ul>

              <h2 id={slugifyId("Checklist: como comprar com segurança em 2026")}>Checklist: como comprar com segurança em 2026</h2>
              <ul>
                <li>
                  <strong>Escopo completo</strong>: itens, proteções, estrutura, engenharia, homologação, comissionamento.
                </li>
                <li>
                  <strong>Premissas claras</strong>: sombreamento, perdas, orientação, sazonalidade e consumo real.
                </li>
                <li>
                  <strong>Garantias</strong>: equipamentos e serviço, suporte e SLA.
                </li>
                <li>
                  <strong>Comparação por qualidade</strong>: inversor, proteções, monitoramento e instalação.
                </li>
                <li>
                  <strong>Decisão financeira realista</strong>: retorno com margem de segurança, não “promessa”.
                </li>
              </ul>

              <h2 id={slugifyId("Perguntas frequentes (FAQ)")}>Perguntas frequentes (FAQ)</h2>
              <h3>Bateria é tendência, mas preciso mesmo?</h3>
              <p>
                Só se houver necessidade de backup, consumo noturno relevante ou custo alto de parada. Caso contrário, pode ser melhor investir em qualidade do
                sistema e monitoramento.
              </p>
              <h3>O que eu devo olhar em um orçamento em 2026?</h3>
              <p>
                Escopo, premissas de geração, proteções, garantias e cronograma. Proposta sem detalhes costuma gerar custo depois.
              </p>
              <h3>Qual tendência mais impacta a economia?</h3>
              <p>
                Projeto bem dimensionado e bem executado. Tecnologia nova ajuda, mas não salva um projeto ruim.
              </p>
              <h3>O mercado está mais seguro em 2026?</h3>
              <p>
                Está mais maduro, mas isso não elimina risco. O consumidor precisa comparar com método e exigir escopo e premissas.
              </p>

              <h2 id={slugifyId("Atendimento Ilumina Sun: RJ e Região")}>Atendimento Ilumina Sun: RJ e Região</h2>
              <p>
                A Ilumina Sun atende <strong>Rio de Janeiro</strong>, <strong>Niterói</strong>, <strong>São Gonçalo</strong>, <strong>Itaboraí</strong>,
                <strong> Maricá</strong>, <strong>Tanguá</strong> e <strong>Rio Bonito</strong>, com projetos residenciais e empresariais. Em 2026, o objetivo é
                simples: um sistema com escopo fechado e performance previsível — sem surpresas.
              </p>
            </section>

            <div className="rounded-2xl border border-border bg-muted/30 p-6">
              <div className="text-sm font-semibold">Quer comparar propostas com um checklist técnico?</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Faça a simulação e fale com um especialista para validar escopo, premissas e retorno com segurança.
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
              <div className="text-sm font-semibold">Neste artigo</div>
              <nav className="mt-3 space-y-2 text-sm">
                {toc.map((t) => (
                  <a
                    key={t}
                    href={`#${slugifyId(t)}`}
                    className="block text-muted-foreground hover:text-primary"
                  >
                    {t}
                  </a>
                ))}
              </nav>
            </div>

            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-sm font-semibold">Relacionados</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/blog/quanto-custa-energia-solar-brasil-2026">
                  <a className="hover:text-primary">Quanto custa energia solar em 2026</a>
                </Link>
                <Link href="/blog/financiamento-energia-solar-rj">
                  <a className="hover:text-primary">Financiamento no RJ</a>
                </Link>
                <Link href="/blog/marco-legal-lei-14300-energia-solar-rj">
                  <a className="hover:text-primary">Lei 14.300 (Marco Legal)</a>
                </Link>
                <Link href="/simulador">
                  <a className="hover:text-primary">Simulador</a>
                </Link>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </main>
  );
}
