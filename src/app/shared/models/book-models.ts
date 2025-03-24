export interface BookRequest {
  "id": string,
  "car_id": string,
  "customer_name": string,
  "pickup_time": string,
  "dropoff_time": string
}

export interface BookResponse {
  "reservation_id": string,
  "success": boolean
}

export interface ReservationsResponse {
  "id": string,
  "car_id": string,
  "customer_name": string,
  "pickup_time": string,
  "dropoff_time": string,
  "total_price": number,
  "status": string
}

export interface BookState {
  loading: boolean;
  reservationsList?: ReservationsResponse[],
  resevertionSuccess?: boolean,
  resevertionToEdit?: ReservationsResponse,
}
