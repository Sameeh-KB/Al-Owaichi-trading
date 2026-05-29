import { Routes } from '@angular/router';
import { adminAuthGuard } from './guards/auth.guard';

export const adminRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login').then(m => m.AdminLogin),
  },
  {
    path: '',
    loadComponent: () => import('./shell/admin-shell').then(m => m.AdminShell),
    canActivate: [adminAuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard').then(m => m.AdminDashboard),
      },
      {
        path: 'bikes',
        loadComponent: () => import('./bikes/bikes').then(m => m.AdminBikes),
      },
      {
        path: 'inquiries',
        loadComponent: () => import('./inquiries/inquiries').then(m => m.AdminInquiries),
      },
      {
        path: 'uploads',
        loadComponent: () => import('./uploads/uploads').then(m => m.AdminUploads),
      },
    ],
  },
];
