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
import { CarResponse } from '../../../shared/models/car-response';
import { MatButtonModule } from '@angular/material/button';
import { BookStore } from '../../store/book.store';

@Component({
  selector: 'app-book-form',
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, JsonPipe, AsyncPipe, MatSelectModule, MatInputModule, MatButtonModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
  standalone: true
})
export class BookFormComponent implements OnInit {

  private bookStore = inject(BookStore)


  @Input() selectedCar!: CarResponse | null | undefined;

  bookView$ = this.bookStore.bookView$;

  public bookForm!: FormGroup;

  constructor(private bookFormService: FormService,
    public readonly carStore: CarsStore
  ) {}

  ngOnInit(): void {
    this.bookForm = this.bookFormService.bookForm;
    console.log('selectedCar',this.selectedCar)
    this.bookForm.get("car")?.setValue(this.selectedCar);
  }

  onCarChange($event: any) {
    console.log('onCarChange', $event)
    this.carStore.setSelectedCar($event.value)
  }

  onBook() {

    if(this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }
    console.log(this.bookFormService.formRequest());
    this.bookStore.bookCar(this.bookFormService.formRequest());
    this.bookForm.reset()
  }

}
