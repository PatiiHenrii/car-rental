import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CarResponse } from '../../../shared/models/car-response';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-cars-card',
  imports: [MatCardModule, MatButtonModule, MatChipsModule],
  templateUrl: './cars-card.component.html',
  styleUrl: './cars-card.component.scss'
})
export class CarsCardComponent {

  @Input() car!: CarResponse;

}
