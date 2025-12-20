"use client";

import React, { useEffect, useMemo } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
    __adsenseScriptLoaded?: boolean;
  }
}

type AdSenseAdProps = {
  /** ca-pub-4436420746304287 */
  client: string;
  /** ID do bloco (ad unit) no AdSense */
  slot: string;

  /** Classe opcional para espaçamentos */
  className?: string;

  /** Para SPA: força recriar o <ins> quando muda de post (use slug) */
  refreshKey?: string;

  /** Ative para testar sem servir anúncio real (DEV) */
  adTest?: boolean;

  /** Auto = geralmente o melhor para responsivo */
  format?: "auto" | "fluid";

  /** true = recomendado para responsivo */
  fullWidthResponsive?: boolean;

  /** Estilo opcional do <ins> */
  style?: React.CSSProperties;
};

function ensureAdSenseScript(client: string) {
  if (typeof window === "undefined") return;
  if (window.__adsenseScriptLoaded) return;

  const existing = document.querySelector(
    'script[src*="pagead/js/adsbygoogle.js"]'
  ) as HTMLScriptElement | null;

  if (existing) {
    window.__adsenseScriptLoaded = true;
    return;
  }

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
    client
  )}`;
  s.crossOrigin = "anonymous";
  s.onload = () => {
    window.__adsenseScriptLoaded = true;
  };
  document.head.appendChild(s);

  window.__adsenseScriptLoaded = true;
}

export default function AdSenseAd({
  client,
  slot,
  className = "",
  refreshKey = "",
  adTest = false,
  format = "auto",
  fullWidthResponsive = true,
  style,
}: AdSenseAdProps) {
  const insKey = useMemo(() => `${slot}__${refreshKey}`, [slot, refreshKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!client || !slot) return;

    ensureAdSenseScript(client);

    // Espera um tick para garantir que o <ins> entrou no DOM
    const t = window.setTimeout(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // AdSense às vezes lança erro em SPA; ignoramos para não quebrar a página
      }
    }, 0);

    return () => window.clearTimeout(t);
  }, [client, slot, insKey]);

  if (!client || !slot) return null;

  return (
    <div className={className}>
      <ins
        key={insKey}
        className="adsbygoogle"
        style={{ display: "block", ...(style ?? {}) }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
        {...(adTest ? { "data-adtest": "on" } : {})}
      />
    </div>
  );
}
