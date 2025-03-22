import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CarsStore } from '../../store/cars.store';
import { CarsCardComponent } from '../cars-card/cars-card.component';
import { BookFormComponent } from '../book-form/book-form.component';
import { BookStore } from '../../store/book.store';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-book',
  imports: [AsyncPipe, CarsCardComponent, BookFormComponent, MatButtonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {

  private bookStore = inject(BookStore);
  bookView$ = this.bookStore.bookView$;


  constructor(public readonly store: CarsStore) {}


  ngOnInit(): void {
    // this.store.load();
  }
}
