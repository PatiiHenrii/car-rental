import { ReservationsResponse } from "./book-request";

export interface BookState {
  loading: boolean;
  reservationsList?: ReservationsResponse[],
  resevertionSuccess?: boolean,
}
