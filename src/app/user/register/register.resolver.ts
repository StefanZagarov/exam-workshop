import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../interfaces/user';
import { filter, firstValueFrom, lastValueFrom } from 'rxjs';

export const registerResolver: ResolveFn<boolean> = async (route, state) =>
{
  const userService = inject(UserService);

  // Awaiting for the resolver to first get the user data before returning the function
  // const user = await lastValueFrom(userService.user$);
  // console.log(user);

  console.log(userService.user$);

  return !!false;
};
