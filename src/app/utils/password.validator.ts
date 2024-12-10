import { ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(
    controlPassword: string,
    controlRePassword: string
): ValidatorFn
{
    return (control) =>
    {
        const samePassword =
            controlPassword === controlRePassword;

        return samePassword ? null : { matchPasswordsValidator: true };
    };
}