import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Building2, Factory, Home, MapPin, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Portfolio() {
  const projetos = [
    {
      tipo: "Residencial",
      icon: Home,
      local: "São Paulo, SP",
      potencia: "8,5 kWp",
      economia: "R$ 850/mês",
      descricao: "Sistema residencial completo com 20 painéis solares, gerando economia média de 90% na conta de luz.",
      color: "primary",
    },
    {
      tipo: "Comercial",
      icon: Building2,
      local: "Campinas, SP",
      potencia: "45 kWp",
      economia: "R$ 4.200/mês",
      descricao: "Instalação comercial para empresa de médio porte, com retorno do investimento em 4 anos.",
      color: "secondary",
    },
    {
      tipo: "Industrial",
      icon: Factory,
      local: "Sorocaba, SP",
      potencia: "150 kWp",
      economia: "R$ 18.500/mês",
      descricao: "Grande sistema fotovoltaico para indústria, reduzindo custos operacionais significativamente.",
      color: "primary",
    },
    {
      tipo: "Residencial",
      icon: Home,
      local: "Santos, SP",
      potencia: "6,2 kWp",
      economia: "R$ 620/mês",
      descricao: "Residência de alto padrão com sistema integrado ao telhado, design discreto e alta eficiência.",
      color: "secondary",
    },
    {
      tipo: "Comercial",
      icon: Building2,
      local: "Ribeirão Preto, SP",
      potencia: "32 kWp",
      economia: "R$ 3.100/mês",
      descricao: "Sistema para rede de supermercados, com monitoramento em tempo real e gestão centralizada.",
      color: "primary",
    },
    {
      tipo: "Rural",
      icon: Factory,
      local: "Interior de SP",
      potencia: "75 kWp",
      economia: "R$ 8.900/mês",
      descricao: "Propriedade rural com sistema de irrigação solar, garantindo autonomia energética completa.",
      color: "secondary",
    },
  ];

  const depoimentos = [
    {
      nome: "Carlos Silva",
      tipo: "Residencial",
      texto: "Instalei o sistema há 2 anos e já economizei mais de R$ 20 mil. O atendimento da Iluminasun foi excepcional do início ao fim.",
      economia: "R$ 850/mês",
    },
    {
      nome: "Maria Oliveira",
      tipo: "Comercial",
      texto: "Nossa empresa reduziu 92% dos custos com energia elétrica. O investimento se pagou em menos de 4 anos.",
      economia: "R$ 4.200/mês",
    },
    {
      nome: "João Santos",
      tipo: "Industrial",
      texto: "A Iluminasun entregou um projeto impecável. A economia mensal superou nossas expectativas.",
      economia: "R$ 18.500/mês",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">Nosso Portfólio</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Mais de 500 projetos instalados em residências, empresas e indústrias
            </p>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6 space-y-2">
                <p className="text-4xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Projetos Instalados</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6 space-y-2">
                <p className="text-4xl font-bold text-secondary">15MW</p>
                <p className="text-sm text-muted-foreground">Potência Total Instalada</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6 space-y-2">
                <p className="text-4xl font-bold text-primary">98%</p>
                <p className="text-sm text-muted-foreground">Clientes Satisfeitos</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6 space-y-2">
                <p className="text-4xl font-bold text-secondary">25+</p>
                <p className="text-sm text-muted-foreground">Cidades Atendidas</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Galeria de Projetos */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Projetos Realizados</h2>
            <p className="text-lg text-muted-foreground">
              Conheça alguns dos nossos cases de sucesso
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projetos.map((projeto, index) => {
              const Icon = projeto.icon;
              return (
                <Card key={index} className="border-2 hover:border-primary transition-colors">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${projeto.color}/10`}>
                        <Icon className={`h-6 w-6 text-${projeto.color}`} />
                      </div>
                      <span className="text-sm font-medium px-3 py-1 rounded-full bg-muted">
                        {projeto.tipo}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{projeto.local}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Zap className="h-4 w-4" />
                        <span>Potência: {projeto.potencia}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{projeto.descricao}</p>

                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground">Economia mensal</p>
                      <p className="text-2xl font-bold text-primary">{projeto.economia}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
            <p className="text-lg text-muted-foreground">
              Depoimentos reais de quem já economiza com energia solar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {depoimentos.map((depoimento, index) => (
              <Card key={index}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                      {depoimento.nome.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{depoimento.nome}</p>
                      <p className="text-sm text-muted-foreground">{depoimento.tipo}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{depoimento.texto}"</p>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">Economia mensal</p>
                    <p className="text-xl font-bold text-primary">{depoimento.economia}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Seu Projeto Pode Ser o Próximo
            </h2>
            <p className="text-lg text-muted-foreground">
              Entre em contato e receba uma proposta personalizada para suas necessidades
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
                  Solicitar Orçamento
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
