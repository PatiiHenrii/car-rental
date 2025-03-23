import { BookService } from './../services/book.service';
import { delay, exhaustMap, Observable, switchMap, tap, withLatestFrom } from 'rxjs';
import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { BookState } from "../../shared/models/book-state";
import { BookRequest, ReservationsResponse } from "../../shared/models/book-request";
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BookStore extends ComponentStore<BookState> {

  bookView$ = this.select({
    loading: this.select((state) => state.loading),
    reservationsList: this.select((state) => state.reservationsList),
    resevertionSuccess: this.select((state) => state.resevertionSuccess),
    resevertionToEdit: this.select((state) => state.resevertionToEdit),
  })

  constructor(private readonly bookService: BookService){
    super({loading: false})
  }

  setLoading = this.updater(
    (state, loading: boolean): BookState => ({
      ...state,
      loading
    })
  )

  setSuccess = this.updater(
    (state, resevertionSuccess: boolean): BookState => ({
      ...state,
      resevertionSuccess
    })
  )

  setResevations = this.updater(
    (state, reservationsList: ReservationsResponse[]): BookState => ({
      ...state,
      reservationsList
    })
  )

  setResevertionToEdit = this.updater(
    (state, resevertionToEdit: ReservationsResponse): BookState => ({
      ...state,
      resevertionToEdit
    })
  )

  getResevertionToEdit(): ReservationsResponse | undefined {
    return this.get(state => state.resevertionToEdit)
  }

  readonly load = this.effect<void>(
    (reservations$) => reservations$.pipe(
      exhaustMap(() => {
        this.setLoading(true);
        return this.bookService.list().pipe(
          delay(1000),
          tapResponse({
            next: (reservations) => this.setResevations(reservations),
            error: (error: HttpErrorResponse) => console.log(error),
            finalize: () => this.setLoading(false)
          })
        )
      }
      )
    )
  )

  readonly bookCar = this.effect((bookRequest$: Observable<BookRequest>) => {
    this.setLoading(true);
    return bookRequest$.pipe(
      switchMap((request) => this.bookService.book(request).pipe(
        tapResponse({
          next:(response) => {
            console.log(response);
            this.setState({resevertionSuccess: true, loading: false})
          },
          error:() => this.setState({resevertionSuccess: false, loading: false}),
        })
      )
    ))
  })

  readonly updateBook = this.effect((bookRequest$: Observable<BookRequest>) => {
    this.setLoading(true);
    const bookId = this.getResevertionToEdit()?.id;
    return bookRequest$.pipe(
      switchMap((request) => this.bookService.update(request).pipe(
        tapResponse({
          next:(response) => {
            console.log(response);
            this.setState({resevertionSuccess: true, loading: false})
          },
          error:() => this.setState({resevertionSuccess: false, loading: false}),
        })
      )
    ))
  })

  readonly deleteBook = this.effect((bookRequest$: Observable<string>) => {
    this.setLoading(true);
    return bookRequest$.pipe(
      switchMap((request) => this.bookService.delete(request).pipe(
        tapResponse({
          next:(response) => {
            console.log(response);
            this.setLoading(false);
            this.load()
          },
          error:() => this.setLoading(false),
        })
      )
    ))
  })
}
