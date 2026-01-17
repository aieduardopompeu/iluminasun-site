export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;

  dateISO: string;
  dateLabel: string;

  readTime: string;
  slug: string;

  image?: string;
  imageAlt?: string;

  published: boolean;
  featuredRank?: number;
};

export const blogPosts: BlogPost[] = [
  // ======= “Base” (posts antigos) =======

  {
    id: "1",
    title: "Regulamentação da ANEEL: Tudo o que Você Precisa Saber sobre Energia Solar",
    excerpt:
      "Entenda as principais normas da ANEEL para geração distribuída de energia solar, o que mudou no marco legal e como isso afeta consumidores e empresas no RJ e Região.",
    category: "Regulamentação",
    author: "Equipe Ilumina Sun",
    dateISO: "2025-12-17",
    dateLabel: "17 de Dezembro, 2025",
    readTime: "10–14 min",
    slug: "regulamentacao-aneel-energia-solar",
    image: "/blog/regulamentacao-aneel.webp",
    imageAlt: "Regulamentação da ANEEL e energia solar",
    published: true,
    featuredRank: 1,
  },

  {
    id: "2",
    title:
      "Lei 14.300 (Marco Legal da Geração Distribuída): o que muda na prática no RJ e como evitar erros na homologação",
    excerpt:
      "Guia direto sobre a Lei 14.300, compensação de créditos e regras de transição — com foco no RJ e Região.",
    category: "Legislação",
    author: "Equipe Ilumina Sun",
    dateISO: "2025-12-18",
    dateLabel: "18 de Dezembro, 2025",
    readTime: "10–13 min",
    slug: "marco-legal-lei-14300-energia-solar-rj",
    image: "/blog/marco-legal-14300.webp",
    imageAlt: "Lei 14.300 (Marco Legal) e energia solar no RJ",
    published: true,
    featuredRank: 2,
  },

  {
    id: "3",
    title: "Manutenção de Painéis Solares: Guia Completo para Máxima Eficiência",
    excerpt:
      "Boas práticas de limpeza, inspeção e cuidados que preservam a performance e prolongam a vida útil do sistema fotovoltaico.",
    category: "Manutenção",
    author: "Equipe Ilumina Sun",
    dateISO: "2024-11-28",
    dateLabel: "28 de Novembro, 2024",
    readTime: "6 min",
    slug: "manutencao-paineis-solares",
    image: "/blog/vida-util-e-manutencao-paineis-solares.webp",
    imageAlt: "Manutenção de painéis solares",
    published: true,
  },

  {
    id: "4",
    title: "Energia Solar para Empresas: Como Reduzir Custos Operacionais",
    excerpt:
      "Como empresas reduzem custos com energia solar: dimensionamento, demanda, perfil de consumo e payback — com foco no RJ e Região.",
    category: "Comercial",
    author: "Equipe Ilumina Sun",
    dateISO: "2024-11-20",
    dateLabel: "20 de Novembro, 2024",
    readTime: "7 min",
    slug: "energia-solar-empresas",
    image: "/blog/energia-solar-empresas.webp",
    imageAlt: "Energia solar para empresas: redução de custos e competitividade.",
    published: true,
  },

  {
    id: "5",
    title: "Financiamento de Energia Solar no RJ: Parcelas, Juros e Como Aprovar Mais Rápido",
    excerpt:
      "Opções de financiamento, documentos e prazos — com dicas para melhorar a aprovação no RJ, Niterói, São Gonçalo, Itaboraí, Maricá e região.",
    category: "Financiamento",
    author: "Equipe Ilumina Sun",
    dateISO: "2025-01-10",
    dateLabel: "10 de Janeiro, 2025",
    readTime: "8–11 min",
    slug: "financiamento-energia-solar-rj",
    image: "/blog/financiamento-energia-solar-rj.webp",
    imageAlt: "Financiamento de energia solar no RJ: parcelas, juros e aprovação.",
    published: true,
  },

  {
    id: "6",
    title: "Conta de Luz Não Zerou com Energia Solar? Entenda Mínimos, Taxas e Compensação no RJ",
    excerpt:
      "Mesmo com energia solar, a fatura pode não zerar. Veja por quê (custo mínimo, compensação, tarifas) e como otimizar no RJ e Região.",
    category: "Regulamentação",
    author: "Equipe Ilumina Sun",
    dateISO: "2025-01-07",
    dateLabel: "07 de Janeiro, 2025",
    readTime: "7–10 min",
    slug: "conta-de-luz-nao-zerou-energia-solar",
    image: "/blog/conta-de-luz-nao-zerou.webp",
    imageAlt: "Conta de luz com energia solar: mínimos, taxas e compensação no RJ.",
    published: true,
  },

  {
    id: "7",
    title: "Tendências do Mercado Solar em 2026: O Que Esperar",
    excerpt:
      "Eficiência, baterias, inversores, precificação, regulação e oportunidades — panorama prático para 2026 com foco no RJ e Região.",
    category: "Mercado",
    author: "Equipe Ilumina Sun",
    dateISO: "2025-11-15",
    dateLabel: "15 de Novembro, 2025",
    readTime: "9–11 min",
    slug: "tendencias-mercado-solar-2026",
    image: "/blog/tendencias-mercado-solar-2026.webp",
    imageAlt: "Tendências do mercado solar em 2026: baterias, eficiência e regulação.",
    published: true,
  },

  // ======= “Novo padrão editorial” (posts novos) =======

  {
    id: "8",
    title: "Como a Energia Solar Está Transformando as Contas de Luz no Brasil em 2026",
    excerpt:
      "Em 2026, a energia solar virou decisão financeira: previsibilidade, redução de custo e proteção contra reajustes. Entenda o que muda na prática e como avaliar seu caso.",
    category: "Custos",
    author: "Equipe Ilumina Sun",
    dateISO: "2026-01-16",
    dateLabel: "16 de Janeiro, 2026",
    readTime: "12–15 min",
    slug: "energia-solar-transformando-contas-de-luz-2026",
    image: "/blog/energia-solar-transformando-contas-de-luz-2026.webp",
    imageAlt: "Energia solar reduzindo contas de luz no Brasil em 2026",
    published: true,
  },

  {
    id: "9",
    title: "Quanto custa energia solar no Brasil em 2026? Guia completo com valores reais",
    excerpt:
      "Entenda o que entra no preço de um sistema fotovoltaico em 2026 e como comparar propostas com segurança — com foco no RJ e Região.",
    category: "Custos",
    author: "Equipe Ilumina Sun",
    dateISO: "2026-01-16",
    dateLabel: "16 de Janeiro, 2026",
    readTime: "10–14 min",
    slug: "quanto-custa-energia-solar-brasil-2026",
    image: "/blog/quanto-custa-energia-solar-brasil-2026.webp",
    imageAlt: "Quanto custa energia solar no Brasil em 2026: valores, itens e economia.",
    published: true,
  },

  {
    id: "10",
    title: "Marco legal da energia solar (Lei 14.300): o que mudou e como isso afeta sua conta de luz",
    excerpt:
      "Entenda a Lei 14.300, regras de compensação, prazos e como isso aparece na fatura — com visão prática para o consumidor.",
    category: "Legislação",
    author: "Equipe Ilumina Sun",
    dateISO: "2026-01-15",
    dateLabel: "15 de Janeiro, 2026",
    readTime: "10–13 min",
    slug: "marco-legal-energia-solar-lei-14300-explicado",
    image: "/blog/marco-legal-energia-solar-lei-14300-explicado.webp",
    imageAlt: "Lei 14.300 e compensação: impactos na conta de luz.",
    published: true,
  },

  {
    id: "11",
    title: "Kit solar ou projeto personalizado: entenda as diferenças antes de decidir",
    excerpt:
      "Compare kit pronto e projeto personalizado (dimensionamento, segurança, homologação e performance) e escolha com confiança.",
    category: "Comercial",
    author: "Equipe Ilumina Sun",
    dateISO: "2026-01-14",
    dateLabel: "14 de Janeiro, 2026",
    readTime: "9–12 min",
    slug: "kit-solar-ou-projeto-personalizado-diferencas",
    image: "/blog/kit-solar-ou-projeto-personalizado-diferencas.webp",
    imageAlt: "Kit solar versus projeto personalizado: diferenças e riscos.",
    published: true,
  },

  {
    id: "12",
    title: "Payback da energia solar: em quanto tempo o investimento se paga na prática",
    excerpt:
      "Como calcular payback com premissas realistas e o que acelera ou atrasa o retorno — com exemplos por consumo.",
    category: "Custos",
    author: "Equipe Ilumina Sun",
    dateISO: "2026-01-13",
    dateLabel: "13 de Janeiro, 2026",
    readTime: "9–12 min",
    slug: "payback-energia-solar-em-quanto-tempo-se-paga",
    image: "/blog/payback-energia-solar-em-quanto-tempo-se-paga.webp",
    imageAlt: "Payback da energia solar: retorno do investimento e fatores.",
    published: true,
  },

  {
    id: "13",
    title: "Vida útil e manutenção de painéis solares: o que esperar ao longo dos anos",
    excerpt:
      "Vida útil real de módulos e inversores, cuidados que preservam performance e quando fazer manutenção — com foco no RJ e Região.",
    category: "Manutenção",
    author: "Equipe Ilumina Sun",
    dateISO: "2026-01-12",
    dateLabel: "12 de Janeiro, 2026",
    readTime: "8–11 min",
    slug: "vida-util-e-manutencao-paineis-solares",
    image: "/blog/vida-util-e-manutencao-paineis-solares.webp",
    imageAlt: "Vida útil e manutenção de painéis solares: garantias e performance.",
    published: true,
  },

  {
    id: "14",
    title: "Como escolher uma empresa de energia solar: checklist do que avaliar antes de contratar",
    excerpt:
      "Checklist prático para avaliar empresa, proposta e contrato (engenharia, homologação, garantias, suporte e documentação).",
    category: "Comercial",
    author: "Equipe Ilumina Sun",
    dateISO: "2026-01-11",
    dateLabel: "11 de Janeiro, 2026",
    readTime: "8–10 min",
    slug: "como-escolher-empresa-energia-solar",
    image: "/blog/como-escolher-empresa-energia-solar.webp",
    imageAlt: "Checklist para escolher empresa de energia solar.",
    published: true,
  },
];
