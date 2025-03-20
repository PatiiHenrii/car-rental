
import { Component, inject, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { CarsStore } from '../../store/cars.store';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { CarsCardComponent } from '../cars-card/cars-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
    this.store.load()
  }

}
