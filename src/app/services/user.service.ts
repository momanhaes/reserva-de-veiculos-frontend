import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionStorageService, KeyType } from './session-storage.service';
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
  constructor(private httpClient: HttpClient, private sessionStorageService: SessionStorageService) { }

  public create(user: IUser): Observable<IUserInfo> {
    return this.httpClient
      .post<IUserInfo>(`${VEHICLES_API}/users`, user)
      .pipe(map((user) => user));
  }

  public login(email: string, password: string): Observable<IUser> {
    return this.httpClient
      .post<IUser>(`${VEHICLES_API}/users/login`, {
        email,
        password,
      })
      .pipe(
        tap((user) => {
          this.sessionStorageService.set(KeyType.USERNAME, { username: user.name });
          this.sessionStorageService.set(KeyType.USER_ID, { userID: user._id });
        })
      );
  }

  public logout(): void {
    this.sessionStorageService.clear();
  }

  public isLoggedIn(): boolean {
    return this.sessionStorageService.get(KeyType.USER_ID) ? true : false;
  }
}
