import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart3, DollarSign, Leaf, Shield, TrendingUp, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Vantagens() {
  const vantagens = [
    {
      icon: DollarSign,
      title: "Economia de até 95% na Conta de Luz",
      description: "A energia solar fotovoltaica pode reduzir sua conta de luz em até 95%, gerando economia imediata e permanente. Com o sistema instalado, você produz sua própria energia e paga apenas a taxa mínima da concessionária.",
      beneficios: [
        "Redução imediata nos custos com energia elétrica",
        "Proteção contra aumentos nas tarifas",
        "Economia garantida por mais de 25 anos",
        "Retorno do investimento em 3 a 6 anos",
      ],
    },
    {
      icon: Leaf,
      title: "100% Sustentável e Renovável",
      description: "A energia solar é completamente limpa, não emite gases poluentes e contribui diretamente para a preservação do meio ambiente. Ao optar pela energia solar, você reduz sua pegada de carbono e ajuda a combater as mudanças climáticas.",
      beneficios: [
        "Zero emissão de CO₂ e gases poluentes",
        "Fonte de energia inesgotável e renovável",
        "Contribuição para um planeta mais sustentável",
        "Certificação de energia limpa",
      ],
    },
    {
      icon: TrendingUp,
      title: "Valorização do Imóvel",
      description: "Imóveis equipados com sistemas de energia solar têm valorização média de 20% a 30% no mercado. Além da economia mensal, você aumenta o valor patrimonial do seu imóvel, tornando-o mais atrativo para venda ou locação.",
      beneficios: [
        "Valorização de 20% a 30% no valor do imóvel",
        "Diferencial competitivo no mercado imobiliário",
        "Atratividade para compradores e locatários",
        "Investimento que se paga e valoriza",
      ],
    },
    {
      icon: Zap,
      title: "Independência Energética",
      description: "Com energia solar, você produz sua própria eletricidade e fica menos dependente das concessionárias. Isso significa proteção contra apagões, bandeiras tarifárias e aumentos abusivos nas tarifas de energia.",
      beneficios: [
        "Produção própria de energia elétrica",
        "Proteção contra bandeiras tarifárias",
        "Menor dependência das concessionárias",
        "Sistema de créditos para consumo noturno",
      ],
    },
    {
      icon: Shield,
      title: "Garantia e Durabilidade",
      description: "Os painéis solares possuem garantia de fábrica de até 25 anos e vida útil que pode ultrapassar 30 anos. Os inversores têm garantia de 5 a 12 anos. É um investimento de longo prazo com retorno garantido.",
      beneficios: [
        "Garantia de até 25 anos nos painéis",
        "Vida útil superior a 30 anos",
        "Baixíssima necessidade de manutenção",
        "Tecnologia comprovada e confiável",
      ],
    },
    {
      icon: BarChart3,
      title: "Retorno do Investimento (ROI)",
      description: "O investimento em energia solar se paga entre 3 e 6 anos, dependendo do consumo e da região. Após esse período, toda a economia é lucro líquido. Em 25 anos, a economia pode ultrapassar 10 vezes o valor investido.",
      beneficios: [
        "ROI entre 3 e 6 anos em média",
        "Economia contínua por mais de 25 anos",
        "Retorno financeiro superior a outras aplicações",
        "Linhas de financiamento com juros baixos",
      ],
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">Vantagens da Energia Solar</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Descubra por que milhares de brasileiros estão investindo em energia solar fotovoltaica
            </p>
          </div>
        </div>
      </section>

      {/* Introdução */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-6 text-muted-foreground">
            <p className="text-lg">
              A energia solar fotovoltaica é uma das melhores decisões que você pode tomar para sua residência, 
              empresa ou propriedade rural. Além de gerar economia imediata na conta de luz, a energia solar 
              traz benefícios ambientais, financeiros e patrimoniais que se estendem por décadas.
            </p>
            <p className="text-lg">
              Com a crescente preocupação com sustentabilidade e os constantes aumentos nas tarifas de energia 
              elétrica, investir em um sistema fotovoltaico é garantir independência energética, economia 
              permanente e contribuir para um planeta mais limpo e sustentável.
            </p>
          </div>
        </div>
      </section>

      {/* Vantagens Detalhadas */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="space-y-12">
            {vantagens.map((vantagem, index) => {
              const Icon = vantagem.icon;
              const isEven = index % 2 === 0;
              return (
                <Card key={index} className="border-2">
                  <CardContent className="p-8 md:p-12">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-start ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className={`flex h-14 w-14 items-center justify-center rounded-lg bg-${isEven ? 'primary' : 'secondary'}/10 flex-shrink-0`}>
                            <Icon className={`h-7 w-7 text-${isEven ? 'primary' : 'secondary'}`} />
                          </div>
                          <h2 className="text-2xl md:text-3xl font-bold">{vantagem.title}</h2>
                        </div>
                        <p className="text-muted-foreground text-lg">
                          {vantagem.description}
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg">Principais Benefícios:</h3>
                        <ul className="space-y-2">
                          {vantagem.beneficios.map((beneficio, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <ArrowRight className={`h-5 w-5 text-${isEven ? 'primary' : 'secondary'} flex-shrink-0 mt-0.5`} />
                              <span className="text-muted-foreground">{beneficio}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Rápido */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Perguntas Frequentes
            </h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Quanto tempo dura um sistema de energia solar?</h3>
                  <p className="text-muted-foreground">
                    Os painéis solares têm garantia de 25 anos e vida útil que pode ultrapassar 30 anos. 
                    Os inversores têm garantia de 5 a 12 anos, dependendo do modelo.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">A energia solar funciona em dias nublados?</h3>
                  <p className="text-muted-foreground">
                    Sim! Mesmo em dias nublados, os painéis solares continuam gerando energia, embora em 
                    menor quantidade. O sistema é dimensionado considerando as condições climáticas da região.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Preciso de bateria para armazenar energia?</h3>
                  <p className="text-muted-foreground">
                    Não necessariamente. Sistemas conectados à rede (on-grid) utilizam o sistema de créditos 
                    da concessionária, onde o excedente gerado durante o dia é usado à noite. Baterias são 
                    opcionais e recomendadas apenas para locais sem acesso à rede elétrica.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Qual é o retorno do investimento?</h3>
                  <p className="text-muted-foreground">
                    O retorno do investimento (ROI) varia entre 3 e 6 anos, dependendo do consumo e da região. 
                    Após esse período, toda a economia gerada é lucro líquido por mais de 20 anos.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Comece a Economizar Hoje
            </h2>
            <p className="text-lg text-muted-foreground">
              Faça uma simulação gratuita e descubra quanto você pode economizar com energia solar
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
