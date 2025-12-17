export const metadata = {
  title: "Termos de Uso | Ilumina Sun",
  description: "Termos de uso do site Ilumina Sun.",
};

export default function TermosDeUsoPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-24">
      <h1 className="text-3xl font-bold tracking-tight">Termos de Uso</h1>
      <p className="mt-2 text-sm text-slate-600">
        Última atualização: {new Date().toLocaleDateString("pt-BR")}
      </p>

      <section className="prose prose-slate mt-8 max-w-none">
        <p>
          Este site é operado pela {" "}<strong>ILUMINA SUN ENERGIA SOLAR LTDA - CNPJ: 62.751.668/0001-28 - RUA VISCONDE DE PIRAJA, 414 - RJ</strong>. Ao acessar
          e utilizar este site, você concorda com estes Termos de Uso.
        </p>

        <h2>1. Finalidade do site</h2>
        <p>
          O site tem caráter informativo e comercial, incluindo conteúdos sobre
          energia solar e canais de contato para solicitação de propostas e
          atendimento.
        </p>

        <h2>2. Conteúdo e propriedade intelectual</h2>
        <p>
          Textos, imagens, marcas, logotipos e demais conteúdos são protegidos por
          direitos de propriedade intelectual. É proibida a reprodução sem
          autorização, salvo quando expressamente permitido.
        </p>

        <h2>3. Simulações, preços e propostas</h2>
        <p>
          Simulações e estimativas (quando houver) são aproximadas e podem variar
          conforme perfil de consumo, tarifação, condições técnicas e comerciais.
          Propostas finais dependem de análise e confirmação.
        </p>

        <h2>4. Links e serviços de terceiros</h2>
        <p>
          Podemos disponibilizar links para sites/serviços de terceiros. Não
          controlamos tais ambientes e não nos responsabilizamos por seus conteúdos
          e práticas.
        </p>

        <h2>5. Limitação de responsabilidade</h2>
        <p>
          Envidamos melhores esforços para manter informações atualizadas, mas não
          garantimos ausência de erros ou disponibilidade contínua do site.
        </p>

        <h2>6. Contato</h2>
        <p>
          Dúvidas sobre estes Termos: <strong>contato@iluminasun.com.br</strong>.
        </p>
      </section>
    </main>
  );
}
