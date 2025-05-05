import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { exhaustMap, Observable, switchMap } from 'rxjs';
import { BookService } from '../../reservation/services/book.service';
import { BookRequest, BookState, ReservationsResponse } from '../../shared/models/book-models';

@Injectable()
export class BookStore extends ComponentStore<BookState> {
  bookView$ = this.select({
    loading: this.select((state) => state.loading),
    reservationsList: this.select((state) => state.reservationsList),
    resevertionSuccess: this.select((state) => state.resevertionSuccess),
    resevertionToEdit: this.select((state) => state.resevertionToEdit),
  });

  constructor(private readonly bookService: BookService) {
    super({
      loading: false,
      reservationsList: [],
      resevertionSuccess: true,
      resevertionToEdit: undefined
     });
  }

  setLoading = this.updater(
    (state, loading: boolean): BookState => ({
      ...state,
      loading,
    }),
  );

  setSuccess = this.updater(
    (state, resevertionSuccess: boolean): BookState => ({
      ...state,
      resevertionSuccess,
    }),
  );

  setResevations = this.updater(
    (state, reservationsList: ReservationsResponse[]): BookState => ({
      ...state,
      reservationsList,
    }),
  );

  setResevertionToEdit = this.updater(
    (state, resevertionToEdit: ReservationsResponse): BookState => ({
      ...state,
      resevertionToEdit,
    }),
  );

  getResevertionToEdit(): ReservationsResponse | undefined {
    return this.get((state) => state.resevertionToEdit);
  }

  readonly load = this.effect<void>((reservations$) =>
    reservations$.pipe(
      exhaustMap(() => {
        this.setLoading(true);
        return this.bookService.list().pipe(
          tapResponse({
            next: (reservations) => this.setResevations(reservations),
            error: (error: HttpErrorResponse) => console.log(error),
            finalize: () => this.setLoading(false),
          }),
        );
      }),
    ),
  );

  readonly bookCar = this.effect((bookRequest$: Observable<BookRequest>) => {
    this.setLoading(true);
    return bookRequest$.pipe(
      switchMap((request) =>
        this.bookService.book(request).pipe(
          tapResponse({
            next: (response) => {
              console.log(response);
              this.setSuccess(true)
              this.setLoading(false)
            },
            error: () => {
              this.setSuccess(false)
              this.setLoading(false)
            },
          }),
        ),
      ),
    );
  });

  readonly updateBook = this.effect((bookRequest$: Observable<BookRequest>) => {
    this.setLoading(true);
    return bookRequest$.pipe(
      switchMap((request) =>
        this.bookService.update(request).pipe(
          tapResponse({
            next: (response) => {
              console.log(response);
              this.setSuccess(true)
              this.setLoading(false)
            },
            error: () => {
              this.setSuccess(false)
              this.setLoading(false)
            },
          }),
        ),
      ),
    );
  });

  readonly deleteBook = this.effect((bookRequest$: Observable<string>) => {
    this.setLoading(true);
    return bookRequest$.pipe(
      switchMap((request) =>
        this.bookService.delete(request).pipe(
          tapResponse({
            next: (response) => {
              console.log(response);
              this.setLoading(false);
              this.load();
            },
            error: () => this.setLoading(false),
          }),
        ),
      ),
    );
  });
}
