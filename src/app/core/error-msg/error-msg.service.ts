import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService
{
  constructor(private toastService: ToastService) { }

  handleError(error: HttpErrorResponse)
  {
    let errorMessage = 'An unknown error occurred';

    // Error from the back end
    if (error.error?.message)
    {
      errorMessage = error.error.message;
    }

    this.toastService.show(errorMessage, 'error');
  }
}
