import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import SEO from "@/components/SEO";
import {
  Bug,
  FileText,
  MessageSquareText,
  PencilLine,
  Sparkles,
  Star,
  Wrench,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type FeedbackType =
  | "artigo"
  | "correcao"
  | "experiencia"
  | "pagina"
  | "bug"
  | "";

function getUtmParams() {
  if (typeof window === "undefined") {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
    };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_term: params.get("utm_term") || "",
    utm_content: params.get("utm_content") || "",
  };
}

function clampRating(v: number) {
  if (!Number.isFinite(v)) return 0;
  return Math.max(0, Math.min(5, Math.round(v)));
}

function labelType(type: FeedbackType) {
  switch (type) {
    case "artigo":
      return "Sugestão de artigo";
    case "correcao":
      return "Correção de artigo publicado";
    case "experiencia":
      return "Avaliação da experiência";
    case "pagina":
      return "Sugestão para uma página do site";
    case "bug":
      return "Reportar problema (bug)";
    default:
      return "Sugestões & Avaliação";
  }
}

const TYPE_CARDS: Array<{
  type: FeedbackType;
  title: string;
  desc: string;
  Icon: any;
}> = [
  {
    type: "artigo",
    title: "Sugerir tema de artigo",
    desc: "Ideias de pauta, dúvidas e assuntos que você quer ver no blog.",
    Icon: Sparkles,
  },
  {
    type: "correcao",
    title: "Corrigir um artigo",
    desc: "Apontar erro, trecho desatualizado ou algo confuso em um post.",
    Icon: PencilLine,
  },
  {
    type: "experiencia",
    title: "Avaliar este artigo/site",
    desc: "Conte como foi sua experiência e o que faltou.",
    Icon: Star,
  },
  {
    type: "pagina",
    title: "Sugerir melhoria do site",
    desc: "Layout, navegação, simulador, cidades, contato…",
    Icon: Wrench,
  },
  {
    type: "bug",
    title: "Reportar bug",
    desc: "Algo que quebrou, não carregou, ou ficou estranho no celular/PC.",
    Icon: Bug,
  },
];

function appendToMessage(prev: string, text: string) {
  const p = (prev || "").trim();
  const t = text.trim();
  if (!t) return prev;
  if (!p) return t + "\n";
  if (p.includes(t)) return prev;
  return (p + "\n\n" + t + "\n").trimStart();
}

