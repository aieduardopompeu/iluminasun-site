import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";
const POST_PATH = "/blog/conta-de-luz-nao-zerou-energia-solar";
const CANONICAL = `${SITE_URL}${POST_PATH}`;
const HERO_IMAGE = "/blog/conta-de-luz-nao-zerou.webp";
const HERO_ALT = "Conta de luz com energia solar: mínimos, taxas e compensação no RJ.";
const HERO_CAPTION = "Mesmo com energia solar, a fatura pode ter custo mínimo e itens fixos - entenda o que é normal e o que é erro.";
const OG_IMAGE = `${SITE_URL}/blog/conta-de-luz-nao-zerou.webp`;
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

function slugifyId(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function ContaDeLuzNaoZerou() {
  const title = "Conta de luz não zerou com energia solar? Entenda mínimos, taxas, compensação e o que checar";

  const description =
    "Mesmo com energia solar, a conta pode não zerar por custo mínimo, itens fixos e regras de compensação. Veja o que é normal, o que pode ser erro e um checklist de verificação - com foco no RJ e Região.";

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

  const toc = useMemo(
    () => [
      "Resumo rápido: por que a conta não zera",
      "O que é normal na fatura (itens mínimos e fixos)",
      "Compensação de créditos: como funciona na prática",
      "Antes x depois: como ler sua fatura de forma correta",
      "Quando a conta não zera por erro (sinais de alerta)",
      "Erros comuns (e como evitar)",
      "Checklist: o que checar no seu caso",
      "Perguntas frequentes (FAQ)",
      "Atendimento Ilumina Sun: RJ e Região",
    ],
    []
  );

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
          name: "É normal pagar alguma coisa mesmo com energia solar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sim. Em geral existem itens mínimos e componentes fixos na fatura. A economia vem da redução da parcela de energia consumida da rede e da compensação de créditos, não de uma ‘conta zerada’ em todos os meses.",
          },
        },
        {
          "@type": "Question",
          name: "Por que meus créditos não compensaram tudo no mês?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pode ser por consumo maior do que a geração, sazonalidade (mês com menos sol), regras de compensação, prazos de leitura/faturamento ou por a usina ter começado a gerar após a data de leitura.",
          },
        },
        {
          "@type": "Question",
          name: "Como saber se o sistema está gerando menos do que deveria?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Compare a geração informada no monitoramento com a expectativa do projeto e com o histórico de meses anteriores. Sombreamento, sujeira, falhas de comunicação ou configuração podem reduzir a geração.",
          },
        },
        {
          "@type": "Question",
          name: "A conta pode subir mesmo com solar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pode, se o consumo aumentou, se houve mudança de hábitos, se a tarifa subiu e sua geração não acompanhou, ou se existem itens fixos e encargos. O correto é analisar fatura e geração em conjunto.",
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
          <span className="truncate">Regulamentação</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <header className="space-y-4">
              <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Regulamentação
              </div>
              <h1 className="text-3xl font-bold leading-tight md:text-4xl">{title}</h1>
              <p className="text-base text-muted-foreground md:text-lg">{description}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>07 de Janeiro, 2025</span>
                <span>•</span>
                <span>10–13 min</span>
              </div>

              <div className="pt-2">
                <ShareBar
                  title={title}
                  url={CANONICAL}
                  slug="conta-de-luz-nao-zerou-energia-solar"
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
              <h2 id={slugifyId("Resumo rápido: por que a conta não zera")}>Resumo rápido: por que a conta não zera</h2>
              <ul>
                <li>
                  <strong>“Conta zerada” é exceção.</strong> A maioria das faturas mantém itens fixos e custo mínimo.
                </li>
                <li>
                  <strong>Crédito não é dinheiro.</strong> É compensação de energia: depende da leitura e das regras da distribuidora.
                </li>
                <li>
                  <strong>Geração varia por mês.</strong> Sazonalidade, clima e sombreamento impactam o resultado.
                </li>
                <li>
                  <strong>O que importa é o conjunto:</strong> geração (monitoramento) + consumo (fatura).
                </li>
              </ul>

              <h2 id={slugifyId("O que é normal na fatura (itens mínimos e fixos)")}>
                O que é normal na fatura (itens mínimos e fixos)
              </h2>
              <p>
                Mesmo com energia solar, a unidade consumidora continua conectada à rede. Por isso, é comum existir um valor mínimo e componentes fixos.
                Isso não significa que o sistema “não funcionou”. Significa que a fatura tem itens que não dependem apenas do consumo mensal.
              </p>
              <ul>
                <li>
                  <strong>Custo mínimo:</strong> valor associado à disponibilidade de energia (varia conforme o tipo de ligação).
                </li>
                <li>
                  <strong>Encargos e componentes fixos:</strong> podem aparecer mesmo com baixo consumo.
                </li>
                <li>
                  <strong>Diferença de leitura:</strong> se a usina começou a gerar após a leitura, a compensação pode vir no mês seguinte.
                </li>
              </ul>

              <h2 id={slugifyId("Compensação de créditos: como funciona na prática")}>
                Compensação de créditos: como funciona na prática
              </h2>
              <p>
                Em linhas gerais, você injeta energia excedente na rede e recebe créditos para abater consumo em outros momentos. Porém, há um detalhe prático:
                o “mês do crédito” e o “mês da fatura” nem sempre se alinham perfeitamente por causa das datas de leitura e compensação.
              </p>
              <p>
                Por isso, o correto é analisar um período maior (por exemplo, 3 a 6 faturas) e cruzar com o histórico de geração do monitoramento.
              </p>

              <h2 id={slugifyId("Antes x depois: como ler sua fatura de forma correta")}>
                Antes x depois: como ler sua fatura de forma correta
              </h2>
              <p>
                Antes, você pagava praticamente tudo na energia comprada da rede. Depois do sistema, parte do consumo é abatida por geração e créditos.
                Para avaliar corretamente:
              </p>
              <ol>
                <li>
                  Compare <strong>kWh consumidos</strong> e <strong>kWh compensados</strong>, não apenas o valor em reais.
                </li>
                <li>
                  Verifique se houve <strong>aumento de consumo</strong> (novos equipamentos, ar condicionado, mudanças de hábito).
                </li>
                <li>
                  Olhe a geração do monitoramento no mesmo período da leitura.
                </li>
              </ol>

              <h2 id={slugifyId("Quando a conta não zera por erro (sinais de alerta)")}>
                Quando a conta não zera por erro (sinais de alerta)
              </h2>
              <p>
                Existe diferença entre “não zerar por normalidade” e “não zerar por problema”. Sinais típicos de atenção:
              </p>
              <ul>
                <li>
                  Monitoramento mostra geração muito abaixo do esperado por vários meses.
                </li>
                <li>
                  Inversor com alertas frequentes (ou quedas de geração em horário de sol).
                </li>
                <li>
                  Sombreamento novo (árvore cresceu, obra no vizinho, mudança no telhado).
                </li>
                <li>
                  Distribuidora ainda não está compensando corretamente após homologação (documentação/etapas pendentes).
                </li>
              </ul>

              <h2 id={slugifyId("Erros comuns (e como evitar)")}>Erros comuns (e como evitar)</h2>
              <ul>
                <li>
                  <strong>Expectativa irreal:</strong> acreditar que a conta será sempre zero.
                </li>
                <li>
                  <strong>Dimensionamento pelo menor preço:</strong> sistema menor gera menos e frustra.
                </li>
                <li>
                  <strong>Sem manutenção básica:</strong> sujeira e falhas de comunicação mascaram problemas.
                </li>
                <li>
                  <strong>Não acompanhar fatura + monitoramento:</strong> sem isso, você não identifica desvios.
                </li>
              </ul>

              <h2 id={slugifyId("Checklist: o que checar no seu caso")}>Checklist: o que checar no seu caso</h2>
              <ul>
                <li>
                  Conferir a <strong>data de leitura</strong> da fatura e comparar com a geração do período.
                </li>
                <li>
                  Verificar se há <strong>créditos acumulados</strong> e como estão sendo abatidos.
                </li>
                <li>
                  Checar se houve <strong>aumento de consumo</strong> desde a instalação.
                </li>
                <li>
                  Confirmar <strong>alertas no inversor</strong> e estabilidade de conexão do monitoramento.
                </li>
                <li>
                  Inspecionar <strong>sombreamento</strong> e sujeira nos módulos (principalmente após períodos secos).
                </li>
                <li>
                  Se suspeitar de divergência, solicitar <strong>revisão técnica</strong> do sistema e análise das últimas faturas.
                </li>
              </ul>

              <h2 id={slugifyId("Perguntas frequentes (FAQ)")}>Perguntas frequentes (FAQ)</h2>
              <h3>Quanto é “normal” pagar com energia solar?</h3>
              <p>
                Depende do tipo de ligação, da tarifa, do seu consumo e da geração. O parâmetro correto é reduzir drasticamente a parcela variável da fatura,
                mantendo apenas itens mínimos e componentes fixos.
              </p>
              <h3>Se sobrar crédito, eu perco?</h3>
              <p>
                Em geral, créditos podem ser usados em meses seguintes, conforme regras vigentes. O ideal é acompanhar o saldo e entender o ciclo de leitura.
              </p>
              <h3>Preciso limpar painel para a conta reduzir?</h3>
              <p>
                Em muitos casos, limpeza e inspeção ajudam. Mas o principal é verificar se existe queda consistente de geração em relação ao esperado.
              </p>
              <h3>Por que em alguns meses a economia é maior e em outros menor?</h3>
              <p>
                Geração varia por sazonalidade e clima. Além disso, seu consumo pode mudar (mais calor = mais ar condicionado), alterando a fatura.
              </p>

              <h2 id={slugifyId("Atendimento Ilumina Sun: RJ e Região")}>Atendimento Ilumina Sun: RJ e Região</h2>
              <p>
                Atendemos análise e suporte em <strong>Rio de Janeiro</strong>, <strong>Niterói</strong>, <strong>São Gonçalo</strong>, <strong>Itaboraí</strong>,
                <strong> Maricá</strong>, <strong>Tanguá</strong> e <strong>Rio Bonito</strong>. Se sua conta não está batendo com a expectativa, o melhor caminho
                é cruzar fatura e monitoramento e revisar premissas do projeto.
              </p>
            </section>

            <div className="rounded-2xl border border-border bg-muted/30 p-6">
              <div className="text-sm font-semibold">Quer checar se está tudo certo no seu sistema?</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Envie sua fatura e o histórico de geração para avaliarmos se a compensação está acontecendo como deveria.
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
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-sm font-semibold">Neste artigo</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                {toc.map((item) => (
                  <a
                    key={item}
                    href={`#${slugifyId(item)}`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-sm font-semibold">Relacionados</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/blog/marco-legal-lei-14300-energia-solar-rj">
                  <a className="hover:text-primary">Lei 14.300 (Marco Legal)</a>
                </Link>
                <Link href="/blog/financiamento-energia-solar-rj">
                  <a className="hover:text-primary">Financiamento no RJ</a>
                </Link>
                <Link href="/blog/vida-util-e-manutencao-paineis-solares">
                  <a className="hover:text-primary">Vida útil e manutenção</a>
                </Link>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </main>
  );
}
