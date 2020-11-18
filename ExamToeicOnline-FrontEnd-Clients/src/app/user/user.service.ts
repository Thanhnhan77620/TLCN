import { BehaviorSubject } from "rxjs";
import { User } from "./../model/user.model";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { throwError, of, Subject } from "rxjs";
import jwt_decode from "jwt-decode";
import  { JwtHelperService } from '@auth0/angular-jwt' 
import { Observable } from 'rxjs/internal/Observable';
export interface AuthResponseData {

  username: string
  expiresIn: string;
  token: string;
  status?: string;
}

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  jwtHelper = new JwtHelperService();
  login(username: string, password: string) {
    return this.http
      .get<AuthResponseData>('https://localhost:5001/api/accounts/login?username='+ username+ '&password=' + password)
      .pipe( 
        catchError((res: HttpErrorResponse) => this.handleError(res)),
        tap(resData => {
          const user: any = resData;
          this.handleAuthentication(user.value.token);
          
        })
      );
  }

  public handleError(error: HttpErrorResponse) {
    let errorMessage:string ;
    switch (error.status) {
      case 401:
        errorMessage = "Login Fail";
        break;
      // case "EMAIL_NOT_FOUND":
      //   errorMessage = "This email does not exist.";
      //   break;
      // case "INVALID_PASSWORD":
      //   errorMessage = "This password is not correct.";
      //   break;
    }
    return throwError(errorMessage);
  }



  logout() {
    this.user.next(null);
    this.router.navigate(['/home']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(token: string) {
    const account:any = this.jwtHelper.decodeToken(token);
    const tokenExpiration = this.jwtHelper.getTokenExpirationDate(token);

    const user = new User(account.sub[0],account.sub[1], token, account.exp);
    this.user.next(user);
    this.autoLogout(account.exp);
    localStorage.setItem('userData',JSON.stringify(user));
  }

autoLogin() {
    const userData: {
      username: string;
      userId: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.username,
      userData.userId,
      userData._token,
      new Date(userData._tokenExpirationDate),
    );

    if (loadedUser._token) {
      this.user.next(loadedUser);
      if( this.jwtHelper.isTokenExpired('',+loadedUser._tokenExpirationDate.getTime())){
        this.autoLogout( new Date( loadedUser._tokenExpirationDate).getTime()*1000 - new Date().getTime());
      }
      
    }
  }
}
