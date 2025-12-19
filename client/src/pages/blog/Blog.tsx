import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";
import FeaturedCarousel, { FeaturedPost } from "../../components/blog/FeaturedCarousel";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Link } from "wouter";

import { blogPosts, type BlogPost } from "../../content/blogPosts";

function byDateDesc(a: BlogPost, b: BlogPost) {
  return new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime();
}

export default function Blog() {
  const published = blogPosts.filter((p) => p.published);

  // -----------------------------
  // CARROSSEL "BLINDADO"
  // 1) pega os com featuredRank (ordem)
  // 2) completa com os mais recentes (por dateISO)
  // -----------------------------
  const rankedFeatured = published
    .filter((p) => typeof p.featuredRank === "number")
    .sort((a, b) => (a.featuredRank! - b.featuredRank!));

  const rankedIds = new Set(rankedFeatured.map((p) => p.id));

  const recentPool = [...published].sort(byDateDesc).filter((p) => !rankedIds.has(p.id));

  const featured = [...rankedFeatured, ...recentPool].slice(0, 4);

  const featuredPosts: FeaturedPost[] = featured.map((p) => ({
    id: p.id,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    author: p.author,
    date: p.dateLabel,
    readTime: p.readTime,
    slug: p.slug,
    image: p.image,
    imageAlt: p.imageAlt,
  }));

  // -----------------------------
  // RECENTES "NUNCA SOME"
  // Ordena por data e remove só o 1º destaque (para não duplicar o principal)
  // -----------------------------
  const primaryFeaturedId = featured[0]?.id;

  const recentPosts = [...published]
    .sort(byDateDesc)
    .filter((p) => p.id !== primaryFeaturedId);

  return (
    <div className="flex flex-col">
      <SEO
        title="Blog | Ilumina Sun - Notícias e Artigos sobre Energia Solar"
        description="Conteúdo educativo sobre energia solar, regulamentação (ANEEL), legislação (Lei 14.300) e novidades do setor — com foco em RJ, Niterói, São Gonçalo, Itaboraí, Tanguá, Rio Bonito e Maricá."
        keywords="blog energia solar, ANEEL, lei 14300, marco legal geração distribuída, energia solar RJ, Niterói, São Gonçalo, Itaboraí, Tanguá, Rio Bonito, Maricá"
      />

      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">Blog & Notícias</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Conteúdo educativo sobre energia solar, regulamentação, financiamento e novidades do setor
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container">
          <FeaturedCarousel posts={featuredPosts} />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Artigos Recentes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Card key={post.id} className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary/10 text-secondary">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                    <Calendar className="h-3 w-3" />
                    <span>{post.dateLabel}</span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Ler Mais
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Categorias</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Regulamentação", "Financiamento", "Legislação", "Manutenção", "Comercial", "Mercado"].map((category) => (
              <Button key={category} variant="outline" size="lg">
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Pronto para Economizar com Energia Solar?</h2>
            <p className="text-lg text-muted-foreground">Faça uma simulação gratuita e descubra quanto você pode economizar</p>
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
