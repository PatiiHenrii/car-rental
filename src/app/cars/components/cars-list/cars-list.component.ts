import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CarsStore } from '../../store/cars.store';
import { CarsCardComponent } from '../cars-card/cars-card.component';
@Component({
  selector: 'app-cars-list',
  imports: [AsyncPipe, CarsCardComponent, MatProgressSpinnerModule],
  templateUrl: './cars-list.component.html',
  styleUrl: './cars-list.component.scss',
  standalone: true,
})
export class CarsListComponent implements OnInit {
  constructor(public readonly store: CarsStore) {}

  ngOnInit(): void {
    this.store.load();
  }
}
