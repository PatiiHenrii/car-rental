import { Routes } from '@angular/router';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { BookComponent } from './components/book/book.component';

export const BOOK_ROUTES: Routes = [
  { path: '', component: BookComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'reservations/:id', component: BookComponent },
];
