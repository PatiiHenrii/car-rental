import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { environment } from "../../../environments";
import { CarResponse } from "../../shared/models/cars-models";

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

