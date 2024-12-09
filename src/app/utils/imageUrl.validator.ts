import { ValidatorFn } from '@angular/forms';

export function imageUrlValidator(): ValidatorFn
{
    const regExp = /^(https?):\/\/.*/g;

    return (control) =>
    {
        const isInvalid = control.value === '' || regExp.test(control.value);

        return isInvalid ? null : { emailValidator: true };
    };
}