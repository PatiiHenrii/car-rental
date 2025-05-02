import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { BookStore } from '../../store/book.store';
import { ReservationsResponse } from '../../../shared/models/book-models';

@Component({
  selector: 'app-reservations',
  imports: [MatTableModule, AsyncPipe, MatIconModule, MatButtonModule, DatePipe],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss',
  standalone: true,
})
export class ReservationsComponent implements OnInit {
  public bookStore = inject(BookStore);
  bookView$ = this.bookStore.bookView$;

  constructor(private router: Router) {}

  displayedColumns: string[] = [
    'car_id',
    'customer_name',
    'pickup_time',
    'dropoff_time',
    'total_price',
    'actions',
  ];

  ngOnInit(): void {
    this.bookStore.load();
  }

  edit(reservation: ReservationsResponse) {
    this.bookStore.setResevertionToEdit(reservation);
    this.router.navigateByUrl(`book/reservations/${reservation.id}`);
  }

  delete(bookId: string) {
    this.bookStore.deleteBook(bookId);
  }
}
