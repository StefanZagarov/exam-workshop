import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject, firstValueFrom, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
  private user$$ = new BehaviorSubject<User | null>(null);

  public user$ = this.user$$.asObservable();

  user: User | null = null;


  get isLoggedIn(): boolean
  {
    return !!this.user;
  }

  constructor(private http: HttpClient)
  {
    this.user$.subscribe(user =>
    {
      this.user = user;
    });
  }

  async initializeUserData(): Promise<void>
  {
    return firstValueFrom(this.http.get<User | null>('/api/user/profile'))
      .then(user =>
      {
        this.user$$.next(user);
      });
  }

  register(username: string, email: string, password: string, rePassword: string)
  {
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
