// client/src/App.tsx
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ThemeProvider } from "./contexts/ThemeContext";
// no topo do App.tsx
import AdsenseChecklistPage from "./pages/internal/AdsenseChecklistPage";

const WhatsAppButton = lazy(() => import("./components/WhatsAppButton"));
const CookieBanner = lazy(() => import("./components/CookieBanner"));

// Lazy: páginas
const Home = lazy(() => import("./pages/Home"));
const QuemSomos = lazy(() => import("./pages/QuemSomos"));
const Servicos = lazy(() => import("./pages/Servicos"));
const Simulador = lazy(() => import("./pages/Simulador"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Vantagens = lazy(() => import("./pages/Vantagens"));
const Contato = lazy(() => import("./pages/Contato"));
const Blog = lazy(() => import("./pages/blog/Blog"));
const RegulamentacaoAneel = lazy(() => import("./pages/blog/posts/RegulamentacaoAneel"));
const KitSolar = lazy(() => import("./pages/KitSolar"));
const KitSolarDetail = lazy(() => import("./pages/KitSolarDetail"));
const TermosDeUso = lazy(() => import("./pages/TermosDeUso"));
const PoliticaDePrivacidade = lazy(() => import("./pages/PoliticaDePrivacidade"));
const PoliticaDeCookies = lazy(() => import("./pages/PoliticaDeCookies"));
const LGPDPage = lazy(() => import("./pages/LGPD"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Removed410 = lazy(() => import("./pages/Removed410"));

// ✅ SEO Local (Cidades)
const Cidades = lazy(() => import("./pages/cidades/Cidades"));
const Cidade = lazy(() => import("./pages/cidades/Cidade"));

// Blog posts (existentes)
const MarcoLegal14300 = lazy(() => import("./pages/blog/posts/MarcoLegal14300"));
const FinanciamentoEnergiaSolarRJ = lazy(
  () => import("./pages/blog/posts/FinanciamentoEnergiaSolarRJ")
);
const ContaDeLuzNaoZerou = lazy(() => import("./pages/blog/posts/ContaDeLuzNaoZerou"));
const ManutencaoPaineisSolares = lazy(
  () => import("./pages/blog/posts/ManutencaoPaineisSolares")
);
const EnergiaSolarEmpresas = lazy(() => import("./pages/blog/posts/EnergiaSolarEmpresas"));
const TendenciasMercadoSolar2026 = lazy(
  () => import("./pages/blog/posts/TendenciasMercadoSolar2026")
);

// ✅ Blog posts (NOVOS — adicionados)
const QuantoCustaEnergiaSolarBrasil2026 = lazy(
  () => import("./pages/blog/posts/QuantoCustaEnergiaSolarBrasil2026")
);
const MarcoLegalEnergiaSolarLei14300Explicado = lazy(
  () => import("./pages/blog/posts/MarcoLegalEnergiaSolarLei14300Explicado")
);
const KitSolarOuProjetoPersonalizadoDiferencas = lazy(
  () => import("./pages/blog/posts/KitSolarOuProjetoPersonalizadoDiferencas")
);
const PaybackEnergiaSolarEmQuantoTempoSePaga = lazy(
  () => import("./pages/blog/posts/PaybackEnergiaSolarEmQuantoTempoSePaga")
);
const VidaUtilEManutencaoPaineisSolares = lazy(
  () => import("./pages/blog/posts/VidaUtilEManutencaoPaineisSolares")
);
const ComoEscolherEmpresaEnergiaSolar = lazy(
  () => import("./pages/blog/posts/ComoEscolherEmpresaEnergiaSolar")
);
const EnergiaSolarTransformandoContasDeLuz2026 = lazy(
  () => import("./pages/blog/posts/EnergiaSolarTransformandoContasDeLuz2026")
);


declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

function pushDataLayer(event: Record<string, any>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

function RouteFallback() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-6xl items-center justify-center px-4">
      <span className="text-sm text-muted-foreground">Carregando...</span>
    </div>
  );
}

export default function App() {
  const [location] = useLocation();

  useEffect(() => {
    pushDataLayer({
      event: "page_view",
      page_path: location,
      page_title: document.title,
    });
  }, [location]);

  return (
    <ThemeProvider>
      <TooltipProvider>
        <ErrorBoundary>
          <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1">
              <Suspense fallback={<RouteFallback />}>
                <Switch>
                  <Route path="/" component={Home} />
                  <Route path="/quem-somos" component={QuemSomos} />
                  <Route path="/servicos" component={Servicos} />
                  <Route path="/portfolio" component={Portfolio} />
                  <Route path="/vantagens" component={Vantagens} />
                  <Route path="/simulador" component={Simulador} />
                  <Route path="/contato" component={Contato} />

                  <Route path="/_internal/adsense-checklist" component={AdsenseChecklistPage} />

                  <Route path="/kit-solar" component={KitSolar} />
                  <Route path="/kit-solar/:slug" component={KitSolarDetail} />

                  <Route path="/blog" component={Blog} />

                  {/* ✅ SEO Local (wouter: específico primeiro; sem exact) */}
                  <Route path="/cidades" component={Cidades} />
                  <Route path="/cidades/:slug" component={Cidade} />

                  {/* Blog posts (existentes) */}
                  <Route
                    path="/blog/regulamentacao-aneel-energia-solar"
                    component={RegulamentacaoAneel}
                  />
                  <Route
                    path="/blog/marco-legal-lei-14300-energia-solar-rj"
                    component={MarcoLegal14300}
                  />
                  <Route
                    path="/blog/financiamento-energia-solar-rj"
                    component={FinanciamentoEnergiaSolarRJ}
                  />
                  <Route
                    path="/blog/conta-de-luz-nao-zerou-energia-solar"
                    component={ContaDeLuzNaoZerou}
                  />
                  <Route
                    path="/blog/manutencao-paineis-solares"
                    component={ManutencaoPaineisSolares}
                  />
                  <Route path="/blog/energia-solar-empresas" component={EnergiaSolarEmpresas} />
                  <Route
                    path="/blog/tendencias-mercado-solar-2026"
                    component={TendenciasMercadoSolar2026}
                  />

                  {/* ✅ Blog posts (NOVOS) */}
                  <Route
                    path="/blog/quanto-custa-energia-solar-brasil-2026"
                    component={QuantoCustaEnergiaSolarBrasil2026}
                  />
                  <Route
                    path="/blog/marco-legal-energia-solar-lei-14300-explicado"
                    component={MarcoLegalEnergiaSolarLei14300Explicado}
                  />
                  <Route
                    path="/blog/kit-solar-ou-projeto-personalizado-diferencas"
                    component={KitSolarOuProjetoPersonalizadoDiferencas}
                  />
                  <Route
                    path="/blog/payback-energia-solar-em-quanto-tempo-se-paga"
                    component={PaybackEnergiaSolarEmQuantoTempoSePaga}
                  />
                  <Route
                    path="/blog/vida-util-e-manutencao-paineis-solares"
                    component={VidaUtilEManutencaoPaineisSolares}
                  />
                  <Route
                    path="/blog/como-escolher-empresa-energia-solar"
                    component={ComoEscolherEmpresaEnergiaSolar}
                  />
                  <Route
                    path="/blog/energia-solar-transformando-contas-de-luz-2026"
                    component={EnergiaSolarTransformandoContasDeLuz2026}
                  />

                  <Route path="/termos-de-uso" component={TermosDeUso} />
                  <Route path="/politica-de-privacidade" component={PoliticaDePrivacidade} />
                  <Route path="/politica-de-cookies" component={PoliticaDeCookies} />
                  <Route path="/lgpd" component={LGPDPage} />

                  <Route path="/410" component={Removed410} />

                  {/* Bloqueio de rotas antigas (WP/lixo) */}
                  <Route path="/category/:rest*" component={Removed410} />
                  <Route path="/tag/:rest*" component={Removed410} />
                  <Route path="/author/:rest*" component={Removed410} />
                  <Route path="/wp-admin/:rest*" component={Removed410} />
                  <Route path="/wp-content/:rest*" component={Removed410} />
                  <Route path="/wp-includes/:rest*" component={Removed410} />
                  <Route path="/xmlrpc.php" component={Removed410} />
                  <Route path="/wp-login.php" component={Removed410} />
                  <Route path="/feed" component={Removed410} />
                  <Route path="/comments/:rest*" component={Removed410} />
                  <Route component={NotFound} />
                </Switch>
              </Suspense>
            </main>

            <Footer />

            <Suspense fallback={null}>
              <WhatsAppButton />
              <CookieBanner />
            </Suspense>

            <Toaster />
          </div>
        </ErrorBoundary>
      </TooltipProvider>
    </ThemeProvider>
  );
}
