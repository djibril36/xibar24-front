
export interface StrapiCategoryItem {
  id: number;
  attributes: {
    libelle: string;
    icone: string;
    image?: {
      data?: {
        id: number;
        attributes: {
          url: string;
        };
      } | null;
    };
  };
}

export interface StrapiCategoryResponse {
  data: StrapiCategoryItem[];
}

export interface Categorie {
  id: number;
  libelle: string;
  icone: string;
  image: string;
}
