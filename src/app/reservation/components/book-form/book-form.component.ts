import { AsyncPipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { CarsStore } from '../../../cars/store/cars.store';
import { ReservationsResponse } from '../../../shared/models/book-models';
import { CarResponse } from '../../../shared/models/cars-models';
import { FormService } from '../../services/form.service';
import { BookStore } from '../../store/book.store';

@Component({
  selector: 'app-book-form',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
  standalone: true,
})
export class BookFormComponent implements OnInit {
  private bookStore = inject(BookStore);
  bookView$ = this.bookStore.bookView$;
  public reservation: ReservationsResponse | undefined;

  @Input() selectedCar!: CarResponse | null | undefined;

  public bookForm!: FormGroup;

  constructor(
    private bookFormService: FormService,
    public readonly carStore: CarsStore,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.bookForm = this.bookFormService.bookForm;
    this.bookForm.get('car_id')?.setValue(this.selectedCar?.id);

    this.reservation = this.bookStore.getResevertionToEdit();
    console.log(this.reservation);
    if (this.reservation) {
      this.bookFormService.fillForm(this.reservation);
    }
  }

  onCarChange($event: MatSelectChange) {
    this.carStore.setSelectedCar($event.value);
  }
  onBook() {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }
    this.bookStore.bookCar(this.bookFormService.formRequest());
    this.bookForm.reset();
  }

  onUpdate() {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }
    this.bookStore.updateBook(this.bookFormService.formRequest());
    this.bookForm.reset();
  }

  onBack() {
    this.router.navigateByUrl('/cars');
    this.bookForm.reset();
  }
}
