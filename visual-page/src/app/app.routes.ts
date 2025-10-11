import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.routing').then((m) => m.HOME_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
