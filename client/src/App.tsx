import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
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

function Router() {
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
          <Route path={"/kit-solar/:slug"} component={KitSolarDetail} />
          <Route path={"/404"} component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="5521966084093" message="Olá! Gostaria de saber mais sobre energia solar e receber um orçamento." />
    </div>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
