// client/src/pages/blog/posts/_PostTemplate.tsx
"use client";

import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import ShareBar from "@/components/share/ShareBar";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://www.iluminasun.com.br";

// ✅ Troque APENAS estes 3 itens ao criar um post novo
const POST_SLUG = "SEU-SLUG-AQUI";
const POST_TITLE = "TÍTULO DO POST";
const POST_DESCRIPTION = "DESCRIÇÃO DO POST (SEO).";

const POST_PATH = `/blog/${POST_SLUG}`;
const CANONICAL = `${SITE_URL}${POST_PATH}`;
const OG_IMAGE = `${SITE_URL}/blog/SEU-OG.webp`;

const DATE_PUBLISHED = "2025-01-01";
const DATE_MODIFIED = "2025-01-01";
const READING_TIME = "10–14 min de leitura";

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

  useEffect(() => {
    document.title = pageTitle;

    upsertLink("canonical", CANONICAL);
    upsertMetaBy("name", "description", POST_DESCRIPTION);

    upsertMetaBy("property", "og:type", "article");
    upsertMetaBy("property", "og:title", pageTitle);
    upsertMetaBy("property", "og:description", POST_DESCRIPTION);
    upsertMetaBy("property", "og:url", CANONICAL);
    upsertMetaBy("property", "og:image", OG_IMAGE);
  }, [pageTitle]);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-16 md:px-6 lg:px-0">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog">
            <a className="hover:text-primary">Blog</a>
          </Link>
          <span>•</span>
          <span className="truncate">Categoria</span>
        </div>

        <article className="space-y-8">
          <header className="space-y-4">
            <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Categoria
            </div>

            <h1 className="text-3xl font-bold leading-tight md:text-4xl">
              {POST_TITLE}
            </h1>

            <p className="text-base text-muted-foreground md:text-lg">
              {POST_DESCRIPTION}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span>Equipe Ilumina Sun</span>
              <span>•</span>
              <span>{DATE_MODIFIED}</span>
              <span>•</span>
              <span>{READING_TIME}</span>
            </div>

            {/* ✅ Compartilhamento padrão (SÓ ÍCONES) */}
            <div className="pt-2">
            <ShareBar
              title="..."
              url={CANONICAL}
              slug="..."
              contentType="blog"
              compact
              heading=""
            />
            </div>
          </header>

          <section className="prose prose-slate max-w-none dark:prose-invert">
            <h2>Seção</h2>
            <p>Conteúdo…</p>
          </section>

          {/* Opcional: se quiser repetir no final do post */}
          {/* 
          <div className="pt-6">
            <ShareBar title={POST_TITLE} url={CANONICAL} slug={POST_SLUG} contentType="blog" compact heading="" />
          </div>
          */}
        </article>
      </div>
    </main>
  );
}
