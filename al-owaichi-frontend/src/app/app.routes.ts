import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/products').then((m) => m.Products),
  },
  {
    path: 'brands',
    loadComponent: () => import('./features/brands/brands').then((m) => m.Brands),
  },
  {
    path: 'showroom',
    loadComponent: () => import('./features/showroom/showroom').then((m) => m.Showroom),
  },
  {
    path: 'bike/:slug',
    loadComponent: () => import('./features/bike-detail/bike-detail').then((m) => m.BikeDetail),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
