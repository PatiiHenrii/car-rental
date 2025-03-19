import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'cars'},
  {path: 'cars', loadChildren: () => import('./cars/cars.routes').then( r => r.CARS_ROUTES)}
];
