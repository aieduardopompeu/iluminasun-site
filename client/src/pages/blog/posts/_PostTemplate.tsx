// client/src/pages/blog/posts/_PostTemplate.tsx
"use client";

import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";
import AdSenseAd from "@/components/ads/AdSenseAd";
import { ADSENSE_CLIENT, ADSENSE_SLOTS } from "@/config/adsense";
import { Button } from "@/components/ui/button";
import { MessageSquareText, PencilLine, Star } from "lucide-react";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://iluminasun.com.br";

// ✅ Troque APENAS estes itens ao criar um post novo
const POST_SLUG = "SEU-SLUG-AQUI";
const CATEGORY_LABEL = "Categoria"; // ex.: "Regulamentação", "Financiamento", "Manutenção", "Mercado"
const POST_TITLE = "TÍTULO DO POST";
const POST_DESCRIPTION = "DESCRIÇÃO DO POST (SEO).";

const HERO_IMAGE = "/blog/ARQUIVO.webp";
const HERO_ALT = "Descrição curta da imagem";
const HERO_CAPTION = ""; // opcional

const DATE_PUBLISHED = "2025-01-01";
const DATE_MODIFIED = "2025-01-01";
const READING_TIME = "7–10 min";

const POST_PATH = `/blog/${POST_SLUG}`;
const CANONICAL = `${SITE_URL}${POST_PATH}`;

// Se você quiser, pode usar a mesma imagem do HERO como OG
const OG_IMAGE = `${SITE_URL}${HERO_IMAGE}`;

function buildSugestoesHref(params: Record<string, string>) {
  const qs = new URLSearchParams({
    utm_source: "blog",
    utm_medium: "cta",
    utm_campaign: "sugestoes_avaliacao",
    ...params,
  });
  return `/sugestoes?${qs.toString()}`;
}

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

