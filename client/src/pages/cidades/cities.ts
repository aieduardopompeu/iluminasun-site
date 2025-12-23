// client/src/pages/cidades/cities.ts
export type CityConfig = {
  slug: string;
  name: string;
  state: string;
};

export const CITIES: CityConfig[] = [
  { slug: "niteroi", name: "Niterói", state: "RJ" },
  { slug: "sao-goncalo", name: "São Gonçalo", state: "RJ" },
  { slug: "rio-de-janeiro", name: "Rio de Janeiro", state: "RJ" },
  { slug: "itaborai", name: "Itaboraí", state: "RJ" },
  { slug: "rio-bonito", name: "Rio Bonito", state: "RJ" },
  { slug: "tangua", name: "Tanguá", state: "RJ" },
  { slug: "marica", name: "Maricá", state: "RJ" },
];

export const CITY_BY_SLUG = Object.fromEntries(CITIES.map((c) => [c.slug, c])) as Record<
  string,
  CityConfig
>;

export const SERVICE_CITIES_TEXT = CITIES.map((c) => c.name).join(", ");
