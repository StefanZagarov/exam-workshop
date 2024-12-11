// Simpler to be an export function than making it an injectable componen

import { inject } from "@angular/core";
import { ActivatedRoute, CanActivateFn, Router } from "@angular/router";
import { UserService } from "../user/user.service";
import { ToastService } from "../toast/toast.service";

export const authGuard: CanActivateFn = () =>
{
    const userService = inject(UserService);
    const router = inject(Router);
    const toast = inject(ToastService);

    if (userService.isLoggedIn)
    {
        return true;
    }
    else
    {
        router.navigate([`/login`]);
        toast.show(`You need to be logged in to do that.`, `error`);
        return false;
    }
};

export const userAuthGuard: CanActivateFn = () =>
{
    const userService = inject(UserService);
    const router = inject(Router);
    const activRoute = inject(ActivatedRoute);

    const user = activRoute.snapshot.data[`user`];

    console.log(user);

    if (userService.isLoggedIn)
    {
        router.navigate([`/404`]);
        return false;
    }
    else
    {
        return true;
    }
};