import { BookService } from './../services/book.service';
import { delay, exhaustMap, Observable, switchMap, tap } from 'rxjs';
import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { BookState } from "../../shared/models/book-state";
import { BookRequest } from "../../shared/models/book-request";
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BookStore extends ComponentStore<BookState> {

  bookView$ = this.select({
    loading: this.select((state) => state.loading),
    reservationsList: this.select((state) => state.reservationsList),
    resevertionSuccess: this.select((state) => state.resevertionSuccess),
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

  setResevations = this.updater(
    (state, reservationsList: any): BookState => ({
      ...state,
      reservationsList
    })
  )

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
}
