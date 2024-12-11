import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ErrorService } from './core/error-msg/error-msg.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environment/environment';

export const errorInterceptor: HttpInterceptorFn = (req, next) =>
{
  const errorService = inject(ErrorService);

  const { apiUrl } = environment;
  const API = `/api`;

  if (req.url.startsWith(API))
  {
    req = req.clone({

      url: req.url.replace(API, apiUrl),

      withCredentials: true
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) =>
    {
      errorService.handleError(error);
      return throwError(() => error);
    })
  );
};


