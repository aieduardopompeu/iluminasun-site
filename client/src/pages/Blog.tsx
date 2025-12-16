import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
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
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Regulamentação da ANEEL: Tudo o que Você Precisa Saber sobre Energia Solar",
    excerpt: "Entenda as principais normas da ANEEL para geração distribuída de energia solar, incluindo a Resolução Normativa 482 e as mudanças recentes na legislação que afetam consumidores e empresas.",
    category: "Regulamentação",
    author: "Equipe Iluminasun",
    date: "15 de Dezembro, 2024",
    readTime: "8 min",
    slug: "regulamentacao-aneel-energia-solar",
  },
  {
    id: "2",
    title: "Financiamento Solar: As Melhores Linhas de Crédito para Energia Fotovoltaica",
    excerpt: "Conheça as principais opções de financiamento para sistemas de energia solar, incluindo linhas do BNDES, bancos privados e cooperativas. Descubra qual é a melhor opção para o seu perfil.",
    category: "Financiamento",
    author: "Equipe Iluminasun",
    date: "10 de Dezembro, 2024",
    readTime: "10 min",
    slug: "financiamento-energia-solar",
  },
  {
    id: "3",
    title: "Marco Legal da Geração Distribuída: O Que Mudou em 2024",
    excerpt: "Análise completa das mudanças trazidas pelo Marco Legal da Geração Distribuída (Lei 14.300/2022) e como elas impactam quem já tem ou pretende instalar energia solar.",
    category: "Legislação",
    author: "Equipe Iluminasun",
    date: "05 de Dezembro, 2024",
    readTime: "12 min",
    slug: "marco-legal-geracao-distribuida",
  },
  {
    id: "4",
    title: "Manutenção de Painéis Solares: Guia Completo para Máxima Eficiência",
    excerpt: "Aprenda como realizar a manutenção correta do seu sistema fotovoltaico para garantir máxima geração de energia e prolongar a vida útil dos equipamentos.",
    category: "Manutenção",
    author: "Equipe Iluminasun",
    date: "28 de Novembro, 2024",
    readTime: "6 min",
    slug: "manutencao-paineis-solares",
  },
  {
    id: "5",
    title: "Energia Solar para Empresas: Como Reduzir Custos Operacionais",
    excerpt: "Descubra como empresas de todos os portes estão economizando milhares de reais por mês com energia solar e melhorando sua competitividade no mercado.",
    category: "Comercial",
    author: "Equipe Iluminasun",
    date: "20 de Novembro, 2024",
    readTime: "7 min",
    slug: "energia-solar-empresas",
  },
  {
    id: "6",
    title: "Tendências do Mercado Solar em 2025: O Que Esperar",
    excerpt: "Análise das principais tendências do setor de energia solar para 2025, incluindo novas tecnologias, preços de equipamentos e projeções de crescimento do mercado brasileiro.",
    category: "Mercado",
    author: "Equipe Iluminasun",
    date: "15 de Novembro, 2024",
    readTime: "9 min",
    slug: "tendencias-mercado-solar-2025",
  },
];

export default function Blog() {
  return (
    <div className="flex flex-col">
      <SEO
        title="Blog | Iluminasun - Notícias e Artigos sobre Energia Solar"
        description="Fique por dentro das últimas notícias, regulamentações da ANEEL, opções de financiamento e novidades do setor de energia solar fotovoltaica."
        keywords="blog energia solar, notícias energia solar, ANEEL, financiamento solar, regulamentação energia solar, mercado fotovoltaico"
      />

      {/* Hero Section */}
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

      {/* Artigo em Destaque */}
      <section className="py-16 md:py-24">
        <div className="container">
          <Card className="border-2 border-primary/20 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-8 md:p-12 flex items-center justify-center min-h-[300px]">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📋</div>
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/20 text-primary">
                      Destaque
                    </span>
                  </div>
                </div>
                <div className="p-8 md:p-12 space-y-4">
                  <span className="text-sm font-medium px-3 py-1 rounded-full bg-secondary/10 text-secondary">
                    {blogPosts[0].category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold">{blogPosts[0].title}</h2>
                  <p className="text-muted-foreground">{blogPosts[0].excerpt}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{blogPosts[0].date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{blogPosts[0].readTime} de leitura</span>
                    </div>
                  </div>
                  <Button className="mt-4">
                    Ler Artigo Completo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Lista de Artigos */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Artigos Recentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post) => (
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
                  <Button variant="outline" size="sm" className="w-full">
                    Ler Mais
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
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
            {["Regulamentação", "Financiamento", "Legislação", "Manutenção", "Comercial", "Mercado", "Residencial", "Tecnologia"].map((category) => (
              <Button key={category} variant="outline" size="lg">
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Newsletter */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Receba Novidades do Setor Solar
            </h2>
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
            <h2 className="text-3xl md:text-4xl font-bold">
              Pronto para Economizar com Energia Solar?
            </h2>
            <p className="text-lg text-muted-foreground">
              Faça uma simulação gratuita e descubra quanto você pode economizar
            </p>
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
