import { Categorie } from './categorie.model';

export interface Auteur {
  nom: string;
  avatar?: string;
  role?: string;
}

export interface Article {
  id: number;
  titre: string;
  resume: string;
  image: any;
  contenu: string;
  categorie: any; // Idéalement à remplacer par Categorie | string plus tard
  sousCategorie: string;
  date: string;
  datePublication: string;
  choixRedaction: boolean;

  // ✅ Ici : on accepte l'objet Auteur OU une chaîne de caractères OU null
  auteur: Auteur | string | null;

  priorite: number | null;
  format: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
