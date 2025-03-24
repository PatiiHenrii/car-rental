import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'cars'},
  {path: 'cars', loadChildren: () => import('./cars/cars.routes').then( r => r.CARS_ROUTES)},
  {path: 'not-found', loadComponent: () => import('./shared/not-found/not-found.component').then(c => c.NotFoundComponent)},
  {path: 'error', loadComponent: () => import('./shared/error/error.component').then(c => c.ErrorComponent)}
];
