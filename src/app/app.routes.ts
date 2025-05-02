import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'cars' },
  {
    path: 'cars',
    loadComponent: () =>
      import('./cars/components/cars-list/cars-list.component').then((c) => c.CarsListComponent),
  },
  {
    path: 'book',
    loadChildren: () => import('./reservation/reservation.routes').then((r) => r.BOOK_ROUTES),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./shared/not-found/not-found.component').then((c) => c.NotFoundComponent),
  },
  {
    path: 'error',
    loadComponent: () => import('./shared/error/error.component').then((c) => c.ErrorComponent),
  },
];
