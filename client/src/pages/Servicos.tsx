import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Building2, Factory, Home, Tractor } from "lucide-react";
import { Link } from "wouter";

export default function Servicos() {
  const servicos = [
    {
      icon: Home,
      title: "Energia Solar Residencial",
      description: "Soluções completas para sua casa, com economia de até 95% na conta de luz",
      features: [
        "Projeto personalizado para seu consumo",
        "Instalação rápida e segura",
        "Monitoramento em tempo real",
        "Garantia de até 25 anos",
      ],
      color: "primary",
    },
    {
      icon: Building2,
      title: "Energia Solar Comercial",
      description: "Reduza custos operacionais e aumente a competitividade do seu negócio",
      features: [
        "Análise de viabilidade econômica",
        "Sistemas de alta eficiência",
        "Suporte técnico especializado",
        "ROI em até 5 anos",
      ],
      color: "secondary",
    },
    {
      icon: Factory,
      title: "Energia Solar Industrial",
      description: "Grandes sistemas para indústrias com alto consumo energético",
      features: [
        "Projetos de grande porte",
        "Redução significativa de custos",
        "Sustentabilidade corporativa",
        "Financiamento facilitado",
      ],
      color: "primary",
    },
    {
      icon: Tractor,
      title: "Energia Solar Rural",
      description: "Soluções para propriedades rurais, agronegócio e irrigação",
      features: [
        "Sistemas off-grid e on-grid",
        "Bombeamento solar",
        "Autonomia energética",
        "Incentivos e linhas de crédito",
      ],
      color: "secondary",
    },
  ];

  const processo = [
    {
      numero: "01",
      titulo: "Consulta Inicial",
      descricao: "Análise do seu consumo e necessidades energéticas",
    },
    {
      numero: "02",
      titulo: "Projeto Personalizado",
      descricao: "Desenvolvimento do projeto técnico e proposta comercial",
    },
    {
      numero: "03",
      titulo: "Aprovação e Documentação",
      descricao: "Regularização junto à concessionária e órgãos competentes",
    },
    {
      numero: "04",
      titulo: "Instalação",
      descricao: "Execução profissional com equipamentos de alta qualidade",
    },
    {
      numero: "05",
      titulo: "Ativação e Monitoramento",
      descricao: "Conexão à rede e acompanhamento da geração de energia",
    },
    {
      numero: "06",
      titulo: "Suporte Contínuo",
      descricao: "Manutenção preventiva e suporte técnico permanente",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">Nossos Serviços</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Soluções completas em energia solar fotovoltaica para todos os tipos de necessidade
            </p>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicos.map((servico, index) => {
              const Icon = servico.icon;
              return (
                <Card key={index} className="border-2 hover:border-primary transition-colors">
                  <CardContent className="p-8 space-y-6">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-lg bg-${servico.color}/10`}>
                      <Icon className={`h-8 w-8 text-${servico.color}`} />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-semibold">{servico.title}</h3>
                      <p className="text-muted-foreground">{servico.description}</p>
                    </div>
                    <ul className="space-y-2">
                      {servico.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ArrowRight className={`h-5 w-5 text-${servico.color} flex-shrink-0 mt-0.5`} />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Como Funciona</h2>
            <p className="text-lg text-muted-foreground">
              Processo completo e transparente, do projeto à instalação
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processo.map((etapa, index) => (
              <Card key={index}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                      {etapa.numero}
                    </div>
                    <h3 className="text-lg font-semibold">{etapa.titulo}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{etapa.descricao}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Pronto para Começar?
            </h2>
            <p className="text-lg text-muted-foreground">
              Entre em contato e receba uma proposta personalizada para suas necessidades
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/simulador">
                <Button size="lg" className="text-base font-semibold w-full sm:w-auto">
                  Simular Economia
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
