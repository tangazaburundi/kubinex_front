import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/public/home.component').then(m => m.HomeComponent) },
  { path: 'admin/login', loadComponent: () => import('./pages/admin/login.component').then(m => m.LoginComponent) },
  { path: 'admin/dashboard', loadComponent: () => import('./pages/admin/dashboard.component').then(m => m.DashboardComponent), canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];
