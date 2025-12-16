import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";
import { ArrowRight, Check, Phone, Shield, Sun, Zap, Clock, Award, TrendingDown, Home, Building2, Factory, Calculator, Wrench, Headphones } from "lucide-react";
import { Link, useParams } from "wouter";

interface KitData {
  id: string;
  name: string;
  slug: string;
  category: string;
  consumption: string;
  power: string;
  panels: number;
  panelPower: string;
  inverter: string;
  economy: string;
  monthlyEconomy: string;
  yearlyEconomy: string;
  price: string;
  priceFrom: string;
  payback: string;
  area: string;
  co2: string;
  icon: React.ReactNode;
  description: string;
  idealFor: string[];
  features: string[];
  technicalSpecs: { label: string; value: string }[];
  benefits: { icon: React.ReactNode; title: string; description: string }[];
}

const kitsData: Record<string, KitData> = {
  "residencial-basico": {
    id: "1",
    name: "Kit Residencial Básico",
    slug: "residencial-basico",
    category: "Residencial",
    consumption: "Até 200 kWh/mês",
    power: "2,2 kWp",
    panels: 4,
    panelPower: "550W",
    inverter: "Inversor String 2kW",
    economy: "Até 95%",
    monthlyEconomy: "R$ 180",
    yearlyEconomy: "R$ 2.160",
    price: "R$ 12.900",
    priceFrom: "R$ 429/mês",
    payback: "4-5 anos",
    area: "8 m²",
    co2: "1,2 ton/ano",
    icon: <Home className="h-12 w-12" />,
    description: "O Kit Residencial Básico é a solução perfeita para famílias pequenas ou apartamentos com consumo moderado de energia. Com 4 painéis solares de alta eficiência, você pode reduzir drasticamente sua conta de luz e começar a economizar desde o primeiro mês.",
    idealFor: [
      "Apartamentos pequenos",
      "Casas com 1-2 moradores",
      "Consumo até 200 kWh/mês",
      "Quem busca economia inicial",
    ],
    features: [
      "4 painéis solares monocristalinos de 550W",
      "Inversor string 2kW com Wi-Fi integrado",
      "Estrutura de fixação em alumínio",
      "Cabeamento e conectores MC4",
      "String box com proteções",
      "Instalação completa inclusa",
      "Projeto elétrico e homologação",
      "Garantia de 25 anos nos painéis",
      "Garantia de 10 anos no inversor",
      "Monitoramento em tempo real via app",
    ],
    technicalSpecs: [
      { label: "Potência Total", value: "2,2 kWp" },
      { label: "Geração Média Mensal", value: "220-280 kWh" },
      { label: "Área Necessária", value: "8 m²" },
      { label: "Peso Total", value: "~100 kg" },
      { label: "Tensão de Saída", value: "220V Monofásico" },
      { label: "Eficiência dos Painéis", value: "21,5%" },
    ],
    benefits: [
      { icon: <TrendingDown className="h-6 w-6" />, title: "Economia Imediata", description: "Reduza até 95% da sua conta de luz desde o primeiro mês" },
      { icon: <Shield className="h-6 w-6" />, title: "Garantia Estendida", description: "25 anos de garantia nos painéis e 10 anos no inversor" },
      { icon: <Sun className="h-6 w-6" />, title: "Energia Limpa", description: "Reduza 1,2 toneladas de CO2 por ano" },
      { icon: <Calculator className="h-6 w-6" />, title: "Retorno Rápido", description: "Payback em apenas 4-5 anos" },
    ],
  },
  "residencial-medio": {
    id: "2",
    name: "Kit Residencial Médio",
    slug: "residencial-medio",
    category: "Residencial",
    consumption: "Até 400 kWh/mês",
    power: "4,4 kWp",
    panels: 8,
    panelPower: "550W",
    inverter: "Inversor String 5kW",
    economy: "Até 95%",
    monthlyEconomy: "R$ 360",
    yearlyEconomy: "R$ 4.320",
    price: "R$ 21.900",
    priceFrom: "R$ 729/mês",
    payback: "4-5 anos",
    area: "16 m²",
    co2: "2,4 ton/ano",
    icon: <Home className="h-12 w-12" />,
    description: "O Kit Residencial Médio é nossa solução mais vendida, ideal para famílias de 3-4 pessoas. Com 8 painéis solares de última geração, oferece o equilíbrio perfeito entre investimento e economia, atendendo a maioria das residências brasileiras.",
    idealFor: [
      "Casas com 3-4 moradores",
      "Residências com ar-condicionado",
      "Consumo até 400 kWh/mês",
      "Famílias que buscam independência energética",
    ],
    features: [
      "8 painéis solares monocristalinos de 550W",
      "Inversor string 5kW com Wi-Fi integrado",
      "Estrutura de fixação premium em alumínio",
      "Cabeamento e conectores MC4 certificados",
      "String box com proteções DPS",
      "Instalação completa inclusa",
      "Projeto elétrico e homologação",
      "Garantia de 25 anos nos painéis",
      "Garantia de 12 anos no inversor",
      "Monitoramento avançado via app",
    ],
    technicalSpecs: [
      { label: "Potência Total", value: "4,4 kWp" },
      { label: "Geração Média Mensal", value: "440-560 kWh" },
      { label: "Área Necessária", value: "16 m²" },
      { label: "Peso Total", value: "~200 kg" },
      { label: "Tensão de Saída", value: "220V Mono/Bifásico" },
      { label: "Eficiência dos Painéis", value: "21,5%" },
    ],
    benefits: [
      { icon: <TrendingDown className="h-6 w-6" />, title: "Maior Economia", description: "Economize até R$ 360 por mês na conta de luz" },
      { icon: <Award className="h-6 w-6" />, title: "Mais Vendido", description: "Solução preferida por milhares de famílias" },
      { icon: <Sun className="h-6 w-6" />, title: "Sustentabilidade", description: "Reduza 2,4 toneladas de CO2 por ano" },
      { icon: <Calculator className="h-6 w-6" />, title: "Excelente Custo-Benefício", description: "Melhor relação investimento x retorno" },
    ],
  },
  "residencial-premium": {
    id: "3",
    name: "Kit Residencial Premium",
    slug: "residencial-premium",
    category: "Residencial",
    consumption: "Até 600 kWh/mês",
    power: "6,6 kWp",
    panels: 12,
    panelPower: "550W",
    inverter: "Inversor Híbrido 6kW",
    economy: "Até 95%",
    monthlyEconomy: "R$ 540",
    yearlyEconomy: "R$ 6.480",
    price: "R$ 32.900",
    priceFrom: "R$ 1.096/mês",
    payback: "4-5 anos",
    area: "24 m²",
    co2: "3,6 ton/ano",
    icon: <Sun className="h-12 w-12" />,
    description: "O Kit Residencial Premium é a escolha ideal para residências de alto consumo ou famílias que desejam máxima independência energética. Com inversor híbrido, está preparado para futura integração com baterias.",
    idealFor: [
      "Casas grandes com 4+ moradores",
      "Residências com piscina",
      "Alto consumo de ar-condicionado",
      "Quem planeja adicionar baterias",
    ],
    features: [
      "12 painéis solares monocristalinos de 550W",
      "Inversor híbrido 6kW (preparado para baterias)",
      "Estrutura de fixação premium reforçada",
      "Cabeamento e conectores MC4 premium",
      "Quadro de proteções completo",
      "Instalação completa inclusa",
      "Projeto elétrico e homologação",
      "Garantia de 25 anos nos painéis",
      "Garantia de 12 anos no inversor",
      "Monitoramento avançado com relatórios",
    ],
    technicalSpecs: [
      { label: "Potência Total", value: "6,6 kWp" },
      { label: "Geração Média Mensal", value: "660-840 kWh" },
      { label: "Área Necessária", value: "24 m²" },
      { label: "Peso Total", value: "~300 kg" },
      { label: "Tensão de Saída", value: "220V Bifásico" },
      { label: "Eficiência dos Painéis", value: "21,5%" },
    ],
    benefits: [
      { icon: <Zap className="h-6 w-6" />, title: "Máxima Potência", description: "Atenda todo o consumo da sua residência" },
      { icon: <Shield className="h-6 w-6" />, title: "Futuro-Ready", description: "Preparado para integração com baterias" },
      { icon: <Sun className="h-6 w-6" />, title: "Impacto Ambiental", description: "Reduza 3,6 toneladas de CO2 por ano" },
      { icon: <Calculator className="h-6 w-6" />, title: "Alto Retorno", description: "Economize mais de R$ 6.400 por ano" },
    ],
  },
  "comercial": {
    id: "4",
    name: "Kit Comercial",
    slug: "comercial",
    category: "Comercial",
    consumption: "Até 1000 kWh/mês",
    power: "11 kWp",
    panels: 20,
    panelPower: "550W",
    inverter: "Inversor Trifásico 10kW",
    economy: "Até 95%",
    monthlyEconomy: "R$ 900",
    yearlyEconomy: "R$ 10.800",
    price: "R$ 52.900",
    priceFrom: "R$ 1.763/mês",
    payback: "3-4 anos",
    area: "40 m²",
    co2: "6 ton/ano",
    icon: <Building2 className="h-12 w-12" />,
    description: "O Kit Comercial foi desenvolvido para pequenas e médias empresas que desejam reduzir custos operacionais e aumentar sua competitividade. Com sistema trifásico robusto, atende às demandas de comércios, escritórios e pequenas indústrias.",
    idealFor: [
      "Lojas e comércios",
      "Escritórios e consultórios",
      "Restaurantes e bares",
      "Pequenas indústrias",
    ],
    features: [
      "20 painéis solares monocristalinos de 550W",
      "Inversor trifásico 10kW industrial",
      "Estrutura comercial reforçada",
      "Cabeamento industrial certificado",
      "Quadro de proteções comercial",
      "Projeto elétrico completo",
      "Homologação junto à concessionária",
      "Garantia de 25 anos nos painéis",
      "Garantia de 10 anos no inversor",
      "Monitoramento empresarial com alertas",
    ],
    technicalSpecs: [
      { label: "Potência Total", value: "11 kWp" },
      { label: "Geração Média Mensal", value: "1.100-1.400 kWh" },
      { label: "Área Necessária", value: "40 m²" },
      { label: "Peso Total", value: "~500 kg" },
      { label: "Tensão de Saída", value: "380V Trifásico" },
      { label: "Eficiência dos Painéis", value: "21,5%" },
    ],
    benefits: [
      { icon: <TrendingDown className="h-6 w-6" />, title: "Reduza Custos", description: "Economize mais de R$ 10.000 por ano" },
      { icon: <Award className="h-6 w-6" />, title: "Competitividade", description: "Reduza custos fixos e aumente margens" },
      { icon: <Sun className="h-6 w-6" />, title: "Imagem Verde", description: "Valorize sua marca com sustentabilidade" },
      { icon: <Calculator className="h-6 w-6" />, title: "Payback Rápido", description: "Retorno do investimento em 3-4 anos" },
    ],
  },
  "industrial": {
    id: "5",
    name: "Kit Industrial",
    slug: "industrial",
    category: "Industrial",
    consumption: "Acima de 2000 kWh/mês",
    power: "22 kWp+",
    panels: 40,
    panelPower: "550W",
    inverter: "Inversores Industriais",
    economy: "Até 95%",
    monthlyEconomy: "R$ 1.800+",
    yearlyEconomy: "R$ 21.600+",
    price: "Sob consulta",
    priceFrom: "Financiamento especial",
    payback: "3-4 anos",
    area: "80+ m²",
    co2: "12+ ton/ano",
    icon: <Factory className="h-12 w-12" />,
    description: "O Kit Industrial é uma solução customizada para grandes consumidores de energia. Desenvolvemos projetos sob medida para indústrias, galpões, fazendas e grandes estabelecimentos comerciais, maximizando a economia e o retorno sobre investimento.",
    idealFor: [
      "Indústrias e fábricas",
      "Galpões logísticos",
      "Agronegócio e fazendas",
      "Grandes redes comerciais",
    ],
    features: [
      "40+ painéis solares de alta potência",
      "Inversores industriais de última geração",
      "Estrutura para grandes áreas",
      "Projeto personalizado completo",
      "Estudo de viabilidade detalhado",
      "Engenharia e ART",
      "Homologação completa",
      "Garantia de 25 anos nos painéis",
      "Contrato de manutenção",
      "Suporte técnico dedicado 24/7",
    ],
    technicalSpecs: [
      { label: "Potência Total", value: "22 kWp+" },
      { label: "Geração Média Mensal", value: "2.200+ kWh" },
      { label: "Área Necessária", value: "80+ m²" },
      { label: "Configuração", value: "Personalizada" },
      { label: "Tensão de Saída", value: "380V/440V Trifásico" },
      { label: "Eficiência dos Painéis", value: "21,5%" },
    ],
    benefits: [
      { icon: <TrendingDown className="h-6 w-6" />, title: "Economia Massiva", description: "Reduza drasticamente os custos de energia" },
      { icon: <Wrench className="h-6 w-6" />, title: "Projeto Customizado", description: "Solução sob medida para sua demanda" },
      { icon: <Headphones className="h-6 w-6" />, title: "Suporte Dedicado", description: "Equipe técnica exclusiva para sua empresa" },
      { icon: <Shield className="h-6 w-6" />, title: "Financiamento BNDES", description: "Linhas especiais para grandes projetos" },
    ],
  },
};

