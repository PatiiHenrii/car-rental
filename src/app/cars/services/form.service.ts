import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarsStore } from '../store/cars.store';
import { BookRequest } from '../../shared/models/book-request';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private form!: FormGroup;

  constructor(private _fb: FormBuilder, public readonly store: CarsStore) { }

  get bookForm(): FormGroup {
    return this.form ? this.form : this.formInit();
  }

  formInit(): FormGroup {
    this.form = this._fb.group({
      car: ['', Validators.required],
      customer_name: ['', Validators.required],
      pickup_time: ['', Validators.required],
      dropoff_time: ['', Validators.required]
    });
    return this.form;
  }

  formRequest(): BookRequest {
    return {
      car_id: this.form.get('car')?.value.id,
      customer_name: this.form.get('customer_name')?.value,
      dropoff_time: this.form.get('dropoff_time')?.value,
      pickup_time: this.form.get('pickup_time')?.value,
    }
  }
}
