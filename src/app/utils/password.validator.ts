import { ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(
    controlPassword: string,
    controlRePassword: string
): ValidatorFn
{
    return (control) =>
    {
        const password = control.get(controlPassword);
        const rePassword = control.get(controlRePassword);

        const samePassword =
            password?.value === rePassword?.value;

        return samePassword ? null : { matchPasswordsValidator: true };
    };
}