export default function KitSolarDetail() {
  const params = useParams<{ slug: string }>();
  const kit = kitsData[params.slug || ""];

  if (!kit) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Kit não encontrado</h1>
        <Link href="/kit-solar">
          <Button>Ver todos os kits</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <SEO
        title={`${kit.name} | Iluminasun - Energia Solar`}
        description={`${kit.name} - ${kit.consumption}. ${kit.description.slice(0, 150)}...`}
        keywords={`${kit.name.toLowerCase()}, kit energia solar, ${kit.category.toLowerCase()}, painéis solares, ${kit.power}`}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                  {kit.category}
                </span>
                {kit.slug === "residencial-medio" && (
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    Mais Vendido
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">{kit.name}</h1>
              <p className="text-lg text-muted-foreground">{kit.description}</p>
              
              <div className="flex flex-wrap gap-6 py-4">
                <div>
                  <p className="text-sm text-muted-foreground">Consumo</p>
                  <p className="text-xl font-bold">{kit.consumption}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Economia Mensal</p>
                  <p className="text-xl font-bold text-secondary">{kit.monthlyEconomy}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payback</p>
                  <p className="text-xl font-bold">{kit.payback}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contato">
                  <Button size="lg" className="text-base font-semibold w-full sm:w-auto">
                    Solicitar Orçamento
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="https://wa.me/5521966084093?text=Olá! Tenho interesse no ${kit.name}. Gostaria de mais informações." target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="text-base font-semibold w-full sm:w-auto">
                    <Phone className="mr-2 h-5 w-5" />
                    Falar pelo WhatsApp
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative">
              <Card className="border-2 border-primary/20">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-6 text-primary">
                    {kit.icon}
                  </div>
                  <div className="text-center space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Investimento</p>
                      <p className="text-4xl font-bold text-primary">{kit.price}</p>
                      <p className="text-sm text-muted-foreground">
                        ou a partir de <span className="font-semibold">{kit.priceFrom}</span>
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-4 border-y">
                      <div>
                        <p className="text-2xl font-bold text-secondary">{kit.panels}</p>
                        <p className="text-xs text-muted-foreground">Painéis Solares</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-secondary">{kit.power}</p>
                        <p className="text-xs text-muted-foreground">Potência</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-secondary">{kit.economy}</p>
                        <p className="text-xs text-muted-foreground">Economia</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-secondary">{kit.yearlyEconomy}</p>
                        <p className="text-xs text-muted-foreground">Economia/Ano</p>
                      </div>
                    </div>
                    <Link href="/simulador">
                      <Button variant="outline" className="w-full">
                        <Calculator className="mr-2 h-4 w-4" />
                        Simular Minha Economia
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Benefícios do {kit.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kit.benefits.map((benefit, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* O que está incluso */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">O Que Está Incluso</h2>
              <p className="text-muted-foreground mb-8">
                Nosso kit inclui tudo o que você precisa para começar a gerar sua própria energia, 
                desde os equipamentos até a instalação completa e homologação junto à concessionária.
              </p>
              <ul className="space-y-3">
                {kit.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Especificações Técnicas</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {kit.technicalSpecs.map((spec, index) => (
                      <div key={index} className="flex justify-between py-2 border-b last:border-0">
                        <span className="text-muted-foreground">{spec.label}</span>
                        <span className="font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <h3 className="font-semibold mb-4">Ideal Para:</h3>
                <ul className="space-y-2">
                  {kit.idealFor.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Orçamento", description: "Solicite um orçamento gratuito e receba uma proposta personalizada" },
              { step: "2", title: "Projeto", description: "Nossa equipe desenvolve o projeto técnico e cuida da documentação" },
              { step: "3", title: "Instalação", description: "Instalação profissional em poucos dias por técnicos certificados" },
              { step: "4", title: "Economia", description: "Comece a economizar na conta de luz desde o primeiro mês" },
            ].map((item, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mx-auto">
                  {item.step}
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Pronto para Economizar com o {kit.name}?
            </h2>
            <p className="text-lg text-muted-foreground">
              Entre em contato agora e receba um orçamento personalizado sem compromisso
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato">
                <Button size="lg" className="text-base font-semibold w-full sm:w-auto">
                  Solicitar Orçamento Gratuito
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="https://wa.me/5521966084093" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="text-base font-semibold w-full sm:w-auto">
                  <Phone className="mr-2 h-5 w-5" />
                  (21) 96608-4093
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Outros Kits */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">Outros Kits</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {Object.values(kitsData)
              .filter((k) => k.slug !== kit.slug)
              .map((k) => (
                <Link key={k.id} href={`/kit-solar/${k.slug}`}>
                  <Button variant="outline">{k.name}</Button>
                </Link>
              ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/kit-solar">
              <Button variant="link" className="text-primary">
                Ver todos os kits
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
