import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private route: Router) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erro HTTP Interceptado:', error);
        if (error.status === 404) {
          this.route.navigateByUrl('not-found');
        }

        this.route.navigateByUrl('error');

        return throwError(() => error);
      }),
    );
  }
}
