import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { delay, exhaustMap } from 'rxjs';
import {
  CarResponse,
  carsInitialState,
  CarsState,
} from '../../shared/models/cars-models';
import { CarsService } from '../services/cars.service';
@Injectable()
export class CarsStore extends ComponentStore<CarsState> {
  constructor(private carsService: CarsService) {
    super(carsInitialState);
  }

  readonly carsList$ = this.select((state) => state.carsList);
  readonly laoding$ = this.select((state) => state.loading);
  readonly selectedCar$ = this.select((state) => state.selectedCar);

  setCars = this.updater(
    (state, carsList: CarResponse[]): CarsState => ({
      ...state,
      carsList,
    })
  );

  setLoading = this.updater(
    (state, loading: boolean): CarsState => ({
      ...state,
      loading,
    })
  );

  setSelectedCar = this.updater(
    (state, selectedCarId: string): CarsState => ({
      ...state,
      selectedCar: state.carsList.filter((el) => el.id === selectedCarId)[0],
    })
  );

  readonly load = this.effect<void>((cars$) =>
    cars$.pipe(
      exhaustMap(() => {
        this.setLoading(true);
        return this.carsService.list().pipe(
          delay(1000),
          tapResponse({
            next: (carsList) => this.setCars(carsList),
            error: (error: HttpErrorResponse) => console.log(error),
            finalize: () => this.setLoading(false),
          })
        );
      })
    )
  );
}
