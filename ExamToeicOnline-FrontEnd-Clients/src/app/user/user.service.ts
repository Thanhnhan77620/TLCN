
import { Account } from "./../model/account.model";
import { BehaviorSubject } from "rxjs";
import { User } from "./../model/user.model";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { throwError, of, Subject } from "rxjs";
import jwt_decode from "jwt-decode";

export interface AuthResponseData {
  username: string
  expiresIn: string;
  message: string;
 
}
@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  login(username: string, password: string) {
    return this.http
      .get<AuthResponseData>('https://localhost:5001/api/accounts/login?username='+ username+ '&password=' + password)
      .pipe(
        catchError(error => this.handleError),
        tap(resData => {
          const user: any = resData;
          this.handleAuthentication(user.value.token);
          console.log(user.value.token);
        })
      );
  }

  public handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email exists already";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "This email does not exist.";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "This password is not correct.";
        break;
    }
    return throwError(errorMessage);
  }


  decocodeToken(token: string) {
    return jwt_decode(token);
  }

  private handleAuthentication(token: string) {
    const account:any = this.decocodeToken(token);
    const expDate = account.exp;
    console.log(account.sub[1]);
    localStorage.setItem('token',token);

    // const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    // const user = new User(email, userId, token, expirationDate);
    // this.user.next(user);
    // this.autoLogout(expiresIn * 1000);
    // localStorage.setItem('userData', JSON.stringify(user));
  }
}
