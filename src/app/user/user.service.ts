import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { BehaviorSubject, catchError, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
  constructor(private http: HttpClient)
  {
    // If we get a user, set it to the Observable
    this.userSubscription = this.user$.subscribe(user =>
    {
      this.user = user;
    });
  }
  // ?? TODO: Learn how this is useful
  private user$$ = new BehaviorSubject<User | null>(null);

  // ?? TODO: Learn how this is useful aswell
  private user$ = this.user$$.asObservable();

  user: User | null = null;
  userSubscription: Subscription | null = null;

  get isLoggedIn(): boolean
  {
    return !!this.user;
  }

  register(username: string, email: string, password: string, rePassword: string)
  {
    // TODO: Find out what pipe(tap()) and .next functions do
    return this.http
      .post<User>(`/api/register`, {
        username,
        email,
        password,
        rePassword
      })
      .pipe(tap(user => this.user$$.next(user)));
  }

  login(username: string, password: string)
  {
    return this.http
      .post<User>(`/api/login`, {
        username,
        password
      })
      .pipe(tap(user => this.user$$.next(user))).subscribe({ error: error => console.log(error) });
  }

  logout()
  {
    return this.http
      .post<User>(`/api/logout`, {})
      .pipe(tap(user => this.user$$.next(null))); // We set the user as `null`
  };
}
