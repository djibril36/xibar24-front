import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    loadComponent: () =>
      import('./features/home/home')
        .then(m => m.Home)
  },

  {
    path: 'categorie/:slug',
    loadComponent: () =>
      import('./features/category/category')
        .then(m => m.Category)
  },

  {
    path: 'article/:id',
    loadComponent: () =>
      import('./features/article/article')
        .then(m => m.Article)
  },

  {
    path: 'live',
    loadComponent: () =>
      import('./features/live/live')
        .then(m => m.Live)
  },

  {
    path: '**',
    redirectTo: ''
  }
];
