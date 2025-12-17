import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  // Preferir SVG; cai para PNG se houver erro.
    <img
    src="/logo.svg"
    alt="Ilumina Sun"
    width={180}
    height={52}
    className="h-[44px] md:h-[52px] w-auto block"
    draggable={false}
    />

  const navItems = [
    { href: "/", label: "Início" },
    { href: "/quem-somos", label: "Quem Somos" },
    { href: "/servicos", label: "Serviços" },
    { href: "/kit-solar", label: "Kit Solar" },
    { href: "/portfolio", label: "Portfólio" },
    { href: "/vantagens", label: "Vantagens" },
    { href: "/blog", label: "Blog" },
    { href: "/contato", label: "Contato" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-primary/5 via-background/90 to-secondary/5 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      {/* Aumentei a altura para acomodar a logo maior */}
      <nav className="container flex h-24 items-center justify-between">
        {/* Logo (somente imagem, sem texto, sem caixa) */}
        <Link href="/">
          <div className="cursor-pointer">
            <img
              src="/logo.svg"
              alt="Iluminasun"
              width={180}
              height={52}
              className="h-[44px] md:h-[52px] w-auto block"
              draggable={false}
              loading="eager"
            />
          </div>
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
