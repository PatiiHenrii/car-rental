import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { CarsStore } from '../../store/cars.store';
import { CarsCardComponent } from '../cars-card/cars-card.component';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
  selector: 'app-book',
  imports: [AsyncPipe, CarsCardComponent, BookFormComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {

  constructor(public readonly store: CarsStore) {}

}
