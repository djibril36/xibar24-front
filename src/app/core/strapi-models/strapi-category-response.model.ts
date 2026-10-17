export interface StrapiCategoryResponse {
  data: StrapiCategory[];
  meta?: unknown;
}

export interface StrapiCategory {
  id: number;
  attributes: {
    libelle: string;
    icone: string;
    image?: {
      data?: StrapiMedia[];
    };
  };
}

export interface StrapiMedia {
  id: number;
  attributes: {
    url: string;
  };
}
