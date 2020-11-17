
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
  registered?: boolean;
}
@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  login(username: string, password: string) {
    return this.http
      .get('https://localhost:5001/api/accounts/login?username='+ username+ '&password=' + password)
      .pipe(
        map((response: any) => {
          const user  = response ;
          if(user) {
            let currentUser = this.decocodeToken(user);
            t
            
          }
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
    return JSON.stringify(jwt_decode(token));
  }
}
