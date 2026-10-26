import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Article, Auteur } from '../../../core/models/article.model';

@Component({
  selector: 'app-article-slider',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅
  templateUrl: './article-slider.html',
  styleUrl: './article-slider.scss'
})
export class ArticleSliderComponent {
  @Input({ required: true }) articles: Article[] = [];
  @ViewChild('track', { static: true }) trackRef!: ElementRef<HTMLDivElement>;

  scroll(dir: -1 | 1) {
    const el = this.trackRef.nativeElement;
    const card = el.querySelector<HTMLElement>('.article-card');
    const step = card ? card.offsetWidth : el.clientWidth; // On scroll de toute la largeur
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  }

  getAuteurNom(auteur: Auteur | string | null): string {
    if (!auteur) return 'Anonyme';
    return typeof auteur === 'string' ? auteur : auteur.nom;
  }

  imageUrl(image: any): string {
    if (!image) return '';
    if (typeof image === 'string') return image;
    if (image instanceof File) return URL.createObjectURL(image);
    if (typeof image === 'object' && 'url' in image) return image.url;
    return '';
  }

  categorieNom(categorie: any): string {
    if (!categorie) return '';
    return typeof categorie === 'string' ? categorie : (categorie.nom ?? '');
  }
}
