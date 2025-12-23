import { useEffect } from "react";

export type SEOProps = {
  title: string;
  description: string;

  /** Keywords (separadas por vírgula). Opcional. */
  keywords?: string;

  /** URL canônica (ex.: https://iluminasun.com.br/cidades/niteroi) */
  canonical?: string;
  /** URL absoluta para Open Graph (se não vier, usa canonical) */
  url?: string;
  /** Imagem OG (URL absoluta ou caminho público) */
  ogImage?: string;
  /** og:type */
  ogType?: "website" | "article";
};

function ensureAbsoluteUrl(value?: string) {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  // Se vier "/og-default.webp", tenta transformar em absoluta no domínio atual
  if (typeof window !== "undefined" && value.startsWith("/")) {
    return `${window.location.origin}${value}`;
  }
  return value;
}

function updateMetaTag(propertyOrName: string, content: string, isProperty = true) {
  if (!content) return;

  const selector = isProperty
    ? `meta[property="${propertyOrName}"]`
    : `meta[name="${propertyOrName}"]`;

  let tag = document.head.querySelector<HTMLMetaElement>(selector);

  if (!tag) {
    tag = document.createElement("meta");
    if (isProperty) tag.setAttribute("property", propertyOrName);
    else tag.setAttribute("name", propertyOrName);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function setCanonical(href: string) {
  if (!href) return;

  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  url,
  ogImage,
  ogType = "website",
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const canon = ensureAbsoluteUrl(canonical);
    const pageUrl = ensureAbsoluteUrl(url || canonical);

    if (canon) setCanonical(canon);

    // Basic
    updateMetaTag("description", description, false);

    // ✅ Keywords (opcional)
    if (keywords) updateMetaTag("keywords", keywords, false);

    // Open Graph
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:type", ogType, true);

    if (pageUrl) updateMetaTag("og:url", pageUrl, true);

    const ogImg = ensureAbsoluteUrl(ogImage);
    if (ogImg) updateMetaTag("og:image", ogImg, true);

    // Twitter
    updateMetaTag("twitter:card", "summary_large_image", false);
    updateMetaTag("twitter:title", title, false);
    updateMetaTag("twitter:description", description, false);
    if (ogImg) updateMetaTag("twitter:image", ogImg, false);
  }, [title, description, keywords, canonical, url, ogImage, ogType]);

  return null;
}
