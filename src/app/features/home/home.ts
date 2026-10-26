import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleSliderComponent } from '../../shared/components/article-slider/article-slider';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ArticleSliderComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {

  // 1. Slider Hero
  articles: any[] = [
    { id: 1, titre: 'Réforme économique majeure', categorie: 'POLITIQUE', image: 'https://picsum.photos/seed/pol/1200/600' },
    { id: 2, titre: 'Le Sénégal mise sur l\'intelligence artificielle', categorie: 'TECH', image: 'https://picsum.photos/seed/tech/1200/600' }
  ];

  // 2. L'essentiel du jour
  essentielArticles: any[] = [
    { id: 10, titre: 'Réforme économique majeure', categorie: 'POLITIQUE', image: 'https://picsum.photos/seed/pol/600/400', isVideo: false },
    { id: 11, titre: 'Finale historique', categorie: 'SPORT', image: 'https://picsum.photos/seed/caf/600/400', isVideo: false },
    { id: 12, titre: 'CAN 2025 : Le Sénégal sacré face au Maroc', categorie: 'SPORT', image: 'https://picsum.photos/seed/win/600/400', isVideo: false },
    { id: 13, titre: 'Lutte sénégalaise : prêt pour un nouveau combat', categorie: 'SPORT', image: 'https://picsum.photos/seed/lutte/600/400', isVideo: true }
  ];

  // 3. Les minutes xamlé
  minutesXamle: any[] = [
    { id: 20, titre: 'Interview – Thierno Samassa : parcours spirituel et héritage d’un guide respecté', image: 'https://picsum.photos/seed/thierno/600/400' },
    { id: 21, titre: 'Analyse - Santé mentale au Sénégal : briser le silence et les tabous', image: 'https://picsum.photos/seed/sante/600/400' },
    { id: 22, titre: 'Interview – Foncier au Sénégal : comprendre les causes d’un conflit permanent', image: 'https://picsum.photos/seed/foncier/600/400' }
  ];

  // 4. Dernières actualités
  dernieresActus: any[] = [
    { id: 30, titre: 'Économie : la croissance africaine en hausse', categorie: 'ÉCO', image: 'https://picsum.photos/seed/eco/400/300', date: 'Il y a 2h' },
    { id: 31, titre: 'Culture : le festival de Dakar bat son plein', categorie: 'CULTURE', image: 'https://picsum.photos/seed/cult/400/300', date: 'Il y a 4h' },
    { id: 32, titre: 'Politique : nouveaux enjeux diplomatiques', categorie: 'POLITIQUE', image: 'https://picsum.photos/seed/dip/400/300', date: 'Il y a 5h' }
  ];

    // 5. Fil d'actualité "Li Geuneu Fess" (Sidebar)
  hotNews: any[] = [
    { id: 40, titre: 'Le prix du carburant ajusté à la pompe', time: 'Il y a 15 min' },
    { id: 41, titre: 'Nomination surprise au ministère de l\'Éducation', time: 'Il y a 45 min' },
    { id: 42, titre: 'Dakar accueille le sommet sur le climat la semaine prochaine', time: 'Il y a 2h' },
    { id: 43, titre: 'L\'équipe nationale dévoile sa nouvelle liste', time: 'Il y a 3h' },
    { id: 44, titre: 'Hausse des exportations de poisson ce trimestre', time: 'Il y a 4h' }
  ];
}
