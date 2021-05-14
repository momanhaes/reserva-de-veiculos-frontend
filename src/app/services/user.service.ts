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
  constructor(private httpClient: HttpClient) {}

  public setUsername(username: string | undefined): void {
    sessionStorage.removeItem('username');
    sessionStorage.setItem('username', JSON.stringify(username));
  }

  public getUsername(): string | undefined {
    return JSON.parse(sessionStorage.getItem('username'));
  }

  public setUserID(userID: string | undefined): void {
    sessionStorage.removeItem('userID');
    sessionStorage.setItem('userID', JSON.stringify(userID));
  }

  public getUserID(): string | undefined {
    return JSON.parse(sessionStorage.getItem('userID'));
  }

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
      .pipe(
        tap((user) => {
          this.setUsername(user.name);
          this.setUserID(user._id);
        })
      );
  }

  logout() {
    this.setUserID('');
    this.setUsername('');
  }

  isLoggedIn(): boolean {
    return this.getUserID() ? true : false;
  }
}
