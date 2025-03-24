import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BookFormComponent } from '../book-form/book-form.component';
import { CarsCardComponent } from '../../../cars/components/cars-card/cars-card.component';
import { BookStore } from '../../store/book.store';
import { CarsStore } from '../../../cars/store/cars.store';

@Component({
  selector: 'app-book',
  imports: [AsyncPipe, CarsCardComponent, BookFormComponent, MatButtonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
})
export class BookComponent implements OnInit {
  private bookStore = inject(BookStore);
  bookView$ = this.bookStore.bookView$;

  constructor(public readonly store: CarsStore) {}

  ngOnInit(): void {
    this.bookStore.setSuccess(false);
    this.store.load();
  }
}
