"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Copy,
  Check,
  Share2,
  MessageCircle,
  Linkedin,
  Mail,
  Send,
} from "lucide-react";

/**
 * ShareBar — Componente padrão para compartilhamento no site.
 * - WhatsApp, LinkedIn, Telegram, E-mail
 * - Copiar link
 * - Web Share API (mobile)
 * - Pode ser usado em qualquer página, post ou kit
 */

type ShareBarProps = {
  /** Título usado no texto compartilhado */
  title: string;
  /** Descrição opcional para compor o texto (especialmente no WhatsApp/Telegram/email) */
  description?: string;
  /** URL completa. Se não passar, o componente usa window.location.href (no client). */
  url?: string;
  /** Variante visual */
  variant?: "inline" | "card";
  /** Texto acima dos botões */
  heading?: string;
  /** Identificador para analytics (GA4 via dataLayer), opcional */
  analyticsTag?: string;
  className?: string;
};

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

function pushDataLayer(event: Record<string, any>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

function safeEncode(s: string) {
  return encodeURIComponent(s ?? "");
}

export default function ShareBar({
  title,
  description,
  url,
  variant = "inline",
  heading = "Compartilhar",
  analyticsTag = "share_bar",
  className,
}: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(url || "");
  const [canWebShare, setCanWebShare] = useState(false);

  useEffect(() => {
    if (!url && typeof window !== "undefined") setCurrentUrl(window.location.href);
  }, [url]);

  useEffect(() => {
    if (typeof navigator !== "undefined" && typeof (navigator as any).share === "function") {
      setCanWebShare(true);
    }
  }, []);

  const shareText = useMemo(() => {
    const parts = [title];
    if (description) parts.push(description);
    parts.push(currentUrl);
    return parts.filter(Boolean).join("\n\n");
  }, [title, description, currentUrl]);

  const links = useMemo(() => {
    const u = safeEncode(currentUrl);
    const t = safeEncode(title);
    const d = safeEncode(description || "");

    return {
      whatsapp: `https://wa.me/?text=${safeEncode(shareText)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      telegram: `https://t.me/share/url?url=${u}&text=${safeEncode([title, description].filter(Boolean).join(" — "))}`,
      email: `mailto:?subject=${t}&body=${safeEncode([title, description, currentUrl].filter(Boolean).join("\n\n"))}`,
    };
  }, [currentUrl, title, description, shareText]);

  function track(action: string) {
    pushDataLayer({
      event: "share_click",
      share_component: analyticsTag,
      share_action: action,
      share_title: title,
      share_url: currentUrl,
    });
  }

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      track("copy_link");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback simples
      const ta = document.createElement("textarea");
      ta.value = currentUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      track("copy_link_fallback");
      setTimeout(() => setCopied(false), 1500);
    }
  }

  async function onWebShare() {
    try {
      track("web_share");
      await (navigator as any).share({
        title,
        text: description || title,
        url: currentUrl,
      });
    } catch {
      // usuário cancelou ou não suportado
    }
  }

  const wrapClass =
    variant === "card"
      ? "rounded-2xl border border-border bg-background p-4"
      : "";

  return (
    <div className={[wrapClass, className].filter(Boolean).join(" ")}>
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold">{heading}</div>

        {canWebShare ? (
          <Button variant="outline" size="sm" onClick={onWebShare} className="gap-2">
            <Share2 className="h-4 w-4" />
            Compartilhar
          </Button>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp")}
            >
              <Button size="sm" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Button>
            </a>
          </TooltipTrigger>
          <TooltipContent>Compartilhar no WhatsApp</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("linkedin")}
            >
              <Button variant="outline" size="sm" className="gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>
            </a>
          </TooltipTrigger>
          <TooltipContent>Compartilhar no LinkedIn</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("telegram")}
            >
              <Button variant="outline" size="sm" className="gap-2">
                <Send className="h-4 w-4" />
                Telegram
              </Button>
            </a>
          </TooltipTrigger>
          <TooltipContent>Compartilhar no Telegram</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={links.email}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("email")}
            >
              <Button variant="outline" size="sm" className="gap-2">
                <Mail className="h-4 w-4" />
                E-mail
              </Button>
            </a>
          </TooltipTrigger>
          <TooltipContent>Compartilhar por e-mail</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" onClick={onCopy} className="gap-2">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copiado" : "Copiar link"}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copiar link</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
