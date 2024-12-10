// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { ToastService } from '../../toast/toast.service';
// import { HttpErrorResponse } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class ErrorMsgService
// {
//   constructor(private toastService: ToastService) { }

//   // // Used to set the error
//   // private apiError$$ = new BehaviorSubject(null);

//   // // Make the api error public via the Observer
//   // apiError$ = this.apiError$$.asObservable();

//   // // TODO: Learn how this works
//   // setError(error: any): void
//   // {
//   //   // Push the error
//   //   this.apiError$$.next(error);
//   //   this.toastService.showError(this.apiError$$);
//   // }

//   handleError(error: HttpErrorResponse)
//   {
//     let message = 'An unknown error occurred';

//     if (error.error && error.error.message)
//     {
//       message = error.error.message;
//     } else if (error.status === 401)
//     {
//       message = 'Invalid username or password';
//     }

//     // Use the toast service to display the error
//     this.toastService.show(message, 'error');
//   }
// }

// ----------------------------------------------------------

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
