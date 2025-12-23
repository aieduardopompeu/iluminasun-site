// client/src/pages/cidades/Cidade.tsx
import React, { useEffect } from "react";
import { Link, useLocation } from "wouter";
import SEO from "../../components/SEO";

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

function safeDecode(input: string) {
  try {
    return decodeURIComponent(input || "");
  } catch {
    return input || "";
  }
}

function normalizeSlug(input: string) {
  return safeDecode(input)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
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

const OG_IMAGE = "https://www.iluminasun.com.br/og.jpg"; // ajuste se tiver outro
const WHATSAPP = "https://wa.me/5521966084093";

type Props = {
  params?: {
    slug?: string;
  };
};

export default function Cidade(props: Props) {
  const rawSlug = props?.params?.slug || "";
  const decodedSlug = safeDecode(rawSlug).trim();
  const city = findCity(rawSlug);

  const [, setLocation] = useLocation();

  // ✅ Canonical redirect forte:
  // se a URL não estiver exatamente igual ao slug canônico (city.slug),
  // faz replace para /cidades/{city.slug}
  useEffect(() => {
    if (!city) return;

    // Se já está canônico, não faz nada
    if (decodedSlug === city.slug) return;

    // Só redireciona se for "equivalente" (mesma cidade após normalização)
    if (normalizeSlug(decodedSlug) === normalizeSlug(city.slug)) {
      setLocation(`/cidades/${city.slug}`, { replace: true });
    }
  }, [city, decodedSlug, setLocation]);

  if (!city) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-extrabold text-slate-900">
              Cidade não encontrada
            </h1>
            <p className="mt-2 text-slate-600">
              Verifique o endereço ou volte para a lista de cidades.
            </p>
            <div className="mt-5">
              <Link
                href="/cidades"
                className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-600"
              >
                Voltar para Cidades
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const canonical = `https://www.iluminasun.com.br/cidades/${city.slug}`;

  return (
    <>
      <SEO
        title={titleFor(city.name)}
        description={descFor(city.name)}
        canonical={canonical}
        url={canonical}
        ogImage={OG_IMAGE}
      />

      <main className="min-h-screen bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-16">
          <nav className="mb-5 text-sm text-slate-500">
            <Link href="/" className="hover:text-slate-700">
              Início
            </Link>
            <span className="px-2">/</span>
            <Link href="/cidades" className="hover:text-slate-700">
              Cidades
            </Link>
            <span className="px-2">/</span>
            <span className="font-semibold text-slate-700">{city.name}</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Energia Solar em {city.name} (RJ)
            </h1>

            <p className="mt-3 max-w-3xl text-slate-600">
              Simule sua economia e peça um orçamento com base no seu consumo.
              Atendimento em{" "}
              <strong className="font-semibold text-slate-800">
                {city.name}
              </strong>{" "}
              e região.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Pedir orçamento no WhatsApp
              </a>

              <Link
                href="/simulador"
                className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Simular agora
              </Link>

              <Link
                href="/contato"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                Contato
              </Link>
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-3">
            <section className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">
                  Quanto dá para economizar?
                </h2>
                <p className="mt-2 text-slate-600">
                  A economia depende do consumo, perfil de uso, telhado,
                  sombreamento e dimensionamento. Um jeito prático é começar
                  pela faixa da sua conta de luz:
                </p>

                <ul className="mt-4 space-y-2 text-slate-700">
                  <li>
                    • <strong>Até R$ 300:</strong> sistema mais compacto na
                    maioria dos casos.
                  </li>
                  <li>
                    • <strong>R$ 300 a R$ 600:</strong> faixa comum em
                    residências; costuma ter bom retorno.
                  </li>
                  <li>
                    • <strong>R$ 600 a R$ 1.000:</strong> consumo médio/alto;
                    dimensionamento faz diferença.
                  </li>
                  <li>
                    • <strong>Acima de R$ 1.000:</strong> alto potencial de
                    redução; vale simulação detalhada.
                  </li>
                </ul>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">Links úteis</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link className="text-blue-700 hover:text-blue-800" href="/servicos">
                      Serviços
                    </Link>
                  </li>
                  <li>
                    <Link className="text-blue-700 hover:text-blue-800" href="/portfolio">
                      Portfólio / Projetos
                    </Link>
                  </li>
                  <li>
                    <Link className="text-blue-700 hover:text-blue-800" href="/vantagens">
                      Vantagens
                    </Link>
                  </li>
                  <li>
                    <Link className="text-blue-700 hover:text-blue-800" href="/blog">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">Atendimento</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Região: {city.name}, RJ e entorno.
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Cidades atendidas: {CITIES.map((c) => c.name).join(", ")}.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
