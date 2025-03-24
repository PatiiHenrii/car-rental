import { ReservationsResponse } from '../../../shared/models/book-models';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CarsStore } from '../../store/cars.store';
import { FormService } from '../../services/form.service';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BookStore } from '../../store/book.store';
import { RouterLink } from '@angular/router';
import { CarResponse } from '../../../shared/models/cars-models';

@Component({
  selector: 'app-book-form',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, AsyncPipe, MatSelectModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
  standalone: true
})
export class BookFormComponent implements OnInit {

  private bookStore = inject(BookStore);
  bookView$ = this.bookStore.bookView$;
  public reservation: ReservationsResponse | undefined;


  @Input() selectedCar!: CarResponse | null | undefined;

  public bookForm!: FormGroup;

  constructor(
    private bookFormService: FormService,
    public readonly carStore: CarsStore
  ) {}

  ngOnInit(): void {
    this.bookForm = this.bookFormService.bookForm;
    this.bookForm.get("car_id")?.setValue(this.selectedCar?.id);

    this.reservation = this.bookStore.getResevertionToEdit();
    if(this.reservation) {
      this.bookFormService.fillForm(this.reservation);
    }
  }

  onCarChange($event: any) {
    this.carStore.setSelectedCar($event.value)
  }

  private validateForm(){
    if(this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }
  }

  onBook() {
    this.validateForm();
    this.bookStore.bookCar(this.bookFormService.formRequest());
    this.bookForm.reset();
  }

  onUpdate() {
    this.validateForm();
    this.bookStore.updateBook(this.bookFormService.formRequest());
    this.bookForm.reset();
  }

}
