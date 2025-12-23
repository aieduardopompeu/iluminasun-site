export const metadata = {
  title: "Política de Privacidade | Ilumina Sun",
  description: "Política de privacidade e tratamento de dados pessoais (LGPD).",
};

export default function PoliticaPrivacidadePage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-24">
      <h1 className="text-3xl font-bold tracking-tight">Política de Privacidade</h1>
      <p className="mt-2 text-sm text-slate-600">
        Última atualização: {new Date().toLocaleDateString("pt-BR")}
      </p>

      <section className="prose prose-slate mt-8 max-w-none">
        <p>
          Esta Política descreve como a {" "}
          <strong>ILUMINA SUN ENERGIA SOLAR LTDA - CNPJ: 62.751.668/0001-28 - RUA VISCONDE DE PIRAJA - RJ</strong> trata dados
          pessoais em conformidade com a legislação aplicável, incluindo a LGPD.
        </p>

        <h2>1. Quais dados coletamos</h2>
        <ul>
          <li>Dados fornecidos por você: nome, telefone, e-mail, mensagem e dados do projeto/consumo quando enviados.</li>
          <li>Dados de navegação: páginas visitadas, dispositivo, IP aproximado, eventos de uso (via analytics), sujeitos às suas preferências de cookies.</li>
        </ul>

        <h2>2. Para quais finalidades</h2>
        <ul>
          <li>Responder solicitações e prestar atendimento.</li>
          <li>Elaborar propostas e realizar contato comercial.</li>
          <li>Medir desempenho do site e melhorar a experiência (analytics), quando autorizado.</li>
          <li>Segurança, prevenção a fraudes e estabilidade do serviço.</li>
        </ul>

        <h2>3. Compartilhamento</h2>
        <p>
          Podemos utilizar provedores de infraestrutura e analytics para operar o site.
          Por exemplo, hospedagem e entrega de conteúdo podem ocorrer via plataformas
          de nuvem/CDN. Também utilizamos ferramentas de medição (ex.: GA4/GTM) conforme
          suas escolhas de cookies.
        </p>

        <h2>4. Cookies e preferências</h2>
        <p>
          Veja nossa <a href="/politica-de-cookies">Política de Cookies</a> para entender
          categorias, finalidades e como gerenciar preferências.
        </p>

        <h2>5. Seus direitos</h2>
        <p>
          Você pode solicitar confirmação de tratamento, acesso, correção, portabilidade,
          eliminação, informação sobre compartilhamento e revogação de consentimento,
          quando aplicável.
        </p>

        <h2>6. Canal de contato</h2>
        <p>
          Solicitações e dúvidas: <strong>contato@iluminasun.com.br</strong>.
          <br />
        </p>

        <h2>7. Atualizações</h2>
        <p>
          Podemos atualizar esta Política periodicamente para refletir mudanças no site
          ou requisitos legais.
        </p>
      </section>
    </main>
  );
}
