// client/src/components/share/ShareBar.tsx
"use client";

import React, { useMemo, useState } from "react";

export type ShareBarProps = {
  title: string;
  url: string;

  slug?: string;
  contentType?: "blog" | "page" | string;

  /**
   * Mantido por compatibilidade, mas agora o componente é "ícones-only" por padrão.
   * Se um dia você quiser texto de volta, me chama que eu reativo com uma flag.
   */
  compact?: boolean;

  variant?: string;
  analyticsTag?: string;

  /** Use "" para não mostrar nada */
  heading?: string;

  className?: string;
  description?: string;
};

type ShareTarget =
  | "whatsapp"
  | "facebook"
  | "x"
  | "linkedin"
  | "telegram"
  | "email";

function safeWindowOpen(url: string) {
  if (typeof window === "undefined") return;
  window.open(url, "_blank", "noopener,noreferrer");
}

function encode(s: string) {
  return encodeURIComponent(s);
}

export default function ShareBar({
  title,
  url,
  slug,
  contentType = "blog",
  // compact fica irrelevante visualmente (sempre ícones), mas mantemos para não quebrar chamadas
  compact: _compactProp,
  variant: _variant,
  analyticsTag,
  // ✅ por padrão NÃO mostra "Compartilhar:"
  heading = "",
  className = "",
}: ShareBarProps) {
  // ✅ ID p/ analytics: prefere analyticsTag, depois slug, senão url
  const itemId = analyticsTag ?? slug ?? url;

  const [copying, setCopying] = useState(false);
  const [copied, setCopied] = useState(false);

  const encodedUrl = useMemo(() => encode(url), [url]);
  const encodedTitle = useMemo(() => encode(title), [title]);

  function track(eventName: string, extra?: Record<string, any>) {
    try {
      // @ts-ignore
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        // @ts-ignore
        window.gtag("event", eventName, {
        content_type: contentType,
        item_id: itemId,
        ...(extra ?? {}),
      });
      }
    } catch {
      // noop
    }
  }

  function openShare(target: ShareTarget) {
    track("share_click", { method: target });

    switch (target) {
      case "whatsapp":
        safeWindowOpen(`https://wa.me/?text=${encodedTitle}%0A${encodedUrl}`);
        return;
      case "facebook":
        safeWindowOpen(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        );
        return;
      case "x":
        safeWindowOpen(
          `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
        );
        return;
      case "linkedin":
        safeWindowOpen(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        );
        return;
      case "telegram":
        safeWindowOpen(
          `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
        );
        return;
      case "email":
        safeWindowOpen(
          `mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A%0A${encodedUrl}`
        );
        return;
    }
  }

  async function copyLink() {
    if (typeof window === "undefined") return;
    if (copying) return;

    setCopying(true);
    setCopied(false);

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      track("share_copy");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // noop
    } finally {
      setCopying(false);
    }
  }

  async function nativeShare() {
    if (typeof window === "undefined") return;

    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        // @ts-ignore
        await navigator.share({ title, text: title, url });
        track("share_native");
        return;
      } catch {
        return;
      }
    }

    await copyLink();
  }

  // ✅ Estilo “ícone-only” sempre
  const btnIcon =
    "inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-800 shadow-sm hover:bg-slate-50 active:scale-[0.99] transition";
  const iconClass = "h-5 w-5";

  // ✅ Acessibilidade sem texto visível
  const SrOnly = ({ children }: { children: React.ReactNode }) => (
    <span className="sr-only">{children}</span>
  );

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-wrap items-center gap-2">
        {heading ? (
          <div className="mr-1 text-sm font-semibold text-slate-700">
            {heading}
          </div>
        ) : null}

        <button
          type="button"
          className={btnIcon}
          onClick={() => openShare("whatsapp")}
          aria-label="Compartilhar no WhatsApp"
          title="WhatsApp"
        >
          <IconWhatsApp className={iconClass} />
          <SrOnly>WhatsApp</SrOnly>
        </button>

        <button
          type="button"
          className={btnIcon}
          onClick={() => openShare("facebook")}
          aria-label="Compartilhar no Facebook"
          title="Facebook"
        >
          <IconFacebook className={iconClass} />
          <SrOnly>Facebook</SrOnly>
        </button>

        <button
          type="button"
          className={btnIcon}
          onClick={() => openShare("x")}
          aria-label="Compartilhar no X"
          title="X"
        >
          <IconX className={iconClass} />
          <SrOnly>X</SrOnly>
        </button>

        <button
          type="button"
          className={btnIcon}
          onClick={() => openShare("linkedin")}
          aria-label="Compartilhar no LinkedIn"
          title="LinkedIn"
        >
          <IconLinkedIn className={iconClass} />
          <SrOnly>LinkedIn</SrOnly>
        </button>

        <button
          type="button"
          className={btnIcon}
          onClick={() => openShare("telegram")}
          aria-label="Compartilhar no Telegram"
          title="Telegram"
        >
          <IconTelegram className={iconClass} />
          <SrOnly>Telegram</SrOnly>
        </button>

        <button
          type="button"
          className={btnIcon}
          onClick={() => openShare("email")}
          aria-label="Compartilhar por e-mail"
          title="E-mail"
        >
          <IconMail className={iconClass} />
          <SrOnly>E-mail</SrOnly>
        </button>

        <button
          type="button"
          className={btnIcon}
          onClick={copyLink}
          aria-label="Copiar link"
          title={copied ? "Copiado!" : "Copiar"}
          disabled={copying}
        >
          <IconLink className={iconClass} />
          <SrOnly>Copiar</SrOnly>
        </button>

        {typeof navigator !== "undefined" && "share" in navigator && (
          <button
            type="button"
            className={btnIcon}
            onClick={nativeShare}
            aria-label="Compartilhar (nativo)"
            title="Nativo"
          >
            <IconShare className={iconClass} />
            <SrOnly>Nativo</SrOnly>
          </button>
        )}
      </div>
    </div>
  );
}

