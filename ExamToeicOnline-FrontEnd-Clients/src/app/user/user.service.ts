import { BehaviorSubject } from "rxjs";
import { User } from "./../model/user.model";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { throwError, of, Subject } from "rxjs";
import  { JwtHelperService } from '@auth0/angular-jwt' 
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


  private generateUser(token: string){

  }

  signup(fullname: string,email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://localhost:5001/api/users/register',
        {
          fullname: fullname,
          email: email,
          password: password,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData: any) => {
          this.handleAuthentication(
            resData.accounts.username,
            resData.id,
            +resData.expiresIn,
          );
        })
      );
  }

  login(username: string, password: string) {
    return this.http
      .get<AuthResponseData>('https://localhost:5001/api/accounts/login?username='+ username+ '&password=' + password)
      .pipe( 
        catchError((error) => this.handleError(error)),
        tap((resData: any) => {
          const account:any = this.jwtHelper.decodeToken(resData.value.token);
          const tokenExpiration = this.jwtHelper.getTokenExpirationDate(resData.value.token);
          this.handleAuthentication(account.sub[0],account.sub[1], new Date(tokenExpiration).getTime(), resData.value.token);
        })
      );
  }


  public handleError(errorRes: HttpErrorResponse) {
    let errorMessage = errorRes.error;
    
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    // switch (errorRes.error.error.message) {
    //   case 'EMAIL_EXISTS':
    //     errorMessage = 'This email e xists already';
    //     break;
    //   case 'EMAIL_NOT_FOUND':
    //     errorMessage = 'This email does not exist.';
    //     break;
    //   case 'INVALID_PASSWORD':
    //     errorMessage = 'This password is not correct.';
    //     break;
    //   default:
    //     errorMessage = errorRes.error;
    // }
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

  private handleAuthentication( 
    username: string,
    userId: string,
    expiresIn: number,
    token?: string,) {
    const expirationDate = new Date(expiresIn);
    const user = new User(username, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn / 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  // private handleAuthentication2( 
  //   token: string) {
  //   const account:any = this.jwtHelper.decodeToken(token);
  //   const tokenExpiration = this.jwtHelper.getTokenExpirationDate(token);
  //   // console.log("gettokend" + new Date(tokenExpiration).getTime());
  //   const user = new User(account.sub[0],account.sub[1], token, tokenExpiration);
  //   console.log(new Date(tokenExpiration).getTime());
  //   console.log(account.exp *1000)
  //   this.user.next(user);
  //   this.autoLogout(account.exp);
  //   console.log("account.exp" + account.exp);
  //   localStorage.setItem('userData',JSON.stringify(user));
  // }

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
      // console.log("loaded " + new Date(loadedUser._tokenExpirationDate).getTime());
      // console.log("loaded exp " +(new Date( loadedUser._tokenExpirationDate).getTime() - new Date().getTime()));
      this.user.next(loadedUser);
      if( this.jwtHelper.isTokenExpired('',+loadedUser._tokenExpirationDate.getTime())){
        this.autoLogout( new Date( loadedUser._tokenExpirationDate).getTime() - new Date().getTime());
      }
      
    }
  }
}
