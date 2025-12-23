import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  // Logo: tenta SVG; se falhar, usa PNG com srcSet para retina
  const [logoIsPng, setLogoIsPng] = useState(false);

  const navItems = [
    { href: "/", label: "Início" },
    { href: "/quem-somos", label: "Quem Somos" },
    { href: "/servicos", label: "Serviços" },
    { href: "/kit-solar", label: "Kit Solar" },

    // ✅ SEO Local
    { href: "/cidades", label: "Cidades" },

    { href: "/portfolio", label: "Portfólio" },
    { href: "/vantagens", label: "Vantagens" },
    { href: "/blog", label: "Blog" },
    { href: "/contato", label: "Contato" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-primary/5 via-background/90 to-secondary/5 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <nav className="container flex h-24 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <img
            src={logoIsPng ? "/logo.png" : "/logo.svg"}
            srcSet={
              logoIsPng
                ? "/logo.png 1x, /logo@2x.png 2x, /logo@3x.png 3x"
                : undefined
            }
            alt="Ilumina Sun"
            // 50% maior que 180x52 -> 270x78 (atributos ajudam no layout shift)
            width={270}
            height={78}
            className="h-[66px] md:h-[78px] w-auto block select-none"
            draggable={false}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            onError={() => {
              if (!logoIsPng) setLogoIsPng(true);
            }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span
                className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                  location === item.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* CTA Button Desktop */}
        <div className="hidden md:block">
          <Link href="/simulador">
            <Button size="default" className="font-semibold">
              Simular Economia
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className={`block py-2 text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                    location === item.href ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </div>
              </Link>
            ))}

            <Link href="/simulador">
              <Button
                size="default"
                className="w-full font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Simular Economia
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
