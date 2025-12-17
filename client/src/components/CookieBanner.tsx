"use client";

import { useEffect, useMemo, useState } from "react";

type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: number;
};

const KEY = "iluminasun_cookie_consent_v1";

function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

function writeConsent(next: ConsentState) {
  localStorage.setItem(KEY, JSON.stringify(next));
}

function applyConsentToTags(consent: ConsentState) {
  // Se você usa gtag diretamente:
  // @ts-ignore
  const gtag = (window as any).gtag;
  if (typeof gtag === "function") {
    gtag("consent", "update", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied",
    });
  }

  // Se você usa dataLayer/GTM, dá para também sinalizar por evento:
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({
    event: "cookie_consent_update",
    consent_analytics: consent.analytics,
    consent_marketing: consent.marketing,
  });
}

export function openCookiePreferences() {
  // util simples para reabrir via window event
  window.dispatchEvent(new Event("iluminasun_open_cookie_prefs"));
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);

  const initial = useMemo<ConsentState>(() => {
    return {
      necessary: true,
      analytics: false,
      marketing: false,
      updatedAt: Date.now(),
    };
  }, []);

  const [draft, setDraft] = useState<ConsentState>(initial);

  useEffect(() => {
    const saved = readConsent();
    if (!saved) {
      setVisible(true);
      setDraft(initial);
    } else {
      applyConsentToTags(saved);
    }

    const handler = () => {
      setVisible(true);
      setShowPrefs(true);
      const current = readConsent() || initial;
      setDraft(current);
    };

    window.addEventListener("iluminasun_open_cookie_prefs", handler);
    return () => window.removeEventListener("iluminasun_open_cookie_prefs", handler);
  }, [initial]);

  function acceptAll() {
    const next: ConsentState = { necessary: true, analytics: true, marketing: true, updatedAt: Date.now() };
    writeConsent(next);
    applyConsentToTags(next);
    setVisible(false);
    setShowPrefs(false);
  }

  function rejectNonNecessary() {
    const next: ConsentState = { necessary: true, analytics: false, marketing: false, updatedAt: Date.now() };
    writeConsent(next);
    applyConsentToTags(next);
    setVisible(false);
    setShowPrefs(false);
  }

  function savePrefs() {
    const next: ConsentState = { ...draft, necessary: true, updatedAt: Date.now() };
    writeConsent(next);
    applyConsentToTags(next);
    setVisible(false);
    setShowPrefs(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-slate-700">
          <strong>Cookies:</strong> usamos cookies necessários para funcionamento e, com sua autorização,
          cookies analíticos/marketing para melhorar a experiência e medir performance.
          Veja a <a className="underline" href="/politica-de-cookies">Política de Cookies</a>.
        </div>

        {!showPrefs ? (
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <button
              onClick={() => setShowPrefs(true)}
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800"
            >
              Preferências
            </button>
            <button
              onClick={rejectNonNecessary}
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800"
            >
              Rejeitar não necessários
            </button>
            <button
              onClick={acceptAll}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Aceitar todos
            </button>
          </div>
        ) : (
          <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-3">
            <div className="text-sm font-semibold text-slate-900">Preferências de cookies</div>

            <label className="mt-2 flex items-center justify-between gap-3 text-sm text-slate-700">
              <span>Necessários (sempre ativos)</span>
              <input type="checkbox" checked disabled />
            </label>

            <label className="mt-2 flex items-center justify-between gap-3 text-sm text-slate-700">
              <span>Analíticos</span>
              <input
                type="checkbox"
                checked={draft.analytics}
                onChange={(e) => setDraft((d) => ({ ...d, analytics: e.target.checked }))}
              />
            </label>

            <label className="mt-2 flex items-center justify-between gap-3 text-sm text-slate-700">
              <span>Marketing</span>
              <input
                type="checkbox"
                checked={draft.marketing}
                onChange={(e) => setDraft((d) => ({ ...d, marketing: e.target.checked }))}
              />
            </label>

            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <button
                onClick={rejectNonNecessary}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800"
              >
                Rejeitar não necessários
              </button>
              <button
                onClick={savePrefs}
                className="rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
              >
                Salvar preferências
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
