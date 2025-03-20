import { Routes } from "@angular/router";
import { CarsListComponent } from "./components/cars-list/cars-list.component";
import { BookComponent } from "./components/book/book.component";

export const CARS_ROUTES: Routes = [
  { path: '', component: CarsListComponent},
  { path: 'book', component: BookComponent}
];
