import { Card, CardContent } from "@/components/ui/card";
import { Award, CheckCircle, Target, Users } from "lucide-react";

export default function QuemSomos() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">Sobre a Iluminasun</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Há mais de 15 anos transformando a energia do sol em economia e sustentabilidade para nossos clientes
            </p>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Nossa História</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  A Iluminasun nasceu da visão de tornar a energia solar acessível e eficiente para todos. 
                  Fundada em 2009, começamos com uma equipe pequena mas apaixonada pela sustentabilidade 
                  e pela inovação tecnológica.
                </p>
                <p>
                  Ao longo dos anos, crescemos e nos consolidamos como referência no setor de energia 
                  solar fotovoltaica, sempre mantendo nosso compromisso com a qualidade, a transparência 
                  e a satisfação dos nossos clientes.
                </p>
                <p>
                  Hoje, com mais de 500 projetos instalados e uma equipe de especialistas certificados, 
                  continuamos nossa missão de iluminar o futuro com energia limpa e renovável.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6">
                <CardContent className="p-0 space-y-2">
                  <p className="text-4xl font-bold text-primary">500+</p>
                  <p className="text-sm text-muted-foreground">Projetos Instalados</p>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="p-0 space-y-2">
                  <p className="text-4xl font-bold text-secondary">15+</p>
                  <p className="text-sm text-muted-foreground">Anos de Experiência</p>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="p-0 space-y-2">
                  <p className="text-4xl font-bold text-primary">50+</p>
                  <p className="text-sm text-muted-foreground">Profissionais</p>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="p-0 space-y-2">
                  <p className="text-4xl font-bold text-secondary">98%</p>
                  <p className="text-sm text-muted-foreground">Satisfação</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Nossa Missão</h3>
                <p className="text-muted-foreground">
                  Democratizar o acesso à energia solar fotovoltaica, oferecendo soluções sustentáveis 
                  e econômicas que transformam a relação das pessoas com a energia elétrica.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <Award className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">Nossa Visão</h3>
                <p className="text-muted-foreground">
                  Ser reconhecida como a empresa mais confiável e inovadora em energia solar, 
                  liderando a transição energética sustentável no Brasil.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Nossos Valores</h3>
                <p className="text-muted-foreground">
                  Sustentabilidade, inovação, transparência, excelência no atendimento e 
                  compromisso com a satisfação dos nossos clientes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Nossos Diferenciais
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Equipe Técnica Especializada</h3>
                  <p className="text-muted-foreground">
                    Profissionais certificados e constantemente atualizados com as melhores práticas do mercado
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Equipamentos de Alta Qualidade</h3>
                  <p className="text-muted-foreground">
                    Trabalhamos apenas com marcas líderes mundiais, garantindo eficiência e durabilidade
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Projeto Personalizado</h3>
                  <p className="text-muted-foreground">
                    Cada instalação é única, desenvolvida especificamente para as necessidades do cliente
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Suporte Completo</h3>
                  <p className="text-muted-foreground">
                    Acompanhamento desde o projeto até a manutenção, com suporte técnico sempre disponível
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Certificações e Garantias</h3>
                  <p className="text-muted-foreground">
                    Certificações ANEEL e garantias estendidas para sua total tranquilidade
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
