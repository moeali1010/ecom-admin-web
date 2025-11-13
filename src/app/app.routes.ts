import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { Login } from './pages/auth/login/login';
import { ForgetPassword } from './pages/auth/forget-password/forget-password';
import { MainLayout } from './layout/main-layout/main-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'forget-password', component: ForgetPassword },

  {
    path: '',
    component: MainLayout,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users-module').then((m) => m.UsersModule),
      },
    ],
  },

  { path: '**', component: NotFound },
];
