import { Routes } from '@angular/router';
import { ReservationsComponent } from '../reservation/components/reservations/reservations.component';
import { CarsListComponent } from './components/cars-list/cars-list.component';
import { BookComponent } from '../reservation/components/book/book.component';

export const CARS_ROUTES: Routes = [
  { path: '', component: CarsListComponent },
  { path: 'book', component: BookComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'reservations/:id', component: BookComponent },
];
