export default function Simulador() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">Simulador de Economia</h1>
            <p className="text-lg text-muted-foreground">
              Descubra quanto você pode economizar com energia solar fotovoltaica
            </p>
          </div>
        </div>
      </section>

      {/* Simulador Azume */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
              <iframe
                src="https://azume.com.br/simulador/68e821ee5cce7300152e0374"
                width="100%"
                height="800"
                style={{ border: 'none', minHeight: '800px' }}
                title="Simulador de Energia Solar Azume"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Informações Adicionais */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              Por Que Simular?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">95%</div>
                <p className="text-sm text-muted-foreground">
                  Economia média na conta de luz com energia solar
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-secondary">3-6</div>
                <p className="text-sm text-muted-foreground">
                  Anos para retorno do investimento em média
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">25+</div>
                <p className="text-sm text-muted-foreground">
                  Anos de garantia dos painéis solares
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
