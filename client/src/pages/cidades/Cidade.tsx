// client/src/pages/cidades/Cidade.tsx
import React from "react";
import { Link } from "wouter";
import SEO from "../../components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MapPin } from "lucide-react";

type CityDetail = {
  name: string;
  slug: string;
};

const CITIES: CityDetail[] = [
  { name: "Niterói", slug: "niteroi" },
  { name: "São Gonçalo", slug: "sao-goncalo" },
  { name: "Rio de Janeiro", slug: "rio-de-janeiro" },
  { name: "Itaboraí", slug: "itaborai" },
  { name: "Rio Bonito", slug: "rio-bonito" },
  { name: "Tanguá", slug: "tangua" },
  { name: "Maricá", slug: "marica" },
];

function normalizeSlug(input: string) {
  return decodeURIComponent(input || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

function findCity(slug: string) {
  const s = normalizeSlug(slug);
  return CITIES.find((c) => normalizeSlug(c.slug) === s) || null;
}

function titleFor(cityName: string) {
  return `Energia Solar em ${cityName} (RJ) | Ilumina Sun`;
}

function descFor(cityName: string) {
  return `Energia solar em ${cityName}, RJ: simule economia na conta de luz e peça orçamento com a Ilumina Sun. Atendimento em ${cityName} e região.`;
}

// OG image deve existir no domínio para evitar 404 em crawlers.
const OG_IMAGE = "https://www.iluminasun.com.br/logo.png";
const WHATSAPP = "https://wa.me/5521966084093";

type Props = {
  params?: {
    slug?: string;
  };
};

export default function Cidade(props: Props) {
  const rawSlug = props?.params?.slug || "";
  const city = findCity(rawSlug);

  if (!city) {
    return (
      <div className="flex flex-col">
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16 md:py-24">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold">Cidade não encontrada</h1>
              <p className="text-muted-foreground">
                Verifique o endereço ou volte para a lista de cidades atendidas.
              </p>
              <div className="pt-2">
                <Link href="/cidades">
                  <Button size="lg" className="font-semibold">
                    Voltar para Cidades
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const canonical = `https://www.iluminasun.com.br/cidades/${city.slug}`;

  const faqItems = [
    {
      question: `A Ilumina Sun atende ${city.name}?`,
      answer: `Sim. Atendemos ${city.name} e outras cidades do RJ (veja em /cidades).`,
    },
    {
      question: "Como pedir orçamento?",
      answer:
        "O caminho mais rápido é simular e enviar seu consumo pelo WhatsApp. Se preferir, fale pela página de contato.",
    },
    {
      question: "Quanto posso economizar com energia solar?",
      answer:
        "A economia depende do consumo, perfil de uso, telhado, sombreamento e dimensionamento do sistema. Em muitos casos, é possível reduzir grande parte do valor da conta de luz.",
    },
  ];

  return (
    <>
      <SEO
        title={titleFor(city.name)}
        description={descFor(city.name)}
        canonical={canonical}
        url={canonical}
        ogImage={OG_IMAGE}
        keywords={`energia solar ${city.name}, energia solar ${city.name} RJ, instalação de placas solares ${city.name}, energia fotovoltaica ${city.name}`}
      />

      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />

      <div className="flex flex-col">
        {/* Hero (padrão do site) */}
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16 md:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Breadcrumb */}
              <nav className="text-sm text-muted-foreground">
                <Link href="/">
                  <span className="hover:text-foreground cursor-pointer">Início</span>
                </Link>
                <span className="px-2">/</span>
                <Link href="/cidades">
                  <span className="hover:text-foreground cursor-pointer">Cidades</span>
                </Link>
                <span className="px-2">/</span>
                <span className="font-semibold text-foreground">{city.name}</span>
              </nav>

              <div className="space-y-3">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  Atendimento no RJ
                </p>

                <h1 className="text-4xl md:text-5xl font-bold">
                  Energia Solar em {city.name} (RJ)
                </h1>

                <p className="text-lg text-muted-foreground max-w-3xl">
                  Simule sua economia e peça um orçamento com base no seu consumo. Atendimento em{" "}
                  <span className="font-semibold text-foreground">{city.name}</span> e região.
                </p>
              </div>

              {/* CTA Hero */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={WHATSAPP} target="_blank" rel="noreferrer">
                  <Button size="lg" className="text-base font-semibold w-full sm:w-auto">
                    Pedir orçamento no WhatsApp
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>

                <Link href="/simulador">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base font-semibold w-full sm:w-auto"
                  >
                    Simular economia
                  </Button>
                </Link>

                <Link href="/contato">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base font-semibold w-full sm:w-auto"
                  >
                    Contato
                  </Button>
                </Link>
              </div>

              {/* Prova social (evitar números não comprováveis) */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="text-center">
                  <p className="text-sm font-semibold text-primary">Projeto sob medida</p>
                  <p className="text-sm text-muted-foreground">Dimensionamento pelo seu consumo</p>
                </div>
                <div className="h-12 w-px bg-border hidden sm:block"></div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-secondary">Equipe especializada</p>
                  <p className="text-sm text-muted-foreground">Atendimento consultivo no RJ</p>
                </div>
                <div className="h-12 w-px bg-border hidden sm:block"></div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-primary">Suporte pós-venda</p>
                  <p className="text-sm text-muted-foreground">Acompanhamento e orientações</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conteúdo */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Coluna principal */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-2">
                  <CardContent className="p-6 md:p-8 space-y-4">
                    <h2 className="text-2xl font-bold">Quanto dá para economizar?</h2>
                    <p className="text-muted-foreground">
                      A economia depende do consumo, perfil de uso, telhado, sombreamento e dimensionamento.
                      Um jeito prático é começar pela faixa da sua conta de luz:
                    </p>

                    <ul className="space-y-2 text-sm">
                      <li>• <span className="font-semibold">Até R$ 300:</span> sistema mais compacto na maioria dos casos.</li>
                      <li>• <span className="font-semibold">R$ 300 a R$ 600:</span> faixa comum em residências; costuma ter bom retorno.</li>
                      <li>• <span className="font-semibold">R$ 600 a R$ 1.000:</span> consumo médio/alto; dimensionamento faz diferença.</li>
                      <li>• <span className="font-semibold">Acima de R$ 1.000:</span> alto potencial de redução; vale simulação detalhada.</li>
                    </ul>

                    <Card className="border">
                      <CardContent className="p-5 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                        <div className="space-y-1">
                          <p className="font-semibold">Quer uma estimativa inicial?</p>
                          <p className="text-sm text-muted-foreground">
                            Use o simulador e envie o resultado no WhatsApp.
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link href="/simulador">
                            <Button className="font-semibold">Abrir simulador</Button>
                          </Link>
                          <a href={WHATSAPP} target="_blank" rel="noreferrer">
                            <Button variant="outline" className="font-semibold">
                              Enviar no WhatsApp
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6 md:p-8 space-y-4">
                    <h3 className="text-xl font-bold">Perguntas frequentes (FAQ)</h3>

                    <div className="space-y-3">
                      {faqItems.map((item) => (
                        <div key={item.question} className="rounded-xl border p-4">
                          <p className="font-semibold">{item.question}</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {item.answer.includes("/cidades") ? (
                              <>
                                Sim. Atendemos {city.name} e outras cidades do RJ (veja em{" "}
                                <Link href="/cidades">
                                  <span className="text-primary hover:underline cursor-pointer">
                                    /cidades
                                  </span>
                                </Link>
                                ).
                              </>
                            ) : (
                              item.answer
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* CTA final (padrão) */}
                <Card className="border-2">
                  <CardContent className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">Pronto para começar em {city.name}?</h3>
                      <p className="text-muted-foreground">
                        Simule agora e receba orientação para dimensionar seu sistema.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href="/simulador">
                        <Button className="font-semibold">
                          Simular economia
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href="/contato">
                        <Button variant="outline" className="font-semibold">
                          Falar com especialista
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="border-2">
                  <CardContent className="p-6 space-y-3">
                    <h3 className="text-lg font-bold">Links úteis</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link href="/servicos">
                        <span className="text-primary hover:underline cursor-pointer">Serviços</span>
                      </Link>
                      <Link href="/portfolio">
                        <span className="text-primary hover:underline cursor-pointer">Portfólio / Projetos</span>
                      </Link>
                      <Link href="/vantagens">
                        <span className="text-primary hover:underline cursor-pointer">Vantagens</span>
                      </Link>
                      <Link href="/blog">
                        <span className="text-primary hover:underline cursor-pointer">Blog</span>
                      </Link>
                      <Link href="/cidades">
                        <span className="text-primary hover:underline cursor-pointer">Ver todas as cidades</span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6 space-y-2">
                    <h3 className="text-lg font-bold">Atendimento</h3>
                    <p className="text-sm text-muted-foreground">
                      Região: <span className="font-semibold text-foreground">{city.name}</span>, RJ e entorno.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Cidades atendidas: {CITIES.map((c) => c.name).join(", ")}.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
