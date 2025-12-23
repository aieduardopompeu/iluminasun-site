// client/src/pages/cidades/Cidades.tsx
import React from "react";
import { Link } from "wouter";
import SEO from "../../components/SEO";

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
      />

      <main className="min-h-screen bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-16">
          <header className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Cidades atendidas (RJ)
            </h1>
            <p className="mt-2 text-slate-600">
              Atendemos:{" "}
              <span className="font-semibold text-slate-800">
                {CITIES.map((c) => c.name).join(", ")}.
              </span>
            </p>
          </header>

          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CITIES.map((c) => (
              <div
                key={c.slug}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-lg font-extrabold text-slate-900">
                  Energia Solar em {c.name}
                </h2>
                <p className="mt-2 text-sm text-slate-600">{c.desc}</p>

                <div className="mt-4">
                  <Link
                    href={`/cidades/${c.slug}`}
                    className="text-sm font-semibold text-blue-700 hover:text-blue-800"
                  >
                    Ver página →
                  </Link>
                </div>
              </div>
            ))}
          </section>

          <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-extrabold text-slate-900">Próximo passo</h3>
            <p className="mt-2 text-slate-600">
              Use o simulador e fale no WhatsApp para um orçamento com base no seu consumo.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/simulador"
                className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Simular agora
              </Link>

              <a
                href="https://wa.me/5521966084093"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                Falar com a Ilumina Sun
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
