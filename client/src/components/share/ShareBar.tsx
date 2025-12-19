"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

export type ShareBarVariant = "inline" | "block";

export type ShareBarProps = {
  title: string;

  /** Pode ser absoluto ou relativo. Se não passar, usa window.location.href */
  url?: string;

  /** Opcional (para tracking) */
  slug?: string;

  /** Opcional (para tracking) */
  contentType?: "blog" | "page" | "kit";

  className?: string;
  compact?: boolean;

  // ✅ Props extras (para compatibilidade com o que você tentou usar)
  heading?: string;
  description?: string;
  variant?: ShareBarVariant;
  analyticsTag?: string;
};

type SharePlatform =
  | "whatsapp"
  | "facebook"
  | "x"
  | "linkedin"
  | "telegram"
  | "email"
  | "copy"
  | "native";

function pushDataLayer(event: Record<string, any>) {
  if (typeof window === "undefined") return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push(event);
}

function toAbsoluteUrl(input?: string) {
  if (!input) {
    if (typeof window !== "undefined") return window.location.href;
    return "";
  }
  if (/^https?:\/\//i.test(input)) return input;
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}${input.startsWith("/") ? input : `/${input}`}`;
}

function buildShareUrl(platform: SharePlatform, title: string, url: string) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  switch (platform) {
    case "whatsapp":
      return `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${u}`;
    case "x":
      return `https://twitter.com/intent/tweet?text=${t}&url=${u}`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
    case "telegram":
      return `https://t.me/share/url?url=${u}&text=${t}`;
    case "email":
      return `mailto:?subject=${t}&body=${encodeURIComponent(`${title}\n\n${url}`)}`;
    default:
      return url;
  }
}

function IconWhatsApp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.52 3.48A11.78 11.78 0 0 0 12.06 0C5.47 0 .12 5.35.12 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.27-1.64a11.9 11.9 0 0 0 5.79 1.48h.01c6.59 0 11.94-5.35 11.94-11.94 0-3.19-1.24-6.18-3.49-8.42ZM12.06 21.8h-.01a9.9 9.9 0 0 1-5.05-1.39l-.36-.21-3.72.97.99-3.62-.23-.37a9.88 9.88 0 0 1-1.51-5.24C2.17 6.46 6.58 2.05 12.06 2.05c2.1 0 4.07.82 5.55 2.3a7.82 7.82 0 0 1 2.3 5.55c0 5.48-4.41 9.9-9.85 9.9Zm5.74-7.41c-.31-.16-1.85-.91-2.14-1.02-.29-.1-.5-.16-.71.16-.21.31-.82 1.02-1 1.23-.18.21-.37.23-.68.08-.31-.16-1.31-.48-2.49-1.52-.92-.82-1.55-1.83-1.73-2.14-.18-.31-.02-.48.14-.63.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.98-2.34-.26-.62-.52-.53-.71-.54h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63 0 1.55 1.13 3.04 1.29 3.25.16.21 2.22 3.39 5.38 4.76.75.32 1.34.51 1.8.65.76.24 1.45.21 2 .13.61-.09 1.85-.76 2.11-1.5.26-.73.26-1.36.18-1.5-.08-.13-.29-.21-.6-.37Z" />
    </svg>
  );
}

function IconFacebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12a10 10 0 1 0-11.56 9.87v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.25.2 2.25.2v2.48h-1.27c-1.25 0-1.64.78-1.64 1.57V12h2.79l-.45 2.88h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function IconX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.9 2H22l-6.77 7.73L23 22h-6.8l-5.32-6.94L4.8 22H2l7.26-8.3L1 2h6.98l4.82 6.27L18.9 2Zm-1.19 18h1.71L7.05 3.9H5.22L17.71 20Z" />
    </svg>
  );
}

function IconLinkedIn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.95v5.66H9.28V9h3.42v1.56h.05c.48-.9 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.5v6.24ZM5.26 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.04 20.45H3.47V9h3.57v11.45ZM22 2H2v20h20V2Z" />
    </svg>
  );
}

