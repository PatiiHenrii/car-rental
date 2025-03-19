import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private readonly API = `https://api.example.com/rentals`;

  constructor(private http: HttpClient) { }

  list() {
    return of (carsList)
    return this.http.get<any>(`${this.API}/cars`);
  }


}


const carsList = [
  {
    "id": 1,
    "manufacturer": "Toyota",
    "model": "Corolla",
    "license_plate": "ABC-1234",
    "year": "2022",
    "rate_per_day": 45,
    "status": "active"
  },
  {
    "id": 2,
    "manufacturer": "Honda",
    "model": "Civic",
    "license_plate": "XYZ-5678",
    "year": "2023",
    "rate_per_day": 50,
    "status": "inactive"
  },
  {
    "id": 3,
    "manufacturer": "Ford",
    "model": "Mustang",
    "license_plate": "LMN-9012",
    "year": "2021",
    "rate_per_day": 120,
    "status": "active"
  },
  {
    "id": 4,
    "manufacturer": "Chevrolet",
    "model": "Onix",
    "license_plate": "QWE-3456",
    "year": "2024",
    "rate_per_day": 35,
    "status": "inactive"
  },
  {
    "id": 5,
    "manufacturer": "Volkswagen",
    "model": "Golf GTI",
    "license_plate": "RTY-7890",
    "year": "2022",
    "rate_per_day": 75,
    "status": "active"
  },
  {
    "id": 6,
    "manufacturer": "Tesla",
    "model": "Model 3",
    "license_plate": "UIO-1111",
    "year": "2023",
    "rate_per_day": 90,
    "status": "inactive"
  },
  {
    "id": 7,
    "manufacturer": "BMW",
    "model": "M3",
    "license_plate": "PAS-2222",
    "year": "2022",
    "rate_per_day": 150,
    "status": "active"
  },
  {
    "id": 8,
    "manufacturer": "Mercedes-Benz",
    "model": "C-Class",
    "license_plate": "DFG-3333",
    "year": "2023",
    "rate_per_day": 130,
    "status": "inactive"
  },
  {
    "id": 9,
    "manufacturer": "Hyundai",
    "model": "Tucson",
    "license_plate": "JKL-4444",
    "year": "2024",
    "rate_per_day": 60,
    "status": "active"
  },
  {
    "id": 10,
    "manufacturer": "Nissan",
    "model": "Altima",
    "license_plate": "MNO-5555",
    "year": "2023",
    "rate_per_day": 55,
    "status": "inactive"
  }
]
