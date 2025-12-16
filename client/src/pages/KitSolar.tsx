import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";
import { ArrowRight, Check, Sun, Home, Building2, Factory } from "lucide-react";
import { Link } from "wouter";
import type { ReactNode } from "react";

interface Kit {
  id: string;
  name: string;
  slug: string;
  category: string;
  consumption: string;
  power: string;
  panels: number;
  economy: string;
  monthlyEconomy: string;
  price: string;
  priceFrom: string;
  icon: ReactNode;
  popular?: boolean;
  features: string[];
}

const kits: Kit[] = [
  {
    id: "1",
    name: "Kit Residencial Básico",
    slug: "residencial-basico",
    category: "Residencial",
    consumption: "Até 200 kWh/mês",
    power: "2,2 kWp",
    panels: 4,
    economy: "Até 95%",
    monthlyEconomy: "R$ 180/mês",
    price: "R$ 12.900",
    priceFrom: "R$ 429/mês",
    icon: <Home className="h-8 w-8" />,
    features: [
      "4 painéis solares de 550W",
      "Inversor string 2kW",
      "Estrutura de fixação",
      "Instalação inclusa",
      "Garantia de 25 anos nos painéis",
      "Monitoramento via app",
    ],
  },
  {
    id: "2",
    name: "Kit Residencial Médio",
    slug: "residencial-medio",
    category: "Residencial",
    consumption: "Até 400 kWh/mês",
    power: "4,4 kWp",
    panels: 8,
    economy: "Até 95%",
    monthlyEconomy: "R$ 360/mês",
    price: "R$ 21.900",
    priceFrom: "R$ 729/mês",
    icon: <Home className="h-8 w-8" />,
    popular: true,
    features: [
      "8 painéis solares de 550W",
      "Inversor string 5kW",
      "Estrutura de fixação premium",
      "Instalação inclusa",
      "Garantia de 25 anos nos painéis",
      "Monitoramento via app",
    ],
  },
  {
    id: "3",
    name: "Kit Residencial Premium",
    slug: "residencial-premium",
    category: "Residencial",
    consumption: "Até 600 kWh/mês",
    power: "6,6 kWp",
    panels: 12,
    economy: "Até 95%",
    monthlyEconomy: "R$ 540/mês",
    price: "R$ 32.900",
    priceFrom: "R$ 1.096/mês",
    icon: <Sun className="h-8 w-8" />,
    features: [
      "12 painéis solares de 550W",
      "Inversor híbrido 6kW",
      "Estrutura de fixação premium",
      "Instalação inclusa",
      "Garantia de 25 anos nos painéis",
      "Monitoramento avançado",
    ],
  },
  {
    id: "4",
    name: "Kit Comercial",
    slug: "comercial",
    category: "Comercial",
    consumption: "Até 1000 kWh/mês",
    power: "11 kWp",
    panels: 20,
    economy: "Até 95%",
    monthlyEconomy: "R$ 900/mês",
    price: "R$ 52.900",
    priceFrom: "R$ 1.763/mês",
    icon: <Building2 className="h-8 w-8" />,
    features: [
      "20 painéis solares de 550W",
      "Inversor trifásico 10kW",
      "Estrutura comercial reforçada",
      "Projeto elétrico completo",
      "Garantia de 25 anos nos painéis",
      "Monitoramento empresarial",
    ],
  },
  {
    id: "5",
    name: "Kit Industrial",
    slug: "industrial",
    category: "Industrial",
    consumption: "Acima de 2000 kWh/mês",
    power: "22 kWp+",
    panels: 40,
    economy: "Até 95%",
    monthlyEconomy: "R$ 1.800+/mês",
    price: "Sob consulta",
    priceFrom: "Financiamento especial",
    icon: <Factory className="h-8 w-8" />,
    features: [
      "40+ painéis solares de 550W",
      "Inversores industriais",
      "Estrutura para grandes áreas",
      "Projeto personalizado",
      "Garantia de 25 anos nos painéis",
      "Suporte técnico dedicado",
    ],
  },
];

