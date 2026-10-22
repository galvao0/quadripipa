import { Routes } from '@angular/router';
import { Login } from '../pages/login/login';
import { Home } from '../pages/home/home';
import { Signup } from '../pages/signup/signup';
import { VerifyEmail } from '../pages/verify-email/verify-email';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'signup',
    component: Signup,
  },
  {
    path: 'verify-email',
    component: VerifyEmail,
  },
];
