import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";

const POST_SLUG = "baterias-energia-solar-vale-a-pena-2026-rj";
const POST_PATH = `/blog/${POST_SLUG}`;
const CANONICAL = `${SITE_URL}${POST_PATH}`;

const HERO_IMAGE = "/blog/baterias-energia-solar-2026.webp";
const HERO_ALT = "Baterias para energia solar em 2026: quando vale a pena e como dimensionar no RJ.";
const HERO_CAPTION = "Armazenamento em 2026: autonomia, backup e decisões baseadas em kWh (não em promessa).";

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

export default function BateriasSolares2026RJ() {
  const title = "Baterias para energia solar em 2026: quando vale a pena, como dimensionar e evitar compra errada no RJ";
  const pageTitle = `${title} | Ilumina Sun`;
  const description = "Guia prático sobre baterias solares em 2026: para quem faz sentido, tipos (LFP e outras), cálculo de autonomia, inversor híbrido e checklist de segurança. Foco no RJ e região.";

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
      "Resumo executivo: quando baterias fazem sentido em 2026",
      "Bateria solar em 2026: para quem é (e para quem não é)",
      "Tipos de bateria: lítio, LFP e alternativas — o que olhar",
      "Economia vs. autonomia: como calcular sem se enganar",
      "Cenários reais no RJ: falta de luz, ponta, comércio e home office",
      "Inversor híbrido, backup e automação: o que muda no projeto",
      "Instalação segura: proteções, ventilação, normas e garantia",
      "Checklist agressivo: o que exigir do fornecedor",
      "FAQ (perguntas rápidas)",
      "Ilumina Sun: projeto híbrido e orientação no RJ e região"
    ],
    []
  );

  const breadcrumbJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 2, name: "Baterias", item: CANONICAL },
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
          name: "Bateria reduz minha conta de luz?",
          acceptedAnswer: { "@type": "Answer", text: "Pode reduzir em cenários específicos, mas o principal benefício costuma ser autonomia/backup. A economia depende da tarifa, do perfil de consumo e de como o sistema é configurado." },
        },
        {
          "@type": "Question",
          name: "Qual bateria é mais indicada para solar?",
          acceptedAnswer: { "@type": "Answer", text: "Hoje, LFP (fosfato de ferro-lítio) é muito comum por segurança e vida útil. O ideal é comparar garantia, ciclos, compatibilidade com inversor e suporte no Brasil." },
        },
        {
          "@type": "Question",
          name: "Posso colocar bateria depois?",
          acceptedAnswer: { "@type": "Answer", text: "Em muitos casos, sim. Mas o ideal é planejar desde o início para escolher inversor compatível, espaço, proteções e infraestrutura elétrica." },
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
          <span className="truncate">Baterias</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <header className="space-y-4">
              <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Baterias · Armazenamento · Híbrido · RJ e Região
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
                  <li>Baterias não são “obrigatórias” — elas resolvem problemas específicos: <strong>backup</strong>, <strong>autonomia</strong> e <strong>gestão de consumo</strong>.</li>
                  <li>O risco é comprar pela emoção: calcule <strong>kWh armazenável</strong>, ciclos, garantia e o que você quer manter ligado.</li>
                  <li>No RJ, baterias fazem mais sentido para quem sofre com quedas, precisa de continuidade (comércio/home office) ou quer um híbrido bem planejado.</li>
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
                Antes de tudo: bateria não é “upgrade obrigatório”. Ela resolve <strong>problemas específicos</strong>. Em 2026, as baterias ficaram mais acessíveis e mais comuns,
                mas ainda é fácil errar a compra se você não definir o objetivo.
              </p>
              <ul>
                <li><strong>Quero backup</strong>: manter itens essenciais quando falta luz (geladeira, iluminação, internet, portão).</li>
                <li><strong>Quero autonomia</strong>: mais horas/dias sem rede (casas específicas, sítios, operação crítica).</li>
                <li><strong>Quero gestão de consumo</strong>: usar energia armazenada em horários estratégicos (depende do seu caso).</li>
              </ul>

              <h2 id={slugifyId(toc[2])}>{toc[2]}</h2>
              <p>
                O tipo mais comum hoje é lítio, com grande presença de <strong>LFP (fosfato de ferro-lítio)</strong> por segurança e durabilidade.
                O que você deve olhar não é “marca da moda”, e sim:
              </p>
              <ul>
                <li><strong>Capacidade útil (kWh)</strong>: o que realmente dá para usar (não só o número “nominal”).</li>
                <li><strong>Potência (kW)</strong>: o que ela aguenta entregar instantaneamente (importa para ar-condicionado, motores, bombas).</li>
                <li><strong>Ciclos e garantia</strong>: vida útil real, por escrito.</li>
                <li><strong>Compatibilidade</strong> com o inversor (híbrido) e suporte no Brasil.</li>
              </ul>

              <h2 id={slugifyId(toc[3])}>{toc[3]}</h2>
              <p>
                Aqui está o “pulo do gato” para não se enganar: pense em <strong>kWh</strong>.
                Some o consumo dos equipamentos que você quer manter e estime por quantas horas.
              </p>
              <div className="not-prose rounded-2xl border border-border bg-background p-5">
                <div className="text-sm font-semibold">Exemplo simples de cálculo</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Se você quer manter 300 W (internet + iluminação + TV) por 8 horas, isso dá 0,3 kW × 8 h = <strong>2,4 kWh</strong>.
                  Adicione folga (perdas + picos). Resultado: algo como 3–4 kWh úteis já muda seu cenário.
                </div>
              </div>
              <p>
                O erro clássico é comprar “muita capacidade” sem precisar, ou comprar pouca potência e ficar frustrado porque não segura os equipamentos desejados.
              </p>

              <h2 id={slugifyId(toc[4])}>{toc[4]}</h2>
              <p>
                No RJ, baterias fazem sentido principalmente em três cenários:
              </p>
              <ul>
                <li><strong>Quedas de energia</strong> (bairros com instabilidade) e necessidade de internet/segurança.</li>
                <li><strong>Comércio/empresa</strong> que não pode parar (PDV, câmeras, freezer, roteador).</li>
                <li><strong>Home office</strong> onde 1 hora parado vira prejuízo.</li>
              </ul>

              <h2 id={slugifyId(toc[5])}>{toc[5]}</h2>
              <p>
                Para bateria, o projeto muda. Você precisa falar de <strong>inversor híbrido</strong>, estratégia de backup (quais circuitos),
                e automação (prioridades). O ideal é já separar um “quadro essencial” para o backup.
              </p>

              <h2 id={slugifyId(toc[6])}>{toc[6]}</h2>
              <p>
                Bateria é energia concentrada. Segurança não é opcional: proteções, ventilação, instalação correta e garantia clara.
                Evite “gambiarra” e peça escopo elétrico explícito.
              </p>

              <h2 id={slugifyId(toc[7])}>{toc[7]}</h2>
              <div className="not-prose rounded-2xl border border-border bg-muted/30 p-6">
                <div className="text-sm font-semibold">Checklist agressivo (anti-compra errada)</div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li>Objetivo definido: backup, autonomia ou gestão de consumo.</li>
                  <li>Capacidade útil (kWh) e potência (kW) declaradas por escrito.</li>
                  <li>Ciclos/garantia e política de suporte/troca no Brasil.</li>
                  <li>Inversor híbrido compatível + proteção no quadro (DPS, disjuntor, aterramento).</li>
                  <li>Plano de “circuitos essenciais” para backup (o que fica ligado quando falta luz).</li>
                  <li>Instalação com local adequado (ventilação/temperatura) e documentação técnica.</li>
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
                <summary>Bateria reduz minha conta de luz?</summary>
                <p>Pode reduzir em cenários específicos, mas o principal benefício costuma ser autonomia/backup. A economia depende da tarifa, do perfil de consumo e de como o sistema é configurado.</p>
              </details>
              <details>
                <summary>Qual bateria é mais indicada para solar?</summary>
                <p>Hoje, LFP (fosfato de ferro-lítio) é muito comum por segurança e vida útil. O ideal é comparar garantia, ciclos, compatibilidade com inversor e suporte no Brasil.</p>
              </details>
              <details>
                <summary>Posso colocar bateria depois?</summary>
                <p>Em muitos casos, sim. Mas o ideal é planejar desde o início para escolher inversor compatível, espaço, proteções e infraestrutura elétrica.</p>
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
