import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Article, Auteur } from '../../core/models/article.model';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './article.html',
  styleUrl: './article.scss',
})
export class ArticleComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly cdr = inject(ChangeDetectorRef);

  article: Article | null = null;
  isLoading = true;

  private readonly demoArticles: Article[] = [
    {
      id: 1,
      titre: 'Inflation persistante : le pouvoir d’achat sous pression',
      resume: 'Malgré un ralentissement annoncé, les ménages ressentent toujours une forte hausse des prix sur les produits essentiels.',
      image: '/assets/images/inflation.png',
      contenu: `
        <p>La situation économique mondiale continue de peser sur le quotidien des ménages. Si les institutions internationales annoncent une légère décrue de l'inflation pour le second semestre, la réalité sur le terrain reste contrastée.</p>
        <p>Les produits de première nécessité, notamment l'alimentaire et l'énergie, enregistrent des hausses qui érodent directement le pouvoir d'achat.</p>
        <h3>Quelles solutions ?</h3>
        <p>Les économistes suggèrent une augmentation des salaires indexée sur l'inflation, ainsi qu'un contrôle plus strict des marges des distributeurs.</p>
      `,
      categorie: { nom: 'Économie', slug: 'economie' },
      sousCategorie: 'Finance',
      date: '2026-10-16',
      datePublication: '2026-10-16',
      choixRedaction: true,
      auteur: { nom: 'Amadou Diallo', role: 'Journaliste Économie', avatar: 'https://i.pravatar.cc/150?u=amadou' },
      priorite: null, format: null, createdAt: '', updatedAt: '', publishedAt: ''
    },
    {
      id: 2,
      titre: 'Marché de l’emploi : les secteurs qui recrutent en 2026',
      resume: 'Santé, numérique et transition écologique restent les moteurs du recrutement malgré un contexte économique incertain.',
      image: '/assets/images/emploi.jpg',
      contenu: '<p>Le marché du travail connaît une profonde mutation. La transition écologique crée de nouveaux besoins...</p>',
      categorie: { nom: 'Économie', slug: 'economie' },
      sousCategorie: 'Emploi',
      date: '2026-10-16',
      datePublication: '2026-10-16',
      choixRedaction: false,
      auteur: 'La Rédaction',
      priorite: null, format: null, createdAt: '', updatedAt: '', publishedAt: ''
    },
    {
      id: 4,
      titre: 'Sommet de l’Union africaine : sécurité et commerce au menu',
      resume: 'Les chefs d’État réunis à Addis-Abeba tentent d’accélérer la mise en œuvre de la ZLECAf.',
      image: '/assets/images/sommet-ua.jpeg',
      contenu: '<p>Le sommet de l\'Union africaine s\'est ouvert ce matin. Au programme : la paix et le commerce intra-africain...</p>',
      categorie: { nom: 'Afrique', slug: 'afrique' },
      sousCategorie: 'Politique',
      date: '2026-10-15',
      datePublication: '2026-10-15',
      choixRedaction: false,
      auteur: null,
      priorite: null, format: null, createdAt: '', updatedAt: '', publishedAt: ''
    }
  ];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.loadArticle(id);
    });
  }

  isAuteurObjet(auteur: any): auteur is Auteur {
    return auteur !== null && typeof auteur === 'object' && 'nom' in auteur;
  }

  // ✅ Voici la méthode qui manquait
  getImageUrl(image: any): string {
    if (typeof image === 'string') return image;
    if (image?.url) return image.url;
    if (image?.data?.attributes?.url) return image.data.attributes.url;
    if (image?.formats?.medium?.url) return image.formats.medium.url;
    if (image?.data?.attributes?.formats?.medium?.url) return image.data.attributes.formats.medium.url;
    return '/assets/images/article-placeholder.jpg';
  }

  private loadArticle(id: string | null): void {
    this.isLoading = true;

    setTimeout(() => {
      const articleId = Number(id);
      const foundArticle = this.demoArticles.find(a => a.id === articleId);

      this.article = foundArticle || null;
      this.isLoading = false;

      this.cdr.markForCheck();
      this.cdr.detectChanges();
    }, 1000);
  }
}
