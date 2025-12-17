import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import QuemSomos from "./pages/QuemSomos";
import Servicos from "./pages/Servicos";
import Simulador from "./pages/Simulador";
import Portfolio from "./pages/Portfolio";
import Vantagens from "./pages/Vantagens";
import Contato from "./pages/Contato";
import Blog from "./pages/Blog";
import KitSolar from "./pages/KitSolar";
import KitSolarDetail from "./pages/KitSolarDetail";
import CookieBanner from "./components/CookieBanner";
import TermosDeUso from "./pages/TermosDeUso";
import PoliticaDePrivacidade from "./pages/PoliticaDePrivacidade";
import PoliticaDeCookies from "./pages/PoliticaDeCookies";


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

function Router() {
  const [location] = useLocation();

  // SPA pageview: dispara em toda mudança de rota (inclui carregamento inicial).
  useEffect(() => {
    pushDataLayer({
      event: "page_view",
      page_path: location,
      page_title: document.title,
    });
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path={"/quem-somos"} component={QuemSomos} />
          <Route path={"/servicos"} component={Servicos} />
          <Route path={"/portfolio"} component={Portfolio} />
          <Route path={"/vantagens"} component={Vantagens} />
          <Route path={"/simulador"} component={Simulador} />
          <Route path={"/contato"} component={Contato} />
          <Route path={"/blog"} component={Blog} />
          <Route path={"/kit-solar"} component={KitSolar} />
          <Route path={"/termos-de-uso"} component={TermosDeUso} />
          <Route path={"/politica-de-privacidade"} component={PoliticaDePrivacidade} />
          <Route path={"/politica-de-cookies"} component={PoliticaDeCookies} />
          <Route path={"/kit-solar/:slug"} component={KitSolarDetail} />
          <Route path={"/404"} component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <WhatsAppButton
        phoneNumber="5521966084093"
        message="Olá! Gostaria de saber mais sobre energia solar e receber um orçamento."
      />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <CookieBanner />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
