import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-book-form',
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
  standalone: true
})
export class BookFormComponent {

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

}
