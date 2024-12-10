import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ErrorService } from './core/error-msg/error-msg.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environment/environment';

export const errorInterceptor: HttpInterceptorFn = (req, next) =>
{
  const errorService = inject(ErrorService);

  // Get our API URL
  const { apiUrl } = environment;
  const API = `/api`;

  // If the request URL begins with what we want to intercept
  if (req.url.startsWith(API))
  {
    // Then we want the request to be cloned
    req = req.clone({
      // Here we say what we will clone - we want to clone the url by replacing the API URL (API) with our API URL (apiUrl)
      url: req.url.replace(API, apiUrl),
      // Saves the JSW in the browser's cookies
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


