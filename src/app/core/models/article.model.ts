import { Categorie } from './categorie.model';
export interface Article {
  id: number;
  titre: string;
  resume: string;
  image: any;
  contenu: string;
  categorie: any;
  sousCategorie : string;
  date: string;
  datePublication: string;
  choixRedaction: boolean;

  auteur: string | null;
  priorite: number | null;
  format: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
