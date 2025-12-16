import { Link } from "wouter";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-gradient-to-r from-primary/5 via-background to-secondary/5">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Coluna 1 */}
          <div className="space-y-4">
            <img
              src="/logo.svg"
              alt="Ilumina Sun"
              className="h-10 w-auto"
              onError={(e) => {
                // fallback opcional (se existir logo.png)
                e.currentTarget.src = "/logo.png";
              }}
            />
            <p className="text-sm text-muted-foreground">
              Energia solar fotovoltaica para residências, comércios e indústrias.
            </p>
          </div>

          {/* Coluna 2 */}
          <div className="space-y-3">
            <p className="text-sm font-semibold">Páginas</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/simulador">
                  <a className="hover:text-primary">Simulador</a>
                </Link>
              </li>
              <li>
                <Link href="/kit-solar">
                  <a className="hover:text-primary">Kits</a>
                </Link>
              </li>
              <li>
                <Link href="/contato">
                  <a className="hover:text-primary">Contato</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 */}
          <div className="space-y-3">
            <p className="text-sm font-semibold">Contato</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                Email:{" "}
                <a className="hover:text-primary" href="mailto:contato@iluminasun.com.br">
                  contato@iluminasun.com.br
                </a>
              </li>
              <li>
                WhatsApp:{" "}
                <a className="hover:text-primary" href="https://wa.me/5521966084093" target="_blank" rel="noreferrer">
                  +55 21 96608-4093
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-xs text-muted-foreground flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© {year} Ilumina Sun. Todos os direitos reservados.</p>
          <p>Energia limpa e renovável.</p>
        </div>
      </div>
    </footer>
  );
}
