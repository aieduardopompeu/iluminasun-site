import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";
import { ArrowRight, Calendar, Clock, Search, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "wouter";

import { blogPosts, type BlogPost } from "../../content/blogPosts";

function byDateDesc(a: BlogPost, b: BlogPost) {
  return new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime();
}

/**
 * Remove duplicados de forma determinística.
 * - Prioriza o item mais recente (por isso chamamos após sort byDateDesc)
 * - Chave principal: slug
 * - Fallback: id
 */
function dedupeBySlugOrId(posts: BlogPost[]) {
  const seen = new Set<string>();
  const out: BlogPost[] = [];

  for (const p of posts) {
    const key = (p.slug && String(p.slug).trim()) || String(p.id);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(p);
  }

  return out;
}

function normalize(text: string) {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function Blog() {
  // mantém o filtro de publicados como está hoje
  const publishedRaw = blogPosts.filter((p) => p.published);

  // 1) ordena por data (mais recente primeiro)
  // 2) remove duplicados por slug (fallback id)
  const published = dedupeBySlugOrId([...publishedRaw].sort(byDateDesc));

  // -----------------------------
  // CARROSSEL "BLINDADO"
  // 1) pega os com featuredRank (ordem)
  // 2) completa com os mais recentes (por dateISO)
  // -----------------------------
  const rankedFeatured = published
    .filter((p) => typeof p.featuredRank === "number")
    .sort((a, b) => a.featuredRank! - b.featuredRank!);

  const rankedIds = new Set(rankedFeatured.map((p) => p.id));

  const recentPool = published.filter((p) => !rankedIds.has(p.id));

  const featured = [...rankedFeatured, ...recentPool].slice(0, 4);

  // -----------------------------
  // DADOS DE UX: categorias + busca
  // -----------------------------
  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const p of published) {
      if (p.category) set.add(p.category);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [published]);

  const [activeCategory, setActiveCategory] = useState<string>("Todos");
  const [q, setQ] = useState<string>("");

  const filtered = useMemo(() => {
    const nq = normalize(q);
    return published.filter((p) => {
      const okCategory = activeCategory === "Todos" ? true : p.category === activeCategory;
      if (!okCategory) return false;

      if (!nq) return true;

      const hay = normalize(`${p.title} ${p.excerpt} ${p.category}`);
      return hay.includes(nq);
    });
  }, [published, activeCategory, q]);

  // -----------------------------
  // RECENTES "NUNCA SOME"
  // Ordena por data e remove só o 1º destaque (para não duplicar o principal)
  // -----------------------------
  const primaryFeaturedId = featured[0]?.id;

  const recentPosts = filtered.filter((p) => p.id !== primaryFeaturedId).sort(byDateDesc);

  // -----------------------------
  // MAIS LIDOS (heurística segura sem depender de analytics):
  // - prioriza featuredRank (se existir)
  // - completa com recentes
  // -----------------------------
  const mostRead = useMemo(() => {
    const ranked = published
      .filter((p) => typeof p.featuredRank === "number")
      .sort((a, b) => a.featuredRank! - b.featuredRank!)
      .slice(0, 5);

    const rankedSet = new Set(ranked.map((p) => p.id));
    const fill = published
      .filter((p) => !rankedSet.has(p.id))
      .sort(byDateDesc)
      .slice(0, Math.max(0, 5 - ranked.length));

    return [...ranked, ...fill];
  }, [published]);

  const primaryFeatured = featured[0];

  return (
    <div className="flex flex-col">
      <SEO
        title="Blog | Ilumina Sun - Notícias e Artigos sobre Energia Solar"
        description="Conteúdo educativo sobre energia solar, regulamentação (ANEEL), legislação (Lei 14.300) e novidades do setor — com foco em RJ, Niterói, São Gonçalo, Itaboraí, Tanguá, Rio Bonito e Maricá."
        keywords="blog energia solar, ANEEL, lei 14300, marco legal geração distribuída, energia solar RJ, Niterói, São Gonçalo, Itaboraí, Tanguá, Rio Bonito, Maricá"
      />

      {/* HERO EDITORIAL (direção + CTA) */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-14 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Conteúdo prático para decisões inteligentes
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Blog Ilumina Sun: energia solar no RJ com clareza, sem promessas vazias
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground">
                  Tendências, tecnologia, legislação e manutenção — organizado para você ler rápido, comparar propostas e tomar decisão com segurança.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/simulador">
                    <Button size="lg" className="text-base font-semibold w-full sm:w-auto">
                      Simular Economia Agora
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/contato">
                    <Button size="lg" variant="outline" className="text-base font-semibold w-full sm:w-auto">
                      Falar com Especialista
                    </Button>
                  </Link>
                </div>

                {/* Sugestões & Avaliação */}
                <div className="rounded-xl border border-border bg-background/60 p-4">
                  <div className="text-sm font-semibold">Ajude a melhorar o blog</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Sugira temas de artigos, aponte correções ou avalie sua experiência no site.
                  </div>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                    <Link href="/sugestoes?tipo=artigo">
                      <Button size="sm" variant="outline" className="w-full sm:w-auto">
                        Sugerir artigo
                      </Button>
                    </Link>
                    <Link href="/sugestoes?tipo=experiencia">
                      <Button size="sm" variant="ghost" className="w-full sm:w-auto">
                        Avaliar experiência
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Busca rápida */}
                <div className="mt-2">
                  <label className="text-sm font-medium text-foreground/80">Buscar no blog</label>
                  <div className="mt-2 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Ex.: lei 14.300, baterias, tecnologia, financiamento…"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                      aria-label="Buscar posts"
                    />
                    {q ? (
                      <button
                        type="button"
                        onClick={() => setQ("")}
                        className="text-xs font-semibold text-muted-foreground hover:text-primary"
                      >
                        Limpar
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Start here / trilhas rápidas */}
              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Comece por aqui
                </div>

                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between gap-4">
                    <span>⚖️ Entender regras e prazos</span>
                    <Link href="/blog/marco-legal-energia-solar-lei-14300-explicado">
                      <a className="font-semibold text-primary hover:opacity-90">Lei 14.300 →</a>
                    </Link>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span>🧠 Escolher tecnologia certa</span>
                    <Link href="/blog/tecnologias-paineis-solares-2026-rj">
                      <a className="font-semibold text-primary hover:opacity-90">Tecnologias 2026 →</a>
                    </Link>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span>🔋 Entender baterias/backup</span>
                    <Link href="/blog/baterias-energia-solar-vale-a-pena-2026-rj">
                      <a className="font-semibold text-primary hover:opacity-90">Baterias 2026 →</a>
                    </Link>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-muted/30 p-4">
                  <div className="text-sm font-semibold">Quer um diagnóstico rápido?</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Em 1 minuto você vê uma estimativa de economia e já entende o próximo passo.
                  </div>
                  <div className="mt-3">
                    <Link href="/simulador">
                      <Button size="sm" className="w-full">
                        Simular agora
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Chips de categoria (filtro real) */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button
                variant={activeCategory === "Todos" ? "default" : "outline"}
                onClick={() => setActiveCategory("Todos")}
              >
                Todos
              </Button>

              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>

            {/* contador de resultados */}
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Mostrando <span className="font-semibold text-foreground">{recentPosts.length}</span>{" "}
              {recentPosts.length === 1 ? "artigo" : "artigos"}
              {activeCategory !== "Todos" ? (
                <>
                  {" "}
                  na categoria <span className="font-semibold text-foreground">{activeCategory}</span>
                </>
              ) : null}
              {q ? (
                <>
                  {" "}
                  para <span className="font-semibold text-foreground">“{q}”</span>
                </>
              ) : null}
              .
            </div>
          </div>
        </div>
      </section>


      {/* GRID PRINCIPAL + SIDEBAR (desktop) */}
      <section className="py-14 md:py-20 bg-muted/30">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
            {/* Lista */}
            <div>
              <div className="mb-6">
                <h2 className="text-3xl font-bold">Artigos</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Leitura rápida, prática e orientada à decisão (sem enrolação).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden border-2 hover:border-primary transition-colors">
                    <CardContent className="p-0">
                      {post.image ? (
                        <Link href={`/blog/${post.slug}`}>
                          <a aria-label={`Abrir: ${post.title}`} className="block">
                            <img
                              src={post.image}
                              alt={post.imageAlt || post.title}
                              className="block h-56 w-full object-cover md:h-52"
                              loading="lazy"
                            />
                          </a>
                        </Link>
                      ) : null}

                      <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary/10 text-secondary">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold leading-snug line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                        <Calendar className="h-3 w-3" />
                        <span>{post.dateLabel}</span>
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          Ler artigo completo
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {recentPosts.length === 0 ? (
                <div className="mt-10 rounded-2xl border border-border bg-background p-8 text-center">
                  <div className="text-lg font-semibold">Nenhum artigo encontrado</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Tente trocar a categoria ou ajustar o termo de busca.
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <Button variant="outline" onClick={() => setActiveCategory("Todos")}>
                      Ver todos
                    </Button>
                    <Button variant="outline" onClick={() => setQ("")}>
                      Limpar busca
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Sidebar estratégica */}
            <aside className="space-y-6 lg:sticky lg:top-24">
              {primaryFeatured ? (
                <div className="rounded-2xl border border-border bg-background p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold">Destaque da semana</div>
                    <span className="text-xs rounded-full bg-primary/10 px-2 py-1 font-semibold text-primary">Top</span>
                  </div>

                  <div className="mt-3 space-y-3">
                    <div className="text-sm font-semibold leading-snug line-clamp-2">{primaryFeatured.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-3">{primaryFeatured.excerpt}</div>

                    <Link href={`/blog/${primaryFeatured.slug}`}>
                      <Button size="sm" className="w-full">
                        Ler agora
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : null}

              <div className="rounded-2xl border border-border bg-background p-5">
                <div className="text-sm font-semibold">Mais lidos</div>
                <div className="mt-3 space-y-3">
                  {mostRead.map((p) => (
                    <Link key={p.id} href={`/blog/${p.slug}`}>
                      <a className="block rounded-xl border border-border bg-muted/30 p-3 hover:bg-muted">
                        <div className="text-xs font-semibold text-primary">{p.category}</div>
                        <div className="mt-1 text-sm font-semibold leading-snug line-clamp-2">{p.title}</div>
                        <div className="mt-1 text-xs text-muted-foreground flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>{p.readTime}</span>
                          <span>•</span>
                          <span>{p.dateLabel}</span>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background p-5">
                <div className="text-sm font-semibold">Ferramentas rápidas</div>
                <div className="mt-3 grid gap-2">
                  <Link href="/simulador">
                    <Button size="sm" className="w-full">
                      Simular economia
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/kit-solar">
                    <Button size="sm" variant="outline" className="w-full">
                      Ver Kits
                    </Button>
                  </Link>
                  <Link href="/contato">
                    <Button size="sm" variant="outline" className="w-full">
                      Falar com especialista
                    </Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Pronto para reduzir sua conta de luz?</h2>
            <p className="text-lg text-muted-foreground">Simule agora e receba orientação para seu caso no RJ e região.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/simulador">
                <Button size="lg" className="text-base font-semibold w-full sm:w-auto">
                  Simular Minha Economia
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contato">
                <Button size="lg" variant="outline" className="text-base font-semibold w-full sm:w-auto">
                  Falar com Especialista
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}