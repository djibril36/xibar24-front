
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../core/models/article.model';
import { NavbarComponent } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category implements OnInit {
  categorySlug = 'economie';
  categoryTitle = 'ÉCONOMIE';
  selectedSubcategory = 'Tout';

  subcategories: string[] = [];
  articles: Article[] = [];

  // Données temporaires pour construire l'affichage.
  // Elles seront remplacées par les articles du service.
  private readonly demoArticles: Article[] = [
    {
      id: 1,
      titre: 'Inflation persistante : le pouvoir d’achat sous pression',
      resume:
        'Malgré un ralentissement annoncé, les ménages ressentent toujours une forte hausse des prix sur les produits essentiels.',
      image: '/assets/images/inflation.png',
      contenu: '',
      categorie: { nom: 'Économie', slug: 'economie' },
      sousCategorie: 'Finance',
      date: '2026-10-16',
      datePublication: '2026-10-16',
      choixRedaction: false,
      auteur: null,
      priorite: null,
      format: null,
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
    },
    {
      id: 2,
      titre: 'Marché de l’emploi : les secteurs qui recrutent en 2026',
      resume:
        'Santé, numérique et transition écologique restent les moteurs du recrutement malgré un contexte économique incertain.',
      image: '/assets/images/emploi.jpg',
      contenu: '',
      categorie: { nom: 'Économie', slug: 'economie' },
      sousCategorie: 'Emploi',
      date: '2026-10-16',
      datePublication: '2026-10-16',
      choixRedaction: false,
      auteur: null,
      priorite: null,
      format: null,
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.categorySlug = (
        params.get('slug') ?? 'economie'
      ).toLowerCase();

      this.categoryTitle = this.getCategoryTitle(this.categorySlug);
      this.selectedSubcategory = 'Tout';

      this.loadArticles();
    });
  }

  private loadArticles(): void {
    this.articles = this.demoArticles.filter(
      (article) => this.getArticleCategorySlug(article) === this.categorySlug
    );

    this.subcategories = [
      ...new Set(
        this.articles
          .map((article) => article.sousCategorie)
          .filter((subcategory) => !!subcategory)
      ),
    ];
  }

  get filteredArticles(): Article[] {
    return this.articles.filter(
      (article) =>
        this.selectedSubcategory === 'Tout' ||
        article.sousCategorie === this.selectedSubcategory
    );
  }

  selectSubcategory(subcategory: string): void {
    this.selectedSubcategory = subcategory;
  }

  getImageUrl(image: any): string {
    if (typeof image === 'string') {
      return image;
    }

    if (image?.url) {
      return image.url;
    }

    if (image?.data?.attributes?.url) {
      return image.data.attributes.url;
    }

    if (image?.formats?.medium?.url) {
      return image.formats.medium.url;
    }

    if (image?.data?.attributes?.formats?.medium?.url) {
      return image.data.attributes.formats.medium.url;
    }

    return '/assets/images/article-placeholder.jpg';
  }

  private getArticleCategorySlug(article: Article): string {
    const category = article.categorie;

    if (typeof category === 'string') {
      return category.toLowerCase().replace(/\s+/g, '-');
    }

    const slug = category?.slug;

    if (slug) {
      return String(slug).toLowerCase();
    }

    const name =
      category?.nom ??
      category?.libelle ??
      category?.titre ??
      '';

    return String(name)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
  }

  private getCategoryTitle(slug: string): string {
    const titles: Record<string, string> = {
      economie: 'ÉCONOMIE',
      politique: 'POLITIQUE',
      sport: 'SPORT',
      societe: 'SOCIÉTÉ',
      culture: 'CULTURE',
      international: 'INTERNATIONAL',
      technologie: 'TECHNOLOGIE',
      sante: 'SANTÉ',
    };

    return titles[slug] ?? slug.replace(/-/g, ' ').toUpperCase();
  }
}
