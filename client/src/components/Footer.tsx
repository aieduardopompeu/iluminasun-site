// src/components/Footer.tsx
import { Link } from "wouter";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { openCookiePreferences } from "./CookieBanner";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-gradient-to-r from-primary/5 via-background to-secondary/5">
      <div className="mx-auto w-full max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="space-y-4">
            <Link href="/">
              <a className="inline-flex items-center">
                <img
                  src="/logo.svg"
                  alt="Ilumina Sun"
                  width={180}
                  height={52}
                  className="h-[52px] w-auto block"
                  draggable={false}
                />
              </a>
            </Link>

            <p className="text-sm text-muted-foreground max-w-sm">
              Soluções completas em energia solar fotovoltaica para residências,
              comércios e indústrias.
            </p>
          </div>

          {/* Links rápidos */}
          <div className="space-y-3">
            <p className="text-sm font-semibold">Links Rápidos</p>

            <ul className="space-y-2 text-sm text-muted-foreground">
              {/* ✅ SEO Local */}
              <li>
                <Link href="/cidades">
                  <a className="hover:text-primary">Cidades atendidas</a>
                </Link>
              </li>

              <li>
                <Link href="/blog">
                  <a className="hover:text-primary">Blog</a>
                </Link>
              </li>

              <li>
                <Link href="/portfolio">
                  <a className="hover:text-primary">Portfólio</a>
                </Link>
              </li>

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

              <li className="pt-2 text-sm font-semibold text-foreground">
                Termos e Políticas
              </li>

              <li>
                <Link href="/lgpd">
                  <a className="hover:text-primary">LGPD</a>
                </Link>
              </li>

              <li>
                <Link href="/politica-de-cookies">
                  <a className="hover:text-primary">Política de Cookies</a>
                </Link>
              </li>

              <li>
                <Link href="/politica-de-privacidade">
                  <a className="hover:text-primary">Política de Privacidade</a>
                </Link>
              </li>

              <li>
                <button
                  type="button"
                  onClick={openCookiePreferences}
                  className="hover:text-primary"
                >
                  Preferências de cookies
                </button>
              </li>

              <li>
                <Link href="/termos-de-uso">
                  <a className="hover:text-primary">Termos de Uso</a>
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

          {/* Contato + Redes + Selos */}
          <div className="space-y-4">
            <p className="text-sm font-semibold">Contato</p>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4" />
                <span>(21) 96608-4093</span>
              </li>

              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4" />
                <a href="mailto:contato@iluminasun.com.br" className="hover:text-primary">
                  contato@iluminasun.com.br
                </a>
              </li>

              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4" />
                <span>
                  R. Visconde de Pirajá
                  <br />
                  Ipanema, Rio de Janeiro - RJ
                  <br />
                  CEP: 22410-002
                </span>
              </li>
            </ul>

            {/* Redes sociais */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.instagram.com/iluminasun/"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61559064962123"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>

              <a
                href="https://x.com/iluminasun/"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary"
                aria-label="X"
              >
                <Twitter className="h-5 w-5" />
              </a>

              <a
                href="https://www.youtube.com/@IluminaSunEnergiaSolar"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>

            {/* Selos (somente ícones) */}
            <div className="pt-2">
              <p className="text-sm font-semibold">Selos</p>

              <div className="mt-2 flex items-center gap-3">
                <a
                  href="https://www.ssllabs.com/ssltest/analyze.html?d=iluminasun.com.br"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="SSL (SSL Labs)"
                  title="SSL (SSL Labs)"
                  className="inline-flex items-center opacity-80 transition hover:opacity-100"
                >
                  <img
                    src="/ssl-secure.svg"
                    alt="SSL (SSL Labs)"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                    loading="lazy"
                  />
                </a>

                <a
                  href="https://transparencyreport.google.com/safe-browsing/search?url=iluminasun.com.br"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Google Safe Browsing"
                  title="Google Safe Browsing"
                  className="inline-flex items-center opacity-80 transition hover:opacity-100"
                >
                  <img
                    src="/google-safe.svg"
                    alt="Google Safe Browsing"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                    loading="lazy"
                  />
                </a>

                <Link href="/lgpd">
                  <a
                    aria-label="LGPD"
                    title="LGPD"
                    className="inline-flex items-center opacity-80 transition hover:opacity-100"
                  >
                    <img
                      src="/lgpd.png"
                      alt="LGPD"
                      width={40}
                      height={40}
                      className="h-14 w-14 object-contain"
                      loading="lazy"
                    />
                  </a>
                </Link>

                <a
                  href="https://www.altacloud.com.br"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Developer"
                  title="Developer"
                  className="inline-flex items-center opacity-80 transition hover:opacity-100"
                >
                  <img
                    src="/altacloud.png"
                    alt="Developer"
                    width={40}
                    height={40}
                    className="h-14 w-14 object-contain"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {year} Ilumina Sun Energia Solar. Todos os direitos reservados.</p>
          <p>Energia limpa e renovável.</p>
        </div>
      </div>
    </footer>
  );
}