function IconTelegram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M9.04 15.57 8.83 19c.31 0 .44-.13.6-.28l1.44-1.38 2.98 2.18c.55.3.94.15 1.08-.5l1.96-9.18c.2-.8-.29-1.12-.82-.93L4.55 12.3c-.78.31-.77.75-.14.94l3.02.94 6.99-4.41c.33-.2.64-.09.39.13Z" />
    </svg>
  );
}

function IconLink(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M10.5 13.5 13.5 10.5M9 15a4 4 0 0 1 0-6l1.5-1.5a4 4 0 0 1 6 6L15 15a4 4 0 0 1-6 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ShareBar({
  title,
  url,
  slug,
  contentType = "blog",
  className,
  compact = false,
  heading,
  description,
  variant = "inline",
  analyticsTag,
}: ShareBarProps) {
  const absUrl = useMemo(() => toAbsoluteUrl(url), [url]);
  const [copying, setCopying] = useState(false);

  const track = (platform: SharePlatform) => {
    pushDataLayer({
      event: "share_click",
      share_platform: platform,
      share_url: absUrl,
      content_type: contentType,
      content_slug: slug,
      content_title: title,
      analytics_tag: analyticsTag,
    });
  };

  const openShare = (platform: SharePlatform) => {
    const shareUrl = buildShareUrl(platform, title, absUrl);
    track(platform);
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const nativeShare = async () => {
    try {
      if (!navigator.share) return;
      track("native");
      await navigator.share({ title, text: title, url: absUrl });
    } catch {
      // ok
    }
  };

  const copyLink = async () => {
    try {
      setCopying(true);
      track("copy");
      await navigator.clipboard.writeText(absUrl);
      toast.success("Link copiado");
    } catch {
      toast.error("Não foi possível copiar o link");
    } finally {
      setCopying(false);
    }
  };

  const btnBase =
    "inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm font-semibold hover:bg-muted/60 transition";
  const iconClass = "h-4 w-4";

  return (
    <div className={className}>
      {(heading || description) && (
        <div className={variant === "block" ? "mb-3" : "mb-2"}>
          {heading && <div className="text-sm font-semibold">{heading}</div>}
          {description && <div className="text-xs text-muted-foreground">{description}</div>}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {!compact && !heading && (
          <div className="mr-1 text-sm font-semibold text-foreground">Compartilhar:</div>
        )}

        <button type="button" className={btnBase} onClick={() => openShare("whatsapp")} aria-label="Compartilhar no WhatsApp">
          <IconWhatsApp className={iconClass} />
          {!compact && "WhatsApp"}
        </button>

        <button type="button" className={btnBase} onClick={() => openShare("facebook")} aria-label="Compartilhar no Facebook">
          <IconFacebook className={iconClass} />
          {!compact && "Facebook"}
        </button>

        <button type="button" className={btnBase} onClick={() => openShare("x")} aria-label="Compartilhar no X">
          <IconX className={iconClass} />
          {!compact && "X"}
        </button>

        <button type="button" className={btnBase} onClick={() => openShare("linkedin")} aria-label="Compartilhar no LinkedIn">
          <IconLinkedIn className={iconClass} />
          {!compact && "LinkedIn"}
        </button>

        {!compact && (
          <button type="button" className={btnBase} onClick={() => openShare("telegram")} aria-label="Compartilhar no Telegram">
            <IconTelegram className={iconClass} />
            Telegram
          </button>
        )}

        <button type="button" className={btnBase} onClick={() => openShare("email")} aria-label="Compartilhar por e-mail" title="Compartilhar por e-mail">
          ✉️ {!compact && "E-mail"}
        </button>

        <button type="button" className={btnBase} onClick={copyLink} aria-label="Copiar link" title="Copiar link" disabled={copying}>
          <IconLink className={iconClass} />
          {!compact && (copying ? "Copiando..." : "Copiar")}
        </button>

        {typeof navigator !== "undefined" && "share" in navigator && (
          <button type="button" className={btnBase} onClick={nativeShare} aria-label="Compartilhar (nativo)">
            <span className="text-base leading-none">⤴︎</span>
            {!compact && "Nativo"}
          </button>
        )}
      </div>
    </div>
  );
}
