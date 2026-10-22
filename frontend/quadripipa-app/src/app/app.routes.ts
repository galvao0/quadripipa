import { Routes } from '@angular/router';
import { VerifyEmail } from '../pages/verify-email/verify-email';
import { authGuard } from '../service/auth/auth-guard';
import { guestGuard } from '../service/auth/guest-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/login/login').then((m) => m.Login),
    canActivate: [guestGuard],
  },
  {
    path: 'home',
    loadComponent: () => import('../pages/home/home').then((m) => m.Home),
    canActivate: [authGuard],
  },
  {
    path: 'signup',
    loadComponent: () => import('../pages/signup/signup').then((m) => m.Signup),
    canActivate: [guestGuard],
  },
  {
    path: 'verify-email',
    component: VerifyEmail,
  },
];
