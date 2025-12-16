import { Link } from "wouter";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-gradient-to-r from-primary/5 via-background to-secondary/5">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="space-y-4">
            <Link href="/">
              <a className="inline-flex items-center">
                <img src="/logo.svg" alt="Ilumina Sun" className="h-12 w-auto" />
              </a>
            </Link>

            <p className="text-sm text-muted-foreground max-w-sm">
              Soluções completas em energia solar fotovoltaica para residências, comércios e
              indústrias.
            </p>
          </div>

          {/* Links rápidos */}
          <div className="space-y-3">
            <p className="text-sm font-semibold">Links Rápidos</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/quem-somos">
                  <a className="hover:text-primary">Quem Somos</a>
                </Link>
              </li>
              <li>
                <Link href="/servicos">
                  <a className="hover:text-primary">Serviços</a>
                </Link>
              </li>
              <li>
                <Link href="/portfolio">
                  <a className="hover:text-primary">Portfólio</a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="hover:text-primary">Blog</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Serviços */}
          <div className="space-y-3">
            <p className="text-sm font-semibold">Serviços</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/servicos">
                  <a className="hover:text-primary">Energia Solar Residencial</a>
                </Link>
              </li>
              <li>
                <Link href="/servicos">
                  <a className="hover:text-primary">Energia Solar Comercial</a>
                </Link>
              </li>
              <li>
                <Link href="/servicos">
                  <a className="hover:text-primary">Energia Solar Industrial</a>
                </Link>
              </li>
              <li>
                <Link href="/servicos">
                  <a className="hover:text-primary">Energia Solar Rural</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-3">
            <p className="text-sm font-semibold">Contato</p>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-primary mt-0.5" />
                <a className="hover:text-primary" href="tel:+5521966084093">
                  (21) 96608-4093
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-primary mt-0.5" />
                <a className="hover:text-primary" href="mailto:contato@iluminasun.com.br">
                  contato@iluminasun.com.br
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>
                  R. Visconde de Pirajá, 414
                  <br />
                  Ipanema, Rio de Janeiro - RJ
                  <br />
                  CEP: 22410-002
                </span>
              </li>
            </ul>

            <div className="pt-2 flex items-center gap-4">
              <a
                href="https://www.instagram.com/iluminasun/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61559064962123"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>

              <a
                href="https://x.com/iluminasun/"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>

              <a
                href="https://www.youtube.com/@IluminaSunEnergiaSolar"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-xs text-muted-foreground flex flex-col items-center justify-between gap-3 md:flex-row">
          <p>© {year} Ilumina Sun Energia Solar. Todos os direitos reservados.</p>
          <p className="md:text-right">Energia limpa e renovável.</p>
        </div>
      </div>
    </footer>
  );
}
