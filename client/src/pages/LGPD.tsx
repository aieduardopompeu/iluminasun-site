import { Link } from "wouter";

export default function LGPDPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-24">
      <h1 className="text-3xl font-bold tracking-tight">LGPD</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Informações sobre proteção de dados pessoais e seus direitos.
      </p>

      <section className="prose prose-slate mt-8 max-w-none">
        <p>
          A Ilumina Sun se compromete com a proteção dos seus dados pessoais, em
          conformidade com a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados — LGPD).
        </p>

        <h2>1. Quem somos</h2>
        <p>
          Controladora: <strong>Ilumina Sun Energia Solar</strong>.
          <br />
          E-mail de contato: <strong>contato@iluminasun.com.br</strong>.
        </p>

        <h2>2. Quais dados podemos tratar</h2>
        <ul>
          <li>Dados de contato: nome, e-mail, telefone e mensagem enviada.</li>
          <li>Dados de projeto/consumo: quando você informa para simulação/atendimento.</li>
          <li>
            Dados de navegação: páginas acessadas, dispositivo e eventos de uso (quando autorizado).
          </li>
        </ul>

        <h2>3. Finalidades de uso</h2>
        <ul>
          <li>Atendimento, retorno de contato e elaboração de propostas.</li>
          <li>Melhoria do site e análise de performance (analytics), quando você autoriza cookies.</li>
          <li>Segurança, prevenção a fraudes e estabilidade do serviço.</li>
        </ul>

        <h2>4. Cookies e preferências</h2>
        <p>
          Você pode gerenciar suas preferências no banner de cookies e consultar nossa{" "}
          <Link href="/politica-de-cookies">
            <a>Política de Cookies</a>
          </Link>
          .
        </p>

        <h2>5. Compartilhamento</h2>
        <p>
          Podemos utilizar provedores de infraestrutura, hospedagem e ferramentas de métricas
          para operação do site e melhoria contínua, respeitando suas preferências de cookies
          e a legislação aplicável.
        </p>

        <h2>6. Seus direitos</h2>
        <p>
          Você pode solicitar confirmação de tratamento, acesso, correção, eliminação,
          portabilidade, informação sobre compartilhamento e revogação de consentimento,
          quando aplicável.
        </p>

        <h2>7. Como falar conosco</h2>
        <p>
          Para exercer direitos ou tirar dúvidas:{" "}
          <strong>contato@iluminasun.com.br</strong>.
        </p>

        <h2>8. Documentos relacionados</h2>
        <ul>
          <li>
            <Link href="/politica-de-privacidade">
              <a>Política de Privacidade</a>
            </Link>
          </li>
          <li>
            <Link href="/politica-de-cookies">
              <a>Política de Cookies</a>
            </Link>
          </li>
          <li>
            <Link href="/termos-de-uso">
              <a>Termos de Uso</a>
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
