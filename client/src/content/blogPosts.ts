export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;

  /** Data real para ordenação (ISO) */
  dateISO: string;
  /** Texto exibido */
  dateLabel: string;

  readTime: string;
  slug: string;

  image?: string;
  imageAlt?: string;

  /** Controle editorial */
  published: boolean;
  /** Se definido, entra como candidato a destaque (menor = mais prioritário) */
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
    // featuredRank opcional (se quiser no carrossel)
  },
  {
    id: "5",
    title: "Energia Solar para Empresas: Como Reduzir Custos Operacionais",
    excerpt:
      "Descubra como empresas de todos os portes estão economizando com energia solar e melhorando competitividade.",
    category: "Comercial",
    author: "Equipe Ilumina Sun",
    dateISO: "2024-11-20",
    dateLabel: "20 de Novembro, 2024",
    readTime: "7 min",
    slug: "energia-solar-empresas",
    image: "/blog/regulamentacao-aneel.webp",
    imageAlt: "Energia solar para empresas",
    published: true,
  },
  {
    id: "6",
    title: "Tendências do Mercado Solar em 2025: O Que Esperar",
    excerpt:
      "Análise das principais tendências do setor de energia solar para 2025, incluindo novas tecnologias e projeções do mercado brasileiro.",
    category: "Mercado",
    author: "Equipe Ilumina Sun",
    dateISO: "2024-11-15",
    dateLabel: "15 de Novembro, 2024",
    readTime: "9 min",
    slug: "tendencias-mercado-solar-2025",
    image: "/blog/regulamentacao-aneel.webp",
    imageAlt: "Tendências do mercado de energia solar",
    published: true,
  },

  // Modelo para rascunho (não aparece no site)
  // {
  //   id: "7",
  //   title: "Conta de luz não zerou: entenda mínimos, compensação e cobranças",
  //   excerpt: "Por que a conta não zera mesmo com solar? Explicação simples e prática para RJ e Região.",
  //   category: "Financiamento",
  //   author: "Equipe Ilumina Sun",
  //   dateISO: "2025-12-30",
  //   dateLabel: "30 de Dezembro, 2025",
  //   readTime: "8–10 min",
  //   slug: "conta-de-luz-nao-zerou-energia-solar",
  //   image: "/blog/conta-nao-zerou.webp",
  //   imageAlt: "Conta de luz e energia solar",
  //   published: false,
  // }
];