export default function PostTemplate() {
  const pageTitle = `${POST_TITLE} | Ilumina Sun`;
  const sugestoesHref = buildSugestoesHref({
    tipo: "pagina",
    url: CANONICAL,
    titulo: POST_TITLE,
  });
  const temaHref = buildSugestoesHref({
    tipo: "artigo",
    url: CANONICAL,
    titulo: POST_TITLE,
  });
  const correcaoHref = buildSugestoesHref({
    tipo: "correcao",
    url: CANONICAL,
    titulo: POST_TITLE,
  });
  const avaliacaoHref = buildSugestoesHref({
    tipo: "experiencia",
    url: CANONICAL,
    titulo: POST_TITLE,
  });

  useEffect(() => {
    document.title = pageTitle;

    upsertLink("canonical", CANONICAL);
    upsertMetaBy("name", "description", POST_DESCRIPTION);

    upsertMetaBy("property", "og:type", "article");
    upsertMetaBy("property", "og:title", pageTitle);
    upsertMetaBy("property", "og:description", POST_DESCRIPTION);
    upsertMetaBy("property", "og:url", CANONICAL);
    upsertMetaBy("property", "og:image", OG_IMAGE);

    upsertMetaBy("name", "twitter:card", "summary_large_image");
    upsertMetaBy("name", "twitter:title", pageTitle);
    upsertMetaBy("name", "twitter:description", POST_DESCRIPTION);
    upsertMetaBy("name", "twitter:image", OG_IMAGE);
  }, [pageTitle]);

  const breadcrumbJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 2, name: CATEGORY_LABEL, item: CANONICAL },
      ],
    }),
    []
  );

  const articleJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: pageTitle,
      description: POST_DESCRIPTION,
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
    [pageTitle]
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
          <span className="truncate">{CATEGORY_LABEL}</span>
        </div>

        <article className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Coluna principal */}
          <div className="space-y-8">
            <header className="space-y-4">
              <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {CATEGORY_LABEL}
              </div>

              <h1 className="text-3xl font-bold leading-tight md:text-4xl">{POST_TITLE}</h1>

              <p className="text-base text-muted-foreground md:text-lg">{POST_DESCRIPTION}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span>Equipe Ilumina Sun</span>
                <span>•</span>
                <span>{DATE_MODIFIED}</span>
                <span>•</span>
                <span>{READING_TIME}</span>
              </div>

              {/* Compartilhar + AdSense Topo */}
              <div className="pt-2">
                <ShareBar title={POST_TITLE} url={CANONICAL} slug={POST_SLUG} contentType="blog" compact heading="" />
              </div>

              {/* CTA editorial (rápido e contextual) */}
              <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <MessageSquareText className="h-4 w-4 text-primary" />
                  Melhorar este artigo
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href={correcaoHref}>
                    <Button size="sm" className="font-semibold">
                      <PencilLine className="mr-2 h-4 w-4" />
                      Sugerir correção
                    </Button>
                  </Link>
                  <Link href={avaliacaoHref}>
                    <Button size="sm" variant="outline" className="font-semibold">
                      <Star className="mr-2 h-4 w-4" />
                      Avaliar artigo
                    </Button>
                  </Link>
                  <Link href={temaHref}>
                    <Button size="sm" variant="ghost" className="font-semibold">
                      Sugerir tema
                    </Button>
                  </Link>
                </div>
              </div>

              {/* CTA editorial (não genérico): dentro do artigo */}
              <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MessageSquareText className="h-4 w-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-sm font-semibold">Sugestões & Avaliação</div>
                    <p className="text-xs text-muted-foreground">
                      Achou algo desatualizado ou faltando? Ajude a melhorar este artigo.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link href={correcaoHref}>
                    <Button size="sm" className="font-semibold">
                      <PencilLine className="mr-2 h-4 w-4" />
                      Corrigir este artigo
                    </Button>
                  </Link>
                  <Link href={avaliacaoHref}>
                    <Button size="sm" variant="outline" className="font-semibold">
                      <Star className="mr-2 h-4 w-4" />
                      Avaliar
                    </Button>
                  </Link>
                </div>
              </div>

              <AdSenseAd
                client={ADSENSE_CLIENT}
                slot={ADSENSE_SLOTS.BLOG_TOP}
                format="fluid"
                refreshKey={POST_SLUG}
                adTest={import.meta.env.DEV}
                className="my-8"
                style={{ textAlign: "center" }}
              />

              {/* Hero image */}
              <figure className="overflow-hidden rounded-2xl border border-border bg-muted/30">
                <img src={HERO_IMAGE} alt={HERO_ALT} className="h-auto w-full object-cover" loading="lazy" />
                {HERO_CAPTION ? (
                  <figcaption className="px-4 py-3 text-xs text-muted-foreground">{HERO_CAPTION}</figcaption>
                ) : null}
              </figure>
            </header>

            <section className="prose prose-slate max-w-none dark:prose-invert">
              <h2>Seção</h2>
              <p>Conteúdo…</p>
            </section>

            {/* CTA final (conversão alta, sem poluir) */}
            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-sm font-semibold">Encontrou algo desatualizado?</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Em 30 segundos você consegue sugerir correção, tema ou melhorias. Isso cai direto no canal editorial.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={correcaoHref}>
                  <Button className="font-semibold">
                    <PencilLine className="mr-2 h-4 w-4" />
                    Sugerir correção
                  </Button>
                </Link>
                <Link href={avaliacaoHref}>
                  <Button variant="outline" className="font-semibold">
                    <Star className="mr-2 h-4 w-4" />
                    Avaliar artigo
                  </Button>
                </Link>
                <Link href={temaHref}>
                  <Button variant="ghost" className="font-semibold">
                    Sugestão de tema
                  </Button>
                </Link>
              </div>
            </div>

            {/* CTA final (reforço) */}
            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-semibold">Encontrou algo para melhorar?</div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Você pode sugerir um tema novo, apontar correções e avaliar a utilidade do post.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href={correcaoHref}>
                    <Button size="sm" variant="outline" className="font-semibold">
                      Sugerir correção
                    </Button>
                  </Link>
                  <Link
                    href={buildSugestoesHref({
                      tipo: "artigo",
                      url: CANONICAL,
                      titulo: POST_TITLE,
                    })}
                  >
                    <Button size="sm" variant="outline" className="font-semibold">
                      Sugerir tema
                    </Button>
                  </Link>
                  <Link href={avaliacaoHref}>
                    <Button size="sm" className="font-semibold">
                      Avaliar artigo
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* AdSense Rodapé */}
            <AdSenseAd
              client={ADSENSE_CLIENT}
              slot={ADSENSE_SLOTS.BLOG_BOTTOM}
              format="auto"
              fullWidthResponsive
              refreshKey={POST_SLUG}
              adTest={import.meta.env.DEV}
              className="my-10"
            />
          </div>

          {/* Sidebar (opcional) */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-muted/30 p-5">
              <div className="text-sm font-semibold">Relacionados</div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/blog">
                    <a className="hover:text-primary">Ver todos os posts →</a>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </article>
      </div>
    </main>
  );
}
