import React, { useEffect, useMemo, useState } from "react";

type CheckItem = {
  id: string;
  label: string;
  help?: string;
  priority: "P0" | "P1" | "P2";
};

type CheckSection = {
  title: string;
  items: CheckItem[];
};

const STORAGE_KEY = "iluminasun.adsenseChecklist.v1";

const SECTIONS: CheckSection[] = [
  {
    title: "P0 — Bloqueadores (não pedir revisão se faltar)",
    items: [
      {
        id: "home_editorial",
        priority: "P0",
        label: "Home: seção editorial fixa (H2 + 3–5 parágrafos, informativa, não comercial)",
        help: "Explique como funciona energia solar, quando vale a pena e variáveis (tarifa/consumo/irradiação).",
      },
      {
        id: "home_faq",
        priority: "P0",
        label: "Home: FAQ educacional com 6–10 perguntas e respostas reais",
      },
      {
        id: "servicos_texto",
        priority: "P0",
        label: "Serviços: cada página tem 300–500 palavras + Como funciona + Para quem é + Limitações",
      },
      {
        id: "blog_5_posts_fortes",
        priority: "P0",
        label: "Blog: existem pelo menos 5 posts fortes (800–1200 palavras, 3+ H2, conteúdo prático)",
      },
      {
        id: "blog_sem_posts_fracos",
        priority: "P0",
        label: "Blog: não existe post fraco indexado (se fraco → melhorar ou noindex)",
        help: "Um único post raso pode derrubar a avaliação do site inteiro.",
      },
      {
        id: "sobre_completo",
        priority: "P0",
        label: "Sobre: texto humano e completo (quem é, onde atua, processo real) com 300+ palavras",
      },
      {
        id: "contato_completo",
        priority: "P0",
        label: "Contato: e-mail + WhatsApp/telefone + cidade/UF + horário de atendimento",
      },
      {
        id: "privacidade_termos_ok",
        priority: "P0",
        label: "Política de Privacidade e Termos: acessíveis e coerentes (cookies, GA4, formulários)",
      },
      {
        id: "subdominios_limpos",
        priority: "P0",
        label: "Subdomínios/testes: não existe placeholder/teste acessível (lp removido e sem lixo indexável)",
      },
      {
        id: "sitemap_limpo",
        priority: "P0",
        label: "Sitemap: não lista páginas vazias/“thin content”; o que for fraco está noindex ou fora do sitemap",
      },
    ],
  },
  {
    title: "P1 — Reforços (melhoram percepção de valor)",
    items: [
      {
        id: "ux_cookie_nao_bloqueia",
        priority: "P1",
        label: "Banner de cookies não cobre conteúdo e não força clique",
      },
      {
        id: "whatsapp_nao_atrapalha",
        priority: "P1",
        label: "WhatsApp/CTA flutuante não cobre texto em mobile",
      },
      {
        id: "navegacao_clara",
        priority: "P1",
        label: "Navegação clara: o usuário encontra serviços, blog e contato sem ser “forçado” a converter",
      },
      {
        id: "conteudo_local_se_existir",
        priority: "P1",
        label: "Se existirem páginas locais (cidades), elas têm 250–400 palavras e FAQ local (ou estão noindex)",
      },
    ],
  },
  {
    title: "P2 — Higiene técnica (remove ruído)",
    items: [
      {
        id: "robots_ok",
        priority: "P2",
        label: "robots.txt não bloqueia páginas importantes (Home/Serviços/Blog/Posts)",
      },
      {
        id: "sem_soft404",
        priority: "P2",
        label: "Sem soft-404: páginas com URL válida mas sem conteúdo real",
      },
      {
        id: "sem_redirects_estranhos",
        priority: "P2",
        label: "Sem redirecionamentos enganosos/cloaking",
      },
    ],
  },
];

function nowISO() {
  return new Date().toISOString();
}

