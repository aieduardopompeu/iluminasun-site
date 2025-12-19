// client/src/pages/blog/Blog.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";
import FeaturedCarousel, { FeaturedPost } from "../../components/blog/FeaturedCarousel";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Link } from "wouter";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  slug: string;
  image?: string;
  imageAlt?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Regulamentação da ANEEL: Tudo o que Você Precisa Saber sobre Energia Solar",
    excerpt:
      "Entenda as principais normas da ANEEL para geração distribuída de energia solar, incluindo mudanças recentes no marco legal e como isso afeta consumidores e empresas no RJ e Região.",
    category: "Regulamentação",
    author: "Equipe Ilumina Sun",
    date: "17 de Dezembro, 2025",
    readTime: "10–14 min",
    slug: "regulamentacao-aneel-energia-solar",
    image: "/blog/regulamentacao-aneel.webp",
    imageAlt: "Regulamentação da ANEEL e energia solar",
  },
  {
    id: "2",
    title:
      "Lei 14.300 (Marco Legal da Geração Distribuída): o que muda na prática no RJ e como evitar erros na homologação",
    excerpt:
      "Guia direto sobre a Lei 14.300, SCEE/créditos, regras de transição e impacto por perfil (residencial, comercial, industrial e rural) — com foco no RJ e Região.",
    category: "Legislação",
    author: "Equipe Ilumina Sun",
    date: "18 de Dezembro, 2025",
    readTime: "10–13 min",
    slug: "marco-legal-lei-14300-energia-solar-rj",
    image: "/blog/marco-legal-14300.webp",
    imageAlt: "Lei 14.300 (Marco Legal) e energia solar no RJ",
  },

  // ✅ Removido: card duplicado "Marco Legal da Geração Distribuída: O Que Mudou em 2024"
  // (slug: "marco-legal-geracao-distribuida")

  {
    id: "4",
    title: "Manutenção de Painéis Solares: Guia Completo para Máxima Eficiência",
    excerpt:
      "Aprenda como realizar a manutenção correta do seu sistema fotovoltaico para garantir máxima geração e prolongar a vida útil.",
    category: "Manutenção",
    author: "Equipe Ilumina Sun",
    date: "28 de Novembro, 2024",
    readTime: "6 min",
    slug: "manutencao-paineis-solares",
    image: "/blog/regulamentacao-aneel.webp",
    imageAlt: "Manutenção de painéis solares",
  },
  {
    id: "5",
    title: "Energia Solar para Empresas: Como Reduzir Custos Operacionais",
    excerpt:
      "Descubra como empresas de todos os portes estão economizando com energia solar e melhorando competitividade.",
    category: "Comercial",
    author: "Equipe Ilumina Sun",
    date: "20 de Novembro, 2024",
    readTime: "7 min",
    slug: "energia-solar-empresas",
    image: "/blog/regulamentacao-aneel.webp",
    imageAlt: "Energia solar para empresas",
  },
  {
    id: "6",
    title: "Tendências do Mercado Solar em 2025: O Que Esperar",
    excerpt:
      "Análise das principais tendências do setor de energia solar para 2025, incluindo novas tecnologias e projeções do mercado brasileiro.",
    category: "Mercado",
    author: "Equipe Ilumina Sun",
    date: "15 de Novembro, 2024",
    readTime: "9 min",
    slug: "tendencias-mercado-solar-2025",
    image: "/blog/regulamentacao-aneel.webp",
    imageAlt: "Tendências do mercado de energia solar",
  },
];

export default function Blog() {
  const FEATURED_COUNT = Math.min(4, blogPosts.length);

  const featuredPosts: FeaturedPost[] = blogPosts.slice(0, FEATURED_COUNT).map((p) => ({
    id: p.id,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    author: p.author,
    date: p.date,
    readTime: p.readTime,
    slug: p.slug,
    image: p.image,
    imageAlt: p.imageAlt,
  }));

  // Mostra todos exceto o primeiro (que já está em destaque)
  const recentPosts = blogPosts.filter((p) => p.id !== blogPosts[0]?.id);

  return (
    <div className="flex flex-col">
      <SEO
        title="Blog | Ilumina Sun - Notícias e Artigos sobre Energia Solar"
        description="Conteúdo educativo sobre energia solar, regulamentação (ANEEL), financiamento e novidades do setor — com foco em RJ, Niterói, São Gonçalo, Itaboraí, Tanguá, Rio Bonito e Maricá."
        keywords="blog energia solar, ANEEL, regulamentação energia solar, financiamento solar, geração distribuída, RJ, Niterói, São Gonçalo, Itaboraí, Tanguá, Rio Bonito, Maricá"
      />

      {/* Hero */}
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

      {/* Destaque: Carrossel */}
      <section className="py-10 md:py-14">
        <div className="container">
          <FeaturedCarousel posts={featuredPosts} />
        </div>
      </section>

      {/* Recentes */}
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
                    <span>{post.date}</span>
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

      {/* Categorias */}
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

      {/* Newsletter */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Receba Novidades do Setor Solar</h2>
            <p className="text-lg text-muted-foreground">
              Assine nossa newsletter e fique por dentro das últimas notícias, regulamentações e oportunidades do mercado de energia solar
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 rounded-lg border bg-background"
              />
              <Button size="lg" className="font-semibold">
                Assinar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
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
