import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookRequest, BookResponse, ReservationsResponse } from '../../shared/models/book-request';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly API = environment.API;

  constructor(private http: HttpClient) { }

  list(): Observable<ReservationsResponse[]> {
    return this.http.get<ReservationsResponse[]>(`${this.API}/reservations`);
  }

  book(book: BookRequest): Observable<BookResponse> {
    console.log('BookService', book);
    return this.http.post<BookResponse>(`${this.API}/reservations`, book);
  }


}

const res: BookResponse = {
  reservation_id: "1",
  success: true
}