function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function AdsenseChecklistPage() {
  const allItems = useMemo(() => SECTIONS.flatMap((s) => s.items), []);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<string>("");
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  // load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      setChecked(parsed.checked || {});
      setNotes(parsed.notes || "");
      setLastSavedAt(parsed.savedAt || null);
    } catch {
      // ignore
    }
  }, []);

  // autosave
  useEffect(() => {
    const payload = { checked, notes, savedAt: nowISO() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setLastSavedAt(payload.savedAt);
    } catch {
      // ignore
    }
  }, [checked, notes]);

  const totals = useMemo(() => {
    const total = allItems.length;
    const done = allItems.filter((i) => checked[i.id]).length;

    const p0Items = allItems.filter((i) => i.priority === "P0");
    const p0Done = p0Items.filter((i) => checked[i.id]).length;

    return { total, done, p0Total: p0Items.length, p0Done };
  }, [allItems, checked]);

  const readyToRequestReview = totals.p0Done === totals.p0Total;

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function markAllInSection(section: CheckSection, value: boolean) {
    setChecked((prev) => {
      const next = { ...prev };
      for (const item of section.items) next[item.id] = value;
      return next;
    });
  }

  function resetAll() {
    if (!confirm("Zerar checklist e observações?")) return;
    setChecked({});
    setNotes("");
    localStorage.removeItem(STORAGE_KEY);
    setLastSavedAt(null);
  }

  function exportJSON() {
    const payload = {
      site: "iluminasun.com.br",
      checklistVersion: "v1",
      exportedAt: nowISO(),
      totals,
      readyToRequestReview,
      checked,
      notes,
    };
    downloadText("iluminasun-adsense-checklist.json", JSON.stringify(payload, null, 2));
  }

  function printPage() {
    window.print();
  }

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px" }}>
      <style>
        {`
          @media print {
            button, .no-print { display: none !important; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
          .card {
            border: 1px solid rgba(0,0,0,.12);
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 16px;
          }
          .row { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
          .muted { opacity: .75; }
          .pill {
            display: inline-block; padding: 4px 10px; border-radius: 999px;
            border: 1px solid rgba(0,0,0,.18); font-size: 12px;
          }
          .ok { background: rgba(0, 200, 0, .08); border-color: rgba(0, 200, 0, .35); }
          .bad { background: rgba(255, 0, 0, .08); border-color: rgba(255, 0, 0, .35); }
          label { display: flex; gap: 10px; align-items: flex-start; padding: 10px 0; cursor: pointer; }
          input[type="checkbox"] { margin-top: 3px; }
          .help { font-size: 13px; margin-left: 28px; margin-top: -6px; }
          .actions { display: flex; gap: 10px; flex-wrap: wrap; }
          button {
            padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(0,0,0,.18);
            background: white; cursor: pointer;
          }
          button.primary {
            border-color: rgba(0,0,0,.35);
            font-weight: 600;
          }
          textarea {
            width: 100%; min-height: 120px; border-radius: 12px;
            border: 1px solid rgba(0,0,0,.18); padding: 12px;
          }
        `}
      </style>

      <div className="card">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22 }}>Checklist AdSense — Ilumina Sun</h1>
            <div className="muted" style={{ marginTop: 6 }}>
              Motivo atual: <strong>Conteúdo de baixo valor</strong> • Progresso:{" "}
              <strong>
                {totals.done}/{totals.total}
              </strong>{" "}
              • P0:{" "}
              <strong>
                {totals.p0Done}/{totals.p0Total}
              </strong>
              {lastSavedAt ? (
                <span className="muted"> • Salvo: {new Date(lastSavedAt).toLocaleString()}</span>
              ) : null}
            </div>
          </div>

          <div>
            <span className={`pill ${readyToRequestReview ? "ok" : "bad"}`}>
              {readyToRequestReview ? "APTO PARA PEDIR REVISÃO (P0 OK)" : "NÃO APTO (faltam itens P0)"}
            </span>
          </div>
        </div>

        <div className="actions no-print" style={{ marginTop: 14 }}>
          <button className="primary" onClick={printPage}>Imprimir</button>
          <button onClick={exportJSON}>Exportar JSON</button>
          <button onClick={resetAll}>Zerar</button>
          <span className="muted" style={{ alignSelf: "center" }}>
            Dica: mantenha esta rota sem link no menu (uso interno).
          </span>
        </div>
      </div>

      {SECTIONS.map((section) => (
        <div className="card" key={section.title}>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <h2 style={{ margin: 0, fontSize: 18 }}>{section.title}</h2>
            <div className="actions no-print">
              <button onClick={() => markAllInSection(section, true)}>Marcar tudo</button>
              <button onClick={() => markAllInSection(section, false)}>Desmarcar</button>
            </div>
          </div>

          <div style={{ marginTop: 10 }}>
            {section.items.map((item) => (
              <div key={item.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={!!checked[item.id]}
                    onChange={() => toggle(item.id)}
                  />
                  <div>
                    <div>
                      <span className="pill" style={{ marginRight: 8 }}>{item.priority}</span>
                      {item.label}
                    </div>
                  </div>
                </label>
                {item.help ? <div className="help muted">{item.help}</div> : null}
                <hr style={{ border: 0, borderTop: "1px solid rgba(0,0,0,.08)" }} />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="card">
        <h2 style={{ marginTop: 0, fontSize: 18 }}>Observações</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ex.: Posts atualizados, páginas com noindex, pendências, datas, links..."
        />
        <div className="muted" style={{ marginTop: 10 }}>
          O progresso fica salvo no seu navegador (localStorage). Para compartilhar, use “Exportar JSON”.
        </div>
      </div>
    </div>
  );
}
