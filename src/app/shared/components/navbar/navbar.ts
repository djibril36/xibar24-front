import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent implements OnInit {

  @Output()
  openCategories = new EventEmitter<void>();

  darkMode = false;

  constructor(
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {

    this.darkMode =
      this.themeService.isDarkMode();
  }

  toggleTheme(): void {

    this.darkMode =
      this.themeService.toggleTheme() === 'dark';
  }

  openMenu(): void {

    this.openCategories.emit();
  }
}
