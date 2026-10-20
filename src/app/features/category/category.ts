import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router'; // 👈 Ajout de RouterLink
import { Subject, takeUntil } from 'rxjs';
import { Article } from '../../core/models/article.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink], // 👈 Ajout dans les imports du composant
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category implements OnInit, OnDestroy {
  categorySlug = 'economie';
  categoryTitle = 'ÉCONOMIE';
  selectedSubcategory = 'Tout';

  subcategories: string[] = [];
  articles: Article[] = [];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const newSlug = (params.get('slug') ?? 'economie').toLowerCase();

        this.categorySlug = newSlug;
        this.categoryTitle = this.getCategoryTitle(newSlug);
        this.selectedSubcategory = 'Tout';

        this.loadArticles();

        // ✅ Force Angular à re-render le template
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadArticles(): void {
    this.articles = this.demoArticles.filter(
      (article) => this.getArticleCategorySlug(article) === this.categorySlug
    );

    this.subcategories = [
      ...new Set(
        this.articles
          .map((article) => article.sousCategorie)
          .filter((subcategory): subcategory is string => !!subcategory)
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
    if (typeof image === 'string') return image;
    if (image?.url) return image.url;
    if (image?.data?.attributes?.url) return image.data.attributes.url;
    if (image?.formats?.medium?.url) return image.formats.medium.url;
    if (image?.data?.attributes?.formats?.medium?.url) return image.data.attributes.formats.medium.url;
    return '/assets/images/article-placeholder.jpg';
  }

  private getArticleCategorySlug(article: Article): string {
    const category = article.categorie;
    if (typeof category === 'string') {
      return category.toLowerCase().replace(/\s+/g, '-');
    }
    const slug = category?.slug;
    if (slug) return String(slug).toLowerCase();
    const name = category?.nom ?? category?.libelle ?? category?.titre ?? '';
    return String(name)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
  }

  private getCategoryTitle(slug: string): string {
    const titles: Record<string, string> = {
      afrique: 'AFRIQUE',
      internationale: 'INTERNATIONALE',
      international: 'INTERNATIONAL',
      politique: 'POLITIQUE',
      economie: 'ÉCONOMIE',
      societe: 'SOCIÉTÉ',
      culture: 'CULTURE',
      sport: 'SPORT',
      'faits-divers': 'FAITS DIVERS',
      'tech-science': 'TECH & SCIENCE',
      technologie: 'TECHNOLOGIE',
      sante: 'SANTÉ',
    };
    return titles[slug] ?? slug.replace(/-/g, ' ').toUpperCase();
  }

  // ─────────────────────────────────────────────────────────────
  // Articles de démonstration
  // ─────────────────────────────────────────────────────────────
  private readonly demoArticles: Article[] = [
    // ═══════════════ ÉCONOMIE ═══════════════
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
    {
      id: 3,
      titre: 'Bourse régionale : une semaine marquée par la volatilité',
      resume:
        'Les investisseurs restent prudents face aux annonces des banques centrales et aux tensions géopolitiques.',
      image: '/assets/images/bourse.jpg',
      contenu: '',
      categorie: { nom: 'Économie', slug: 'economie' },
      sousCategorie: 'Finance',
      date: '2026-10-15',
      datePublication: '2026-10-15',
      choixRedaction: false,
      auteur: null,
      priorite: null,
      format: null,
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
    },

    // ═══════════════ AFRIQUE ═══════════════
    {
      id: 4,
      titre: 'Sommet de l’Union africaine : sécurité et commerce au menu',
      resume:
        'Les chefs d’État réunis à Addis-Abeba tentent d’accélérer la mise en œuvre de la ZLECAf.',
      image: '/assets/images/sommet-ua.jpeg',
      contenu: '',
      categorie: { nom: 'Afrique', slug: 'afrique' },
      sousCategorie: 'Politique',
      date: '2026-10-15',
      datePublication: '2026-10-15',
      choixRedaction: false,
      auteur: null,
      priorite: null,
      format: null,
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
    },
    {
      id: 5,
      titre: 'Sahel : la coopération régionale à l’épreuve du terrain',
      resume:
        'Les forces conjointes multiplient les opérations malgré des moyens logistiques limités.',
      image: '/assets/images/afrique-secu.jpg',
      contenu: '',
      categorie: { nom: 'Afrique', slug: 'afrique' },
      sousCategorie: 'Sécurité',
      date: '2026-10-14',
      datePublication: '2026-10-14',
      choixRedaction: false,
      auteur: null,
      priorite: null,
      format: null,
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
    },
    {
      id: 6,
      titre: 'Cacao : les cours mondiaux atteignent des sommets',
      resume:
        'Les producteurs ouest-africains négocient âprement les prix face à une demande en hausse.',
      image: '/assets/images/cacao.jpeg',
      contenu: '',
      categorie: { nom: 'Afrique', slug: 'afrique' },
      sousCategorie: 'Économie',
      date: '2026-10-13',
      datePublication: '2026-10-13',
      choixRedaction: false,
      auteur: null,
      priorite: null,
      format: null,
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
    },

    // ═══════════════ INTERNATIONALE ═══════════════
    {
      id: 7,
      titre: 'États-Unis : l’économie face au spectre d’un shutdown prolongé',
      resume:
        'Les négociations budgétaires patinent, menaçant des milliers de fonctionnaires fédéraux.',
      image: '/assets/images/usa.jpeg',
      contenu: '',
      categorie: { nom: 'Internationale', slug: 'internationale' },
      sousCategorie: 'États-Unis',
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
      id: 8,
      titre: 'Europe : la question migratoire divise les Vingt-Sept',
      resume:
        'Un sommet extraordinaire est convoqué pour tenter d’harmoniser les politiques d’accueil.',
      image: '/assets/images/euro.jpeg',
      contenu: '',
      categorie: { nom: 'Internationale', slug: 'internationale' },
      sousCategorie: 'Europe',
      date: '2026-10-14',
      datePublication: '2026-10-14',
      choixRedaction: false,
      auteur: null,
      priorite: null,
      format: null,
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
    },

    // ═══════════════ POLITIQUE ═══════════════
    {
      id: 9,
      titre: 'Réforme constitutionnelle : le débat relancé',
      resume:
        'La classe politique s’oppose sur le calendrier et le périmètre de la révision.',
      image: '/assets/images/politique.png',
      contenu: '',
      categorie: { nom: 'Politique', slug: 'politique' },
      sousCategorie: 'Institutions',
      date: '2026-10-15',
      datePublication: '2026-10-15',
      choixRedaction: false,
      auteur: null,
      priorite: null,
      format: null,
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
    },
    {
      id: 10,
      titre: 'Élections locales : les camps se préparent',
      resume:
        'À quelques mois du scrutin, les formations politiques peaufinent leurs stratégies.',
      image: '/assets/images/elections.jpg',
      contenu: '',
      categorie: { nom: 'Politique', slug: 'politique' },
      sousCategorie: 'Élections',
      date: '2026-10-12',
      datePublication: '2026-10-12',
      choixRedaction: false,
      auteur: null,
      priorite: null,
      format: null,
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
    },

    // ═══════════════ SOCIÉTÉ ═══════════════
    {
      id: 11,
      titre: 'Rentrée scolaire : les établissements sous tension',
      resume:
        'Manque d’enseignants, classes surchargées et infrastructures dégradées dans plusieurs régions.',
      image: '/assets/images/education.jpg',
      contenu: '',
      categorie: { nom: 'Société', slug: 'societe' },
      sousCategorie: 'Éducation',
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
      id: 12,
      titre: 'Santé publique : la couverture vaccinale progresse',
      resume:
        'Les campagnes de sensibilisation portent leurs fruits, mais des disparités subsistent.',
      image: '/assets/images/vaccination.jpg',
      contenu: '',
      categorie: { nom: 'Société', slug: 'societe' },
      sousCategorie: 'Santé',
      date: '2026-10-13',
      datePublication: '2026-10-13',
      choixRedaction: false,
      auteur: null,
      priorite: null,
      format: null,
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
    },

    // ═══════════════ CULTURE ═══════════════
    {
      id: 13,
      titre: 'Festival international du film : une édition record',
      resume:
        'Plus de 80 films projetés et une fréquentation en hausse de 30 % par rapport à 2025.',
      image: '/assets/images/mamebety.jpeg',
      contenu: '',
      categorie: { nom: 'Culture', slug: 'culture' },
      sousCategorie: 'Cinéma',
      date: '2026-10-12',
      datePublication: '2026-10-12',
      choixRedaction: false,
      auteur: null,
      priorite: null,
      format: null,
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
    },
    {
      id: 14,
      titre: 'Musique : la nouvelle scène africaine s’exporte',
      resume:
        'Les artistes du continent enchaînent les tournées et les collaborations internationales.',
      image: '/assets/images/you.jpeg',
      contenu: '',
      categorie: { nom: 'Culture', slug: 'culture' },
      sousCategorie: 'Musique',
      date: '2026-10-10',
      datePublication: '2026-10-10',
      choixRedaction: false,
      auteur: null,
      priorite: null,
      format: null,
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
    },

    // ═══════════════ SPORT ═══════════════
    {
      id: 15,
      titre: 'Lutte : les champions se préparent pour la saison',
      resume:
        'Les écuries rivalisent d’intensité à l’approche des grands tournois nationaux.',
      image: '/assets/images/franc.jpeg',
      contenu: '',
      categorie: { nom: 'Sport', slug: 'sport' },
      sousCategorie: 'Lutte',
      date: '2026-10-14',
      datePublication: '2026-10-14',
      choixRedaction: false,
      auteur: null,
      priorite: null,
      format: null,
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
    },
    {
      id: 16,
      titre: 'Football : le championnat reprend ses droits',
      resume:
        'Les cadors entament la saison avec des effectifs renforcés et des ambitions affichées.',
      image: '/assets/images/foot.jpg',
      contenu: '',
      categorie: { nom: 'Sport', slug: 'sport' },
      sousCategorie: 'Football',
      date: '2026-10-11',
      datePublication: '2026-10-11',
      choixRedaction: false,
      auteur: null,
      priorite: null,
      format: null,
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
    },
    {
      id: 17,
      titre: 'Basket : la sélection nationale vise le podium',
      resume:
        'Après une préparation intense, le groupe affiche une confiance mesurée mais réelle.',
      image: '/assets/images/basket.jpeg',
      contenu: '',
      categorie: { nom: 'Sport', slug: 'sport' },
      sousCategorie: 'Basket',
      date: '2026-10-09',
      datePublication: '2026-10-09',
      choixRedaction: false,
      auteur: null,
      priorite: null,
      format: null,
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
    },

    // ═══════════════ FAITS DIVERS ═══════════════
    {
      id: 18,
      titre: 'Xalass : un fait divers qui secoue le quartier',
      resume:
        'Les autorités enquêtent sur les circonstances exactes de l’incident survenu ce week-end.',
      image: '/assets/images/route.jpeg',
      contenu: '',
      categorie: { nom: 'Faits divers', slug: 'faits-divers' },
      sousCategorie: 'Enquête',
      date: '2026-10-13',
      datePublication: '2026-10-13',
      choixRedaction: false,
      auteur: null,
      priorite: null,
      format: null,
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
    },
    {
      id: 19,
      titre: 'Accident sur la route nationale : le trafic perturbé',
      resume:
        'Les secours sont intervenus rapidement, mais la circulation reste difficile dans les deux sens.',
      image: '/assets/images/accident.jpeg',
      contenu: '',
      categorie: { nom: 'Faits divers', slug: 'faits-divers' },
      sousCategorie: 'Route',
      date: '2026-10-11',
      datePublication: '2026-10-11',
      choixRedaction: false,
      auteur: null,
      priorite: null,
      format: null,
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
    },

    // ═══════════════ TECH & SCIENCE ═══════════════
    {
      id: 20,
      titre: 'Intelligence artificielle : l’Afrique accélère sa stratégie',
      resume:
        'Plusieurs pays lancent des programmes nationaux pour former et attirer les talents du numérique.',
      image: '/assets/images/ia.jpeg',
      contenu: '',
      categorie: { nom: 'Tech & Science', slug: 'tech-science' },
      sousCategorie: 'Intelligence artificielle',
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
      id: 21,
      titre: 'Espace : une nouvelle mission d’observation lancée',
      resume:
        'Le satellite doit améliorer le suivi des ressources en eau et des zones arides.',
      image: '/assets/images/espace.jpeg',
      contenu: '',
      categorie: { nom: 'Tech & Science', slug: 'tech-science' },
      sousCategorie: 'Espace',
      date: '2026-10-10',
      datePublication: '2026-10-10',
      choixRedaction: false,
      auteur: null,
      priorite: null,
      format: null,
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
    },
    {
      id: 22,
      titre: 'Cybersécurité : les entreprises face à la recrudescence des attaques',
      resume:
        'Les experts appellent à renforcer la formation des équipes et la surveillance des réseaux.',
      image: '/assets/images/secu.jpeg',
      contenu: '',
      categorie: { nom: 'Tech & Science', slug: 'tech-science' },
      sousCategorie: 'Cybersécurité',
      date: '2026-10-08',
      datePublication: '2026-10-08',
      choixRedaction: false,
      auteur: null,
      priorite: null,
      format: null,
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
    },
  ];
}
