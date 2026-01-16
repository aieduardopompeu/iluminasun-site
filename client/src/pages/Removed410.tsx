import { Link } from "wouter";

export default function Removed410() {
  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: "48px 16px" }}>
      <h1 style={{ fontSize: 28, margin: "0 0 12px" }}>Conteúdo removido</h1>

      <p style={{ margin: "0 0 16px", lineHeight: 1.6 }}>
        Este endereço não está mais disponível. Se você chegou aqui por um link antigo,
        use as opções abaixo para continuar navegando.
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link href="/">
          <a
            style={{
              display: "inline-block",
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #ddd",
              textDecoration: "none"
            }}
          >
            Voltar para a Home
          </a>
        </Link>

        <Link href="/servicos">
          <a
            style={{
              display: "inline-block",
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #ddd",
              textDecoration: "none"
            }}
          >
            Ver Serviços
          </a>
        </Link>
      </div>
    </main>
  );
}
