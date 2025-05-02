export interface CarsState {
  loading: boolean;
  carsList: CarResponse[];
  selectedCar: CarResponse | undefined;
}

export const carsInitialState: CarsState = {
  loading: false,
  carsList: [],
  selectedCar: undefined,
};

export interface CarResponse {
  id: string;
  manufacturer: string;
  model: string;
  license_plate: string;
  year: number;
  rate_per_day: number;
  status: string;
}