export default function Sugestoes() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [context, setContext] = useState<{ targetUrl: string; title: string }>({
    targetUrl: "",
    title: "",
  });

  const [formData, setFormData] = useState({
    type: "" as FeedbackType,
    name: "",
    email: "",
    phone: "",
    pageUrl: "",
    articleUrl: "",
    rating: 0,
    message: "",
    // honeypot anti-spam (não renderizar visível)
    website: "",
    // UX (somente quando for avaliação)
    found: "" as "" | "sim" | "parcial" | "nao",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const tipo = (params.get("tipo") || "").trim() as FeedbackType;
    const url = (params.get("url") || "").trim();
    const titulo = (params.get("titulo") || "").trim();

    const ref =
      typeof document !== "undefined" ? (document.referrer || "").trim() : "";
    const sameSiteRef = ref.includes("iluminasun.com.br") ? ref : "";

    setContext({ targetUrl: url || sameSiteRef, title: titulo || "" });

    setFormData((prev) => {
      const next = { ...prev };

      if (tipo && !prev.type) next.type = tipo;

      if (!prev.pageUrl) {
        next.pageUrl = url || sameSiteRef || window.location.href;
      }

      if (url && !prev.articleUrl) next.articleUrl = url;

      if (titulo && !prev.message) {
        next.message = `Ref.: ${titulo}\n\n`;
      }

      return next;
    });
  }, []);

  const canSubmit = useMemo(() => {
    return Boolean(formData.type && formData.name && formData.email && formData.message);
  }, [formData.type, formData.name, formData.email, formData.message]);

  const quickChips = useMemo(() => {
    switch (formData.type) {
      case "artigo":
        return [
          "Tema: Energia solar para apartamento/condomínio",
          "Tema: Como comparar propostas (checklist)",
          "Tema: Payback real no RJ (exemplos de contas)",
          "Tema: Módulos N-Type / TOPCon / HJT (2026)",
          "Tema: Baterias — vale a pena no meu caso?",
        ];
      case "correcao":
        return [
          "Trecho desatualizado (valores/mercado)",
          "Faltou fonte/lei/regra (link oficial)",
          "Explicação confusa (reescrever com exemplo)",
          "Erro de português/termo técnico",
          "Adicionar alerta (o que muda no RJ)",
        ];
      case "experiencia":
        return [
          "Não achei a resposta rapidamente",
          "Conteúdo excelente, mas faltou um exemplo",
          "O site está rápido e fácil de navegar",
          "No celular ficou difícil ler/rolar",
          "O simulador poderia ser mais claro",
        ];
      case "pagina":
        return [
          "Adicionar CTA mais visível",
          "Melhorar menu/organização",
          "Melhorar legibilidade no mobile",
          "Adicionar seção de FAQ",
          "Adicionar mais provas sociais (cases/fotos)",
        ];
      case "bug":
        return [
          "Botão não funciona",
          "Página não carrega/erro 404",
          "Layout quebrado no celular",
          "Imagem não aparece",
          "Texto cortado / sobreposição",
        ];
      default:
        return [];
    }
  }, [formData.type]);

  const handlePickType = (t: FeedbackType) => {
    setFormData((p) => ({ ...p, type: t }));
    if (!formData.message.trim()) {
      const starter =
        t === "correcao"
          ? "O que está errado/atualizar:\n- \n\nSugestão de correção:\n- \n"
          : t === "artigo"
            ? "Tema sugerido:\n- \n\nPor que isso ajudaria?\n- \n"
            : t === "experiencia"
              ? "Como foi sua experiência?\n- \n\nO que faltou/melhoraria?\n- \n"
              : t === "bug"
                ? "O que aconteceu?\n- \n\nPassos para reproduzir:\n1) \n2) \n"
                : "Sugestão objetiva:\n- \n\nContexto (onde/por quê):\n- \n";
      setFormData((p) => ({ ...p, message: starter }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) {
      toast.error("Preencha tipo, nome, e-mail e mensagem.");
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const utm = getUtmParams();

      const blocks: string[] = [];
      blocks.push("SUGESTÕES & AVALIAÇÃO (site)");
      blocks.push(`Tipo: ${labelType(formData.type)}`);

      if (formData.pageUrl) blocks.push(`Página relacionada: ${formData.pageUrl}`);
      if (formData.articleUrl) blocks.push(`Artigo (URL): ${formData.articleUrl}`);
      if (formData.rating > 0) blocks.push(`Nota (1–5): ${clampRating(formData.rating)}`);
      if (formData.found) blocks.push(`Encontrou o que queria? ${formData.found}`);

      if (typeof navigator !== "undefined") {
        blocks.push(`User-Agent: ${navigator.userAgent}`);
        if (navigator.language) blocks.push(`Idioma: ${navigator.language}`);
      }

      blocks.push("");
      blocks.push("Mensagem:");
      blocks.push(formData.message.trim());

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        city: undefined,
        state: undefined,
        averageBill: undefined,
        propertyType: undefined,
        message: blocks.join("\n"),
        website: formData.website || undefined,
        page_path:
          typeof window !== "undefined"
            ? window.location.pathname + window.location.search
            : undefined,
        referrer: typeof document !== "undefined" ? document.referrer || "" : undefined,
        ...utm,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({} as any));

      if (!res.ok || !data?.ok) {
        if (res.status === 429) {
          throw new Error("Muitas tentativas. Aguarde alguns segundos e tente novamente.");
        }
        const msg = data?.error ? String(data.error) : "Erro ao enviar sugestão.";
        throw new Error(msg);
      }

      toast.success("Obrigado! Sua sugestão foi enviada.");

      setFormData({
        type: "",
        name: "",
        email: "",
        phone: "",
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        articleUrl: "",
        rating: 0,
        message: "",
        website: "",
        found: "",
      });
    } catch (err: any) {
      toast.error(`Erro ao enviar: ${err?.message || "Tente novamente."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    if (typeof document === "undefined") return;
    const el = document.getElementById("sugestoes-form");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pickTypeAndGo = (t: FeedbackType) => {
    handlePickType(t);
    // leve atraso para garantir que o DOM renderize campos específicos
    setTimeout(scrollToForm, 50);
  };

  return (
    <div className="flex flex-col">
      <SEO
        title="Sugestões & Avaliação | Ilumina Sun"
        description="Canal editorial do Ilumina Sun: sugira temas, aponte correções em artigos e avalie sua experiência."
        keywords="sugestões, avaliação, correção de artigo, blog energia solar, Ilumina Sun"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <MessageSquareText className="h-4 w-4" />
                Canal editorial do site
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Sugestões & Avaliação
              </h1>
              <p className="text-base md:text-lg text-muted-foreground">
                Ajude a manter o blog confiável e útil: sugira temas, aponte correções e conte como foi sua experiência.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <Button type="button" onClick={() => pickTypeAndGo("correcao")}>
                  Corrigir um artigo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => pickTypeAndGo("artigo")}
                >
                  Sugerir tema
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => pickTypeAndGo("experiencia")}
                >
                  Avaliar experiência
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Leva menos de 1 minuto. Nome e e-mail são usados só se a equipe precisar responder.
              </p>
            </div>

            <Card className="shadow-sm">
              <CardContent className="p-5 md:p-6 space-y-3">
                <div className="text-sm font-semibold">
                  O que acontece quando você envia?
                </div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                    Correções no blog entram na fila editorial e priorizamos as mais críticas.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                    Sugestões de pauta viram novos artigos (principalmente RJ e região).
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                    Feedback de UX ajuda a melhorar navegação, simulador e performance.
                  </li>
                </ul>
                <div className="text-xs text-muted-foreground">
                  Se você veio de um artigo, o link já vem preenchido automaticamente.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-5xl space-y-6">
            {(context.targetUrl || context.title) && (
              <Card>
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-2 text-sm font-semibold">
                        <FileText className="h-4 w-4 text-primary" />
                        Você está falando sobre:
                      </div>
                      <div className="text-base font-semibold">
                        {context.title ? context.title : "Uma página do site"}
                      </div>
                      {context.targetUrl ? (
                        <div className="text-sm text-muted-foreground break-all">
                          {context.targetUrl}
                        </div>
                      ) : null}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        setFormData((p) => ({
                          ...p,
                          pageUrl: context.targetUrl || p.pageUrl,
                          articleUrl: context.targetUrl || p.articleUrl,
                        }))
                      }
                    >
                      Usar este link
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card id="sugestoes-form">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* 1) Tipo */}
                  <div className="space-y-3">
                    <div>
                      <h2 className="text-xl font-semibold">1) O que você quer fazer?</h2>
                      <p className="text-sm text-muted-foreground">
                        Escolha o tipo para abrir um formulário mais específico.
                      </p>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      {TYPE_CARDS.map(({ type, title, desc, Icon }) => {
                        const active = formData.type === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => handlePickType(type)}
                            className={[
                              "text-left rounded-xl border p-4 transition",
                              active ? "border-primary bg-primary/5" : "hover:bg-muted/40",
                            ].join(" ")}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={[
                                  "mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg",
                                  active ? "bg-primary text-primary-foreground" : "bg-muted",
                                ].join(" ")}
                              >
                                <Icon className="h-5 w-5" />
                              </div>
                              <div className="space-y-1">
                                <div className="font-semibold">{title}</div>
                                <div className="text-sm text-muted-foreground">{desc}</div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2) Onde */}
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold">2) Onde isso se aplica?</h2>
                      <p className="text-sm text-muted-foreground">
                        Se você veio pelo blog, o link pode vir preenchido automaticamente.
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Página relacionada *</Label>
                        <Input
                          value={formData.pageUrl}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, pageUrl: e.target.value }))
                          }
                          placeholder="Ex.: https://iluminasun.com.br/blog/..."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Tipo (selecionado) *</Label>
                        <Select
                          value={formData.type}
                          onValueChange={(v) =>
                            setFormData((p) => ({ ...p, type: v as FeedbackType }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="artigo">Sugestão de artigo</SelectItem>
                            <SelectItem value="correcao">
                              Correção de artigo publicado
                            </SelectItem>
                            <SelectItem value="experiencia">
                              Avaliação da experiência
                            </SelectItem>
                            <SelectItem value="pagina">
                              Sugestão para uma página do site
                            </SelectItem>
                            <SelectItem value="bug">Reportar problema (bug)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {formData.type === "correcao" ? (
                      <div className="space-y-2">
                        <Label>URL do artigo (para correção)</Label>
                        <Input
                          value={formData.articleUrl}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, articleUrl: e.target.value }))
                          }
                          placeholder="Cole o link do post aqui"
                        />
                        <p className="text-xs text-muted-foreground">
                          Se possível, cole o link exato do artigo para localizar o trecho rapidamente.
                        </p>
                      </div>
                    ) : null}

                    {formData.type ? (
                      <div className="space-y-2">
                        <div className="text-sm font-semibold">
                          Sugestões rápidas (clique para adicionar)
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {quickChips.map((chip) => (
                            <button
                              key={chip}
                              type="button"
                              onClick={() =>
                                setFormData((p) => ({
                                  ...p,
                                  message: appendToMessage(p.message, chip),
                                }))
                              }
                              className="rounded-full border px-3 py-1 text-xs hover:bg-muted/40"
                            >
                              {chip}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {/* 3) Detalhes */}
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold">3) Detalhes</h2>
                      <p className="text-sm text-muted-foreground">
                        Quanto mais contexto, mais rápido a equipe consegue agir.
                      </p>
                    </div>

                    {formData.type === "experiencia" ? (
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Avaliação (1–5)</Label>
                          <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <button
                                key={n}
                                type="button"
                                onClick={() => setFormData((p) => ({ ...p, rating: n }))}
                                className={[
                                  "inline-flex items-center gap-1 rounded-md border px-3 py-2 text-sm",
                                  formData.rating === n
                                    ? "border-primary bg-primary/5"
                                    : "hover:bg-muted/40",
                                ].join(" ")}
                              >
                                <Star className="h-4 w-4" />
                                {n}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Você encontrou o que queria?</Label>
                          <Select
                            value={formData.found}
                            onValueChange={(v) =>
                              setFormData((p) => ({ ...p, found: v as any }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sim">Sim</SelectItem>
                              <SelectItem value="parcial">Parcialmente</SelectItem>
                              <SelectItem value="nao">Não</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ) : null}

                    <div className="space-y-2">
                      <Label>Mensagem *</Label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, message: e.target.value }))
                        }
                        placeholder="Descreva sua sugestão ou problema com o máximo de contexto possível."
                        className="min-h-[140px]"
                      />
                      <p className="text-xs text-muted-foreground">
                        Dica: se for correção, cite o trecho/seção e o que deveria mudar.
                      </p>
                    </div>
                  </div>

                  {/* 4) Identificação */}
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold">4) Identificação (padrão Contato)</h2>
                      <p className="text-sm text-muted-foreground">
                        Nome e e-mail são obrigatórios para a equipe conseguir responder se necessário.
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Nome *</Label>
                        <Input
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, name: e.target.value }))
                          }
                          placeholder="Seu nome"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>E-mail *</Label>
                        <Input
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, email: e.target.value }))
                          }
                          placeholder="seuemail@exemplo.com"
                          type="email"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Telefone (opcional)</Label>
                      <Input
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, phone: e.target.value }))
                        }
                        placeholder="(DDD) 9XXXX-XXXX"
                        inputMode="tel"
                      />
                    </div>

                    {/* Honeypot */}
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, website: e.target.value }))
                      }
                      className="hidden"
                      aria-hidden="true"
                    />

                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <Button type="submit" disabled={!canSubmit || isSubmitting}>
                        {isSubmitting ? "Enviando..." : "Enviar"}
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Ao enviar, você concorda que podemos usar sua mensagem para melhorar o site.
                      </p>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
