import { tapResponse } from '@ngrx/operators';
import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store"
import { carsInitialState, CarsState } from "../../shared/models/cars-state";
import { CarsService } from "../services/cars.service";
import { delay, exhaustMap, timeout } from "rxjs";
import { CarResponse } from '../../shared/models/car-response';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class CarsStore extends ComponentStore<CarsState> {
  constructor(
    private carsService: CarsService,
  ) {
    super(carsInitialState)
  }

  readonly carsList$ = this.select((state) => state.carsList);
  readonly laoding$ = this.select((state) => state.loading);


  setCars = this.updater(
    (state, carsList: CarResponse[]): CarsState => ({
      ...state,
      carsList
    })
  )

  setLoading = this.updater(
    (state, loading: boolean): CarsState => ({
      ...state,
      loading
    })
  )


  readonly load = this.effect<void>(
    (cars$) => cars$.pipe(
      exhaustMap(() => {
        this.setLoading(true);
        return this.carsService.list().pipe(
          delay(5000),
          tapResponse({
            next: (carsList) => this.setState({loading: false, carsList}),
            error: (error: HttpErrorResponse) => console.log(error)
          })
        )
      }
      )
    )
  )
}
