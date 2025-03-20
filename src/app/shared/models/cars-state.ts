import { CarResponse } from "./car-response";

export interface CarsState {
  loading: boolean;
  carsList: Array<CarResponse>
  selectedCar?: CarResponse
}

export const carsInitialState: CarsState = {
  loading: false,
  carsList: [],
}
