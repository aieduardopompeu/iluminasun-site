import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";
import { ArrowRight, Award, BarChart3, Leaf, TrendingDown, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="flex flex-col">
      <SEO
        title="Iluminasun - Energia Solar Fotovoltaica | Economia de até 95%"
        description="Reduza até 95% da sua conta de luz com energia solar. Soluções residenciais, comerciais e industriais. Orçamento gratuito e simulação online. Mais de 500 projetos instalados."
        keywords="energia solar, painéis solares, energia fotovoltaica, economia de energia, energia renovável, instalação solar, kit solar residencial, energia limpa"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Energia Solar que{" "}
                <span className="text-primary">Ilumina</span> e{" "}
                <span className="text-secondary">Economiza</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground">
                Reduza até 95% da sua conta de luz com energia limpa, renovável e sustentável.
                Invista no futuro do planeta e da sua economia.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/simulador">
                  <Button size="lg" className="text-base font-semibold w-full sm:w-auto">
                    Simular Minha Economia
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contato">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base font-semibold w-full sm:w-auto"
                  >
                    Falar com Especialista
                  </Button>
                </Link>
              </div>

              {/* Prova Social */}
              <div className="flex items-center gap-6 pt-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">500+</p>
                  <p className="text-sm text-muted-foreground">Projetos Instalados</p>
                </div>
                <div className="h-12 w-px bg-border"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-secondary">15+</p>
                  <p className="text-sm text-muted-foreground">Anos de Experiência</p>
                </div>
                <div className="h-12 w-px bg-border"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">98%</p>
                  <p className="text-sm text-muted-foreground">Clientes Satisfeitos</p>
                </div>
              </div>

              {/* ✅ CTA secundário: agora é outline pequeno (botão discreto) */}
              <div className="pt-2">
                <Link href="/cidades">
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-semibold w-full sm:w-auto"
                  >
                    Ver cidades atendidas
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                <img
                  src="/iluminasun-hero.webp"
                  alt="Ilumina Sun - Energia Solar Fotovoltaica"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por Que Escolher Energia Solar?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Invista em um futuro sustentável e economize com a fonte de energia mais limpa do planeta
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingDown className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Economia de até 95%</h3>
                <p className="text-muted-foreground">
                  Reduza drasticamente sua conta de luz e tenha retorno do investimento em poucos anos
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-secondary transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <Leaf className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">100% Sustentável</h3>
                <p className="text-muted-foreground">
                  Energia limpa e renovável que não emite CO₂ e ajuda a preservar o meio ambiente
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Valorização do Imóvel</h3>
                <p className="text-muted-foreground">
                  Imóveis com energia solar têm valorização de até 30% no mercado imobiliário
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-secondary transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">Energia Independente</h3>
                <p className="text-muted-foreground">
                  Produza sua própria energia e fique protegido contra aumentos nas tarifas
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Garantia Estendida</h3>
                <p className="text-muted-foreground">
                  Painéis solares com garantia de até 25 anos de eficiência e durabilidade
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-secondary transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <TrendingDown className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">ROI Rápido</h3>
                <p className="text-muted-foreground">
                  Retorno do investimento entre 3 a 6 anos, com economia por mais de 25 anos
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Pronto para Economizar com Energia Solar?
            </h2>
            <p className="text-lg text-muted-foreground">
              Faça uma simulação gratuita e descubra quanto você pode economizar na sua conta de luz
            </p>
            <Link href="/simulador">
              <Button size="lg" className="text-base font-semibold">
                Simular Agora Gratuitamente
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
