import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";
import FeaturedCarousel, { FeaturedPost } from "../../components/blog/FeaturedCarousel";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Link } from "wouter";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;

  /** Data real para ordenação (ISO) */
  dateISO: string;
  /** Texto exibido */
  dateLabel: string;

  readTime: string;
  slug: string;

  image?: string;
  imageAlt?: string;

  /** Controle editorial */
  published: boolean;
  /** Se definido, entra no carrossel. Menor = mais prioritário */
  featuredRank?: number;
};

const blogPosts: BlogPost[] = [
  {
    id: "2",
    title:
      "Lei 14.300 (Marco Legal da Geração Distribuída): o que muda na prática no RJ e como evitar erros na homologação",
    excerpt:
      "Guia direto sobre a Lei 14.300, SCEE/créditos, regras de transição e impacto por perfil (residencial, comercial, industrial e rural) — com foco no RJ e Região.",
    category: "Legislação",
    author: "Equipe Ilumina Sun",
    dateISO: "2025-12-18",
    dateLabel: "18 de Dezembro, 2025",
    readTime: "10–13 min",
    slug: "marco-legal-lei-14300-energia-solar-rj",
    image: "/blog/marco-legal-14300.webp",
    imageAlt: "Lei 14.300 (Marco Legal) e energia solar no RJ",
    published: true,
    featuredRank: 2,
  },
  {
    id: "1",
    title: "Regulamentação da ANEEL: Tudo o que Você Precisa Saber sobre Energia Solar",
    excerpt:
      "Entenda as principais normas da ANEEL para geração distribuída de energia solar, incluindo mudanças recentes no marco legal e como isso afeta consumidores e empresas no RJ e Região.",
    category: "Regulamentação",
    author: "Equipe Ilumina Sun",
    dateISO: "2025-12-17",
    dateLabel: "17 de Dezembro, 2025",
    readTime: "10–14 min",
    slug: "regulamentacao-aneel-energia-solar",
    image: "/blog/regulamentacao-aneel.webp",
    imageAlt: "Regulamentação da ANEEL e energia solar",
    published: true,
    featuredRank: 1,
  },
  {
    id: "4",
    title: "Manutenção de Painéis Solares: Guia Completo para Máxima Eficiência",
    excerpt:
      "Aprenda como realizar a manutenção correta do seu sistema fotovoltaico para garantir máxima geração e prolongar a vida útil.",
    category: "Manutenção",
    author: "Equipe Ilumina Sun",
    dateISO: "2024-11-28",
    dateLabel: "28 de Novembro, 2024",
    readTime: "6 min",
    slug: "manutencao-paineis-solares",
    image: "/blog/regulamentacao-aneel.webp",
    imageAlt: "Manutenção de painéis solares",
    published: true,
    featuredRank: 4,
  },
  {
    id: "5",
    title: "Energia Solar para Empresas: Como Reduzir Custos Operacionais",
    excerpt:
      "Descubra como empresas de todos os portes estão economizando com energia solar e melhorando competitividade.",
    category: "Comercial",
    author: "Equipe Ilumina Sun",
    dateISO: "2024-11-20",
    dateLabel: "20 de Novembro, 2024",
    readTime: "7 min",
    slug: "energia-solar-empresas",
    image: "/blog/regulamentacao-aneel.webp",
    imageAlt: "Energia solar para empresas",
    published: true,
    // não destacado
  },
  {
    id: "6",
    title: "Tendências do Mercado Solar em 2025: O Que Esperar",
    excerpt:
      "Análise das principais tendências do setor de energia solar para 2025, incluindo novas tecnologias e projeções do mercado brasileiro.",
    category: "Mercado",
    author: "Equipe Ilumina Sun",
    dateISO: "2024-11-15",
    dateLabel: "15 de Novembro, 2024",
    readTime: "9 min",
    slug: "tendencias-mercado-solar-2025",
    image: "/blog/regulamentacao-aneel.webp",
    imageAlt: "Tendências do mercado de energia solar",
    published: true,
    featuredRank: 3,
  },

  // Exemplo futuro (rascunho / não publicado)
  // {
  //   id: "7",
  //   title: "Conta de luz não zerou: entenda mínimos, compensação e cobranças",
  //   excerpt: "Por que a conta não zera mesmo com solar? Explicação simples e prática para RJ e Região.",
  //   category: "Financiamento",
  //   author: "Equipe Ilumina Sun",
  //   dateISO: "2025-12-30",
  //   dateLabel: "30 de Dezembro, 2025",
  //   readTime: "8–10 min",
  //   slug: "conta-de-luz-nao-zerou-energia-solar",
  //   image: "/blog/conta-nao-zerou.webp",
  //   imageAlt: "Conta de luz e energia solar",
  //   published: false,
  // }
];

function byDateDesc(a: BlogPost, b: BlogPost) {
  return new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime();
}

export default function Blog() {
  // 1) Somente publicados
  const published = blogPosts.filter((p) => p.published);

  // 2) Destaques do carrossel (ordenados por featuredRank)
  const featured = published
    .filter((p) => typeof p.featuredRank === "number")
    .sort((a, b) => (a.featuredRank! - b.featuredRank!))
    .slice(0, 4);

  const featuredIds = new Set(featured.map((p) => p.id));

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

  // 3) Recentes: ordena por data desc e remove os destaques (pra não repetir)
  // Se você quiser repetir, é só remover o filter(!featuredIds.has)
  const recentPosts = published
    .filter((p) => !featuredIds.has(p.id))
    .sort(byDateDesc);

  return (
    <div className="flex flex-col">
      <SEO
        title="Blog | Ilumina Sun - Notícias e Artigos sobre Energia Solar"
        description="Conteúdo educativo sobre energia solar, regulamentação (ANEEL), legislação (Lei 14.300) e novidades do setor — com foco em RJ, Niterói, São Gonçalo, Itaboraí, Tanguá, Rio Bonito e Maricá."
        keywords="blog energia solar, ANEEL, lei 14300, marco legal geração distribuída, energia solar RJ, Niterói, São Gonçalo, Maricá"
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
