import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VEHICLES_API } from '../app.api';
import { map, tap } from 'rxjs/operators';

export interface IUserInfo {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  public user: IUser;

  constructor(private httpClient: HttpClient) {}

  create(user: IUser): Observable<IUserInfo> {
    return this.httpClient
      .post<IUserInfo>(`${VEHICLES_API}/users`, user)
      .pipe(map((user) => user));
  }

  login(email: string, password: string): Observable<IUser> {
    return this.httpClient
      .post<IUser>(`${VEHICLES_API}/users/login`, {
        email: email,
        password: password,
      })
      .pipe(tap((user) => (this.user = user)));
  }

  logout() {
    this.user = undefined;
  }

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }
}
