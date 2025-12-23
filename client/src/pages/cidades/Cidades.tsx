// client/src/pages/cidades/Cidades.tsx
import React from "react";
import { Link } from "wouter";
import SEO from "../../components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MapPin } from "lucide-react";

const CITIES = [
  { name: "Niterói", slug: "niteroi", desc: "Orçamento e simulação de economia para Niterói, RJ." },
  { name: "São Gonçalo", slug: "sao-goncalo", desc: "Orçamento e simulação de economia para São Gonçalo, RJ." },
  { name: "Rio de Janeiro", slug: "rio-de-janeiro", desc: "Orçamento e simulação de economia para Rio de Janeiro, RJ." },
  { name: "Itaboraí", slug: "itaborai", desc: "Orçamento e simulação de economia para Itaboraí, RJ." },
  { name: "Rio Bonito", slug: "rio-bonito", desc: "Orçamento e simulação de economia para Rio Bonito, RJ." },
  { name: "Tanguá", slug: "tangua", desc: "Orçamento e simulação de economia para Tanguá, RJ." },
  { name: "Maricá", slug: "marica", desc: "Orçamento e simulação de economia para Maricá, RJ." },
];

const CANONICAL = "https://www.iluminasun.com.br/cidades";

export default function Cidades() {
  return (
    <>
      <SEO
        title="Cidades atendidas (RJ) | Ilumina Sun"
        description="Confira as cidades do RJ atendidas pela Ilumina Sun e acesse páginas locais com simulação de economia e pedido de orçamento."
        canonical={CANONICAL}
        url={CANONICAL}
        keywords="energia solar RJ, energia solar Niterói, energia solar São Gonçalo, energia solar Maricá, instalação solar, placas solares"
      />

      <div className="flex flex-col">
        {/* Hero (padrão do site) */}
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Atendimento no Rio de Janeiro
              </p>

              <h1 className="text-4xl md:text-5xl font-bold">Cidades atendidas (RJ)</h1>

              <p className="text-lg md:text-xl text-muted-foreground">
                Escolha sua cidade para ver detalhes, simular economia e pedir orçamento com base no seu consumo.
              </p>

              {/* CTA topo */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <Link href="/simulador">
                  <Button size="lg" className="text-base font-semibold w-full sm:w-auto">
                    Simular Economia
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

              <p className="text-sm text-muted-foreground">
                Atendemos:{" "}
                <span className="font-semibold text-foreground">
                  {CITIES.map((c) => c.name).join(", ")}.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Lista (Cards) */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CITIES.map((c) => (
                <Card key={c.slug} className="border-2 hover:border-primary transition-colors">
                  <CardContent className="p-6 space-y-3">
                    <h2 className="text-xl font-semibold">Energia Solar em {c.name}</h2>
                    <p className="text-sm text-muted-foreground">{c.desc}</p>

                    <div className="pt-2">
                      <Link href={`/cidades/${c.slug}`}>
                        <Button variant="outline" size="sm" className="font-semibold">
                          Ver página
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA meio (padrão) */}
            <div className="mt-12">
              <Card className="border-2">
                <CardContent className="p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-bold">Próximo passo</h3>
                    <p className="text-muted-foreground">
                      Faça uma simulação gratuita e receba orientação para dimensionar seu sistema com base no seu consumo.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <Link href="/simulador">
                      <Button size="lg" className="text-base font-semibold w-full sm:w-auto">
                        Simular agora
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>

                    <Link href="/contato">
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-base font-semibold w-full sm:w-auto"
                      >
                        Falar com a Ilumina Sun
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
