import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject, tap } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
  // ?? TODO: Learn how this is useful
  private user$$ = new BehaviorSubject<User | null>(null);

  // ?? TODO: Learn how this is useful aswell
  public user$ = this.user$$.asObservable();

  user: User | null = null;
  // TODO: Find the use for this - ngOnDestroy, unsubscribe to sometihng, learn how this is helpful
  // userSubscription: Subscription | null = null;

  get isLoggedIn(): boolean
  {
    return !!this.user;
  }

  constructor(private http: HttpClient)
  {
    // If we get a user, set it to the Observable
    // this.userSubscription = this.user$.subscribe(user =>
    // {
    //
    //   // Research if userSubscription is needed as it seems to have everything set to null even after login
    //   this.user = user;
    // });

    this.user$.subscribe(user =>
    {
      this.user = user;
    });
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
      .pipe(tap(user => this.user$$.next(user)));
  }

  logout()
  {
    return this.http
      .post<User>(`/api/logout`, {})
      .pipe(tap(user => this.user$$.next(null))); // We set the user as `null`
  };

  getProfile()
  {
    return this.http.get<User>(`/api/user/profile`).pipe(tap(user =>
    {
      this.user$$.next(user);
    }));
  }
}
