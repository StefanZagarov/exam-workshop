import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';
import { imageUrlValidator } from '../utils/imageUrl.validator';

@Directive({
  selector: '[appImageUrl]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ImageUrlDirective,
    },
  ],
})
export class ImageUrlDirective
{
  @Input() appImageUrl: string | undefined = ``;

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null
  {
    const validatorFn = imageUrlValidator();
    return validatorFn(control);
  }
}
