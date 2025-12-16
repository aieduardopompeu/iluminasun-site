import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-2xl font-bold text-primary-foreground">☀</span>
            </div>
            <span className="text-xl font-bold text-foreground">Iluminasun</span>
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
              <Button size="default" className="w-full font-semibold" onClick={() => setMobileMenuOpen(false)}>
                Simular Economia
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
