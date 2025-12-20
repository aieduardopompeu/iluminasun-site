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
  {
    id: "1",
    title: "Regulamentação da ANEEL: Tudo o que Você Precisa Saber sobre Energia Solar",
    excerpt:
      "Entenda as principais normas da ANEEL para geração distribuída de energia solar, incluindo mudanças recentes no marco legal e como isso afeta consumidores e empresas no RJ e Região.",
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
      "Guia direto sobre a Lei 14.300, SCEE/créditos, regras de transição e impacto por perfil (residencial, comercial, industrial e rural) — com foco no RJ e Região.",
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

  // ✅ Manutenção (único)
  {
    id: "4",
    title: "Manutenção de Painéis Solares: Guia Completo para Máxima Eficiência",
    excerpt:
      "Aprenda como realizar a manutenção correta do seu sistema fotovoltaico para garantir máxima geração e prolongar a vida útil.",
    category: "Manutenção",
    author: "Equipe Ilumina Sun",
    dateISO: "2024-11-28",
    dateLabel: "28 de Novembro, 2024",
    readTime: "6 min",
    slug: "manutencao-paineis-solares",
    image: "/blog/regulamentacao-aneel.webp",
    imageAlt: "Manutenção de painéis solares",
    published: true,
  },

  {
    id: "5",
    title: "Energia Solar para Empresas: Como Reduzir Custos Operacionais",
    excerpt: "Descubra como empresas de todos os portes estão economizando com energia solar e melhorando competitividade.",
    category: "Comercial",
    author: "Equipe Ilumina Sun",
    dateISO: "2024-11-20",
    dateLabel: "20 de Novembro, 2024",
    readTime: "7 min",
    slug: "energia-solar-empresas",
    image: "/blog/energia-solar-empresas.webp",
    imageAlt: "Energia solar para empresas: como reduzir custos e aumentar competitividade.",
    published: true,
  },

  // ✅ Financiamento
  {
    id: "7",
    title: "Financiamento de Energia Solar no RJ: Parcelas, Juros e Como Aprovar Mais Rápido",
    excerpt: "Entenda as opções de financiamento para energia solar (residencial e empresas), documentos, prazos e dicas para melhorar a aprovação no RJ, Niterói, São Gonçalo, Itaboraí, Maricá e região.",
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

  // ✅ Conta não zerou
  {
    id: "8",
    title: "Conta de Luz Não Zerou com Energia Solar? Entenda Mínimos, Taxas e Compensação no RJ",
    excerpt: "Mesmo com energia solar, a fatura pode não zerar. Veja os motivos mais comuns (custos mínimos, regras de compensação, demanda e tarifas) e como otimizar seu sistema no RJ e Região.",
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

  // ✅ Tendências 2026 (NOVO) — para aparecer no Blog
  {
    id: "9",
    title: "Tendências do Mercado Solar em 2026: O Que Esperar",
    excerpt: "Principais tendências para 2026 no setor solar: eficiência, baterias, inversores, precificação, regulação e oportunidades no RJ e Região.",
    category: "Mercado",
    author: "Equipe Ilumina Sun",
    dateISO: "2025-11-15",
    dateLabel: "15 de Novembro, 2025",
    readTime: "9–11 min",
    slug: "tendencias-mercado-solar-2026",
    image: "/blog/tendencias-mercado-solar-2026.webp",
    imageAlt: "Tendências do mercado solar em 2026: preços, eficiência, baterias e regulação.",
    published: true,
  },
];
