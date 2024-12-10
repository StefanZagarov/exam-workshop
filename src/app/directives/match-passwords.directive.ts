import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';
import { matchPasswordsValidator } from '../utils/password.validator';

@Directive({
  selector: '[appMatchPasswords]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: MatchPasswordsDirective,
    },
  ]
})
export class MatchPasswordsDirective
{
  @Input() password: string | undefined = ``;

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null
  {
    const password = this.password;
    const rePassword = control?.value;

    const validationFn = matchPasswordsValidator(password!, rePassword);

    return validationFn(control);
  };

}
