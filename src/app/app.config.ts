import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideComponentStore } from '@ngrx/component-store';
import { APP_ROUTES } from './app.routes';
import { CarsStore } from './cars/store/cars.store';
import { InterceptorService } from './interceptor.service';
import { BookStore } from './reservation/store/book.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(APP_ROUTES),
    provideComponentStore(CarsStore),
    provideComponentStore(BookStore),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
};
