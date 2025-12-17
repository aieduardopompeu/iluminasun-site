export const metadata = {
  title: "Política de Cookies | Ilumina Sun",
  description: "Entenda como usamos cookies e como gerenciar preferências.",
};

export default function PoliticaCookiesPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-24">
      <h1 className="text-3xl font-bold tracking-tight">Política de Cookies</h1>
      <p className="mt-2 text-sm text-slate-600">
        Última atualização: {new Date().toLocaleDateString("pt-BR")}
      </p>

      <section className="prose prose-slate mt-8 max-w-none">
        <p>
          Cookies são pequenos arquivos armazenados no seu dispositivo para viabilizar
          funcionalidades, segurança e (quando autorizado) medição e publicidade.
          A ANPD recomenda transparência, controle real (aceitar/rejeitar) e evitar
          consentimento tácito ou opções pré-selecionadas.{" "}
          <strong>
            Aqui, você pode aceitar ou rejeitar cookies não necessários e alterar sua
            decisão a qualquer momento.
          </strong>
        </p>

        <h2>1. Categorias</h2>
        <ul>
          <li><strong>Necessários</strong>: essenciais para funcionamento e segurança do site.</li>
          <li><strong>Analíticos</strong>: medem uso do site (ex.: páginas e eventos) para melhoria, quando você autoriza.</li>
          <li><strong>Marketing</strong>: usados para publicidade/remarketing, quando aplicável e autorizado.</li>
        </ul>

        <h2>2. Como gerenciar</h2>
        <p>
          Você pode ajustar preferências no banner de cookies e também pode bloquear cookies
          no navegador. Note que desabilitar cookies necessários pode afetar o funcionamento.
        </p>

        <h2>3. Revogação</h2>
        <p>
          Você pode revogar consentimentos a qualquer momento, de forma gratuita e facilitada,
          usando o botão “Preferências de cookies” no rodapé.
        </p>
      </section>
    </main>
  );
}
