import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { CarResponse } from "../../shared/models/car-response";
import { environment } from "../../../environments";

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private readonly API = environment.API;

  constructor(private http: HttpClient) { }

  list(): Observable<CarResponse[]> {
    return this.http.get<CarResponse[]>(`${this.API}/cars`);
  }


}


const carsList: CarResponse[] = []