/* -------------------- ÍCONES (SVG) -------------------- */

function IconWhatsApp({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.11 17.45c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.12 2.81.14.18 1.93 2.95 4.68 4.13.65.28 1.15.45 1.54.57.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.27.23-.62.23-1.15.16-1.27-.07-.12-.25-.2-.52-.34z" />
      <path d="M16.02 2.67C8.88 2.67 3.08 8.46 3.08 15.6c0 2.26.59 4.38 1.63 6.22L3 29.33l7.7-1.66c1.78.97 3.82 1.52 5.98 1.52 7.14 0 12.93-5.79 12.93-12.93S23.16 2.67 16.02 2.67zm0 23.11c-2.01 0-3.88-.59-5.45-1.6l-.39-.24-4.57.98.97-4.46-.25-.4a9.58 9.58 0 0 1-1.47-5.16c0-5.31 4.32-9.63 9.63-9.63s9.63 4.32 9.63 9.63-4.32 9.63-9.63 9.63z" />
    </svg>
  );
}

function IconFacebook({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.87v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.23 0-1.62.77-1.62 1.55V12h2.76l-.44 2.88h-2.32v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function IconX({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-6.76 7.73L23 22h-6.8l-5.32-6.86L4.9 22H2l7.27-8.3L1 2h7l4.8 6.2L18.9 2zm-1.2 18h1.88L7.1 3.9H5.08L17.7 20z" />
    </svg>
  );
}

function IconLinkedIn({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.56c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.66H9.31V9h3.41v1.56h.05c.48-.9 1.65-1.86 3.4-1.86 3.63 0 4.29 2.39 4.29 5.49v6.26zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z" />
    </svg>
  );
}

function IconTelegram({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M9.04 15.56 8.8 19.1c.35 0 .5-.15.68-.33l1.63-1.56 3.38 2.48c.62.34 1.06.16 1.22-.57l2.22-10.4c.2-.93-.33-1.3-.93-1.08L4.26 10.9c-.9.35-.89.85-.16 1.08l3.47 1.08 8.05-5.08c.38-.23.72-.1.44.13L9.04 15.56z" />
    </svg>
  );
}

function IconMail({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function IconLink({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M3.9 12a5 5 0 0 1 5-5h4v2h-4a3 3 0 1 0 0 6h4v2h-4a5 5 0 0 1-5-5zm7.1 1h2v-2h-2v2zm4.1-6h4a5 5 0 1 1 0 10h-4v-2h4a3 3 0 1 0 0-6h-4V7z" />
    </svg>
  );
}

function IconShare({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18 16a3 3 0 0 0-2.39 1.2l-6.2-3.1a3.04 3.04 0 0 0 0-2.2l6.2-3.1A3 3 0 1 0 15 6a2.98 2.98 0 0 0 .12.8l-6.2 3.1a3 3 0 1 0 0 4.2l6.2 3.1A3 3 0 1 0 18 16z" />
    </svg>
  );
}
