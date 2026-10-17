import { Injectable } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly STORAGE_KEY =
    'xibar-theme';

  initTheme(): void {

    const savedTheme =
      (localStorage.getItem(this.STORAGE_KEY) as Theme)
      || 'dark';

    this.setTheme(savedTheme);
  }

  setTheme(theme: Theme): void {

    document.documentElement.setAttribute(
      'data-theme',
      theme
    );

    localStorage.setItem(
      this.STORAGE_KEY,
      theme
    );
  }

  toggleTheme(): Theme {

    const nextTheme =
      this.isDarkMode()
        ? 'light'
        : 'dark';

    this.setTheme(nextTheme);

    return nextTheme;
  }

  isDarkMode(): boolean {

    return (
      document.documentElement.getAttribute(
        'data-theme'
      ) === 'dark'
    );
  }

  getCurrentTheme(): Theme {

    return this.isDarkMode()
      ? 'dark'
      : 'light';
  }
}