export default function KitSolar() {
  return (
    <div className="flex flex-col">
      <SEO
        title="Kits de Energia Solar | Iluminasun - Soluções Completas"
        description="Conheça nossos kits de energia solar para residências, comércios e indústrias. Economia de até 95% na conta de luz. Financiamento facilitado e instalação inclusa."
        keywords="kit energia solar, kit fotovoltaico, painéis solares, kit solar residencial, kit solar comercial, kit solar industrial"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
              Kits Completos com Instalação
            </span>
            <h1 className="text-4xl md:text-5xl font-bold">Kits de Energia Solar</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Soluções completas para residências, comércios e indústrias. Economize
              até 95% na sua conta de luz com nossos kits fotovoltaicos.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-5 w-5 text-secondary" />
                <span>Instalação Inclusa</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-5 w-5 text-secondary" />
                <span>Garantia de 25 Anos</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-5 w-5 text-secondary" />
                <span>Financiamento Facilitado</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kits Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kits.map((kit) => (
              <Card
                key={kit.id}
                className={`relative border-2 hover:border-primary transition-all duration-300 hover:shadow-lg ${
                  kit.popular ? "border-primary shadow-lg" : ""
                }`}
              >
                {kit.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      MAIS VENDIDO
                    </span>
                  </div>
                )}
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {kit.icon}
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary/10 text-secondary">
                      {kit.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">{kit.name}</h3>
                    <p className="text-sm text-muted-foreground">{kit.consumption}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y">
                    <div>
                      <p className="text-xs text-muted-foreground">Potência</p>
                      <p className="font-semibold">{kit.power}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Painéis</p>
                      <p className="font-semibold">{kit.panels} unidades</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Economia</p>
                      <p className="font-semibold text-secondary">{kit.economy}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Economia/mês</p>
                      <p className="font-semibold text-secondary">{kit.monthlyEconomy}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">{kit.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      ou a partir de <span className="font-semibold">{kit.priceFrom}</span>
                    </p>
                  </div>

                  <ul className="space-y-2 text-sm">
                    {kit.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-2 pt-2">
                    <Link href={`/kit-solar/${kit.slug}`}>
                      <Button className="w-full font-semibold">
                        Ver Detalhes
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/simulador">
                      <Button variant="outline" className="w-full">
                        Simular Economia
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparativo */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Compare os Kits</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Escolha o kit ideal para o seu consumo de energia
            </p>
          </div>

          {/* Wrapper responsivo: evita corte e cria scroll horizontal no mobile */}
          <div className="w-full -mx-4 px-4 md:mx-0 md:px-0">
            <div className="w-full overflow-x-auto rounded-lg border bg-background shadow-lg">
              <table className="min-w-[920px] w-full border-collapse">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="p-3 md:p-4 text-left whitespace-nowrap">Kit</th>
                    <th className="p-3 md:p-4 text-center whitespace-nowrap">Consumo</th>
                    <th className="p-3 md:p-4 text-center whitespace-nowrap">Potência</th>
                    <th className="p-3 md:p-4 text-center whitespace-nowrap">Painéis</th>
                    <th className="p-3 md:p-4 text-center whitespace-nowrap">Economia/mês</th>
                    <th className="p-3 md:p-4 text-center whitespace-nowrap">Investimento</th>
                    <th className="p-3 md:p-4 text-center whitespace-nowrap"></th>
                  </tr>
                </thead>
                <tbody>
                  {kits.map((kit, index) => (
                    <tr
                      key={kit.id}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-muted/20" : ""
                      } hover:bg-muted/40 transition-colors`}
                    >
                      <td className="p-3 md:p-4 font-semibold whitespace-nowrap">
                        {kit.name}
                      </td>
                      <td className="p-3 md:p-4 text-center text-sm whitespace-nowrap">
                        {kit.consumption}
                      </td>
                      <td className="p-3 md:p-4 text-center whitespace-nowrap">
                        {kit.power}
                      </td>
                      <td className="p-3 md:p-4 text-center whitespace-nowrap">
                        {kit.panels}
                      </td>
                      <td className="p-3 md:p-4 text-center text-secondary font-semibold whitespace-nowrap">
                        {kit.monthlyEconomy}
                      </td>
                      <td className="p-3 md:p-4 text-center font-semibold whitespace-nowrap">
                        {kit.price}
                      </td>
                      <td className="p-3 md:p-4 text-center whitespace-nowrap">
                        <Link href={`/kit-solar/${kit.slug}`}>
                          <Button size="sm">Ver</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* (Opcional) dica visual no mobile — se não quiser, pode remover */}
          <p className="mt-3 text-center text-xs text-muted-foreground md:hidden">
            Arraste a tabela para o lado para ver todas as colunas.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Não Encontrou o Kit Ideal?</h2>
            <p className="text-lg text-muted-foreground">
              Nossa equipe pode criar um projeto personalizado para atender exatamente
              às suas necessidades de consumo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato">
                <Button size="lg" className="text-base font-semibold w-full sm:w-auto">
                  Solicitar Projeto Personalizado
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/simulador">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base font-semibold w-full sm:w-auto"
                >
                  Simular Minha Economia
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
