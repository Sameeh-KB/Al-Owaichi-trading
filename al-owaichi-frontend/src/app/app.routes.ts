import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'bike/:slug',
    loadComponent: () =>
      import('./features/bike-detail/bike-detail').then((m) => m.BikeDetail),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
