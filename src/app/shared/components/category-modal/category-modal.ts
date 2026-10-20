import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Categorie } from '../../../core/models/categorie.model';

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-modal.html',
  styleUrl: './category-modal.scss'
})
export class CategoryModalComponent {
  @Output() close = new EventEmitter<void>();

  constructor(private readonly router: Router) {}

  readonly categories: Categorie[] = [
    { id: 1, libelle: 'Afrique',       icone: '🌍', image: 'assets/rubriques/afrique.png' },
    { id: 2, libelle: 'Internationale', icone: '🌐', image: 'assets/rubriques/internationale.png' },
    { id: 3, libelle: 'Politique',     icone: '🏛️', image: 'assets/rubriques/politique.png' },
    { id: 4, libelle: 'Économie',      icone: '💰', image: 'assets/rubriques/economie.png' },
    { id: 5, libelle: 'Société',       icone: '👥', image: 'assets/rubriques/societe.png' },
    { id: 6, libelle: 'Culture',       icone: '🎭', image: 'assets/rubriques/culture.png' },
    { id: 7, libelle: 'Sport',         icone: '⚽', image: 'assets/rubriques/lutte.png' },
    { id: 8, libelle: 'Faits divers',  icone: '🚨', image: 'assets/rubriques/xalass.png' },
    { id: 9, libelle: 'Tech & Science', icone: '🔬', image: 'assets/rubriques/tech.png' },
  ];

  closeModal(): void {
    this.close.emit();
  }

  openCategory(category: Categorie): void {
    const slug = this.createSlug(category.libelle);

    void this.router
      .navigate(['/categorie', slug])
      .finally(() => this.closeModal());
  }

  private createSlug(label: string): string {
    return label
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/&/g, ' ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  onImageError(category: Categorie): void {
    console.error(
      `[Xibar24] Image introuvable pour "${category.libelle}" :`,
      category.image
    );
  }
}
