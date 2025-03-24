import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarsStore } from '../../cars/store/cars.store';
import {
  BookRequest,
  ReservationsResponse,
} from '../../shared/models/book-models';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private form!: FormGroup;

  constructor(private _fb: FormBuilder, public readonly store: CarsStore) {}

  get bookForm(): FormGroup {
    return this.form ? this.form : this.formInit();
  }

  formInit(): FormGroup {
    this.form = this._fb.group({
      id: null,
      car_id: ['', Validators.required],
      customer_name: ['', Validators.required],
      pickup_time: ['', Validators.required],
      dropoff_time: ['', Validators.required],
    });
    return this.form;
  }

  formRequest(): BookRequest {
    return {
      id: this.form.get('id')?.value,
      car_id: this.form.get('car_id')?.value,
      customer_name: this.form.get('customer_name')?.value,
      dropoff_time: this.form.get('dropoff_time')?.value,
      pickup_time: this.form.get('pickup_time')?.value,
    };
  }

  fillForm(data: ReservationsResponse) {
    this.form.patchValue({
      id: data.id,
      customer_name: data.customer_name,
      pickup_time: data.pickup_time,
      dropoff_time: data.dropoff_time,
    });
  }
}
