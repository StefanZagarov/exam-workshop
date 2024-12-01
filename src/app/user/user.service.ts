import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
  // TODO: Implement current logged in user tracking
  constructor(private http: HttpClient) { }

  register(username: string, email: string, password: string)
  {
    return this.http.post<User>(`/api/register`, { username, email, password }).subscribe();
  }
}
