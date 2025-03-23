import { ReservationsResponse } from "./book-request";
import { CarResponse } from "./car-response";

export interface BookState {
  loading: boolean;
  reservationsList?: ReservationsResponse[],
  resevertionSuccess?: boolean,
  resevertionToEdit?: ReservationsResponse,
}
