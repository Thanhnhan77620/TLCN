import { Account } from "./../model/account.model";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "./../model/user.model";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { throwError, of, Subject } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
export interface AuthResponseData {
  username: string;
  expiresIn: string;
  token: string;
  status?: string;
}

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient, private router: Router) { }

  account = new BehaviorSubject<Account>(null);
  private tokenExpirationTimer: any;
  jwtHelper = new JwtHelperService();
  private _isLoginMode: boolean = false;

  get isLoginMode(): boolean {
    return this._isLoginMode;
  }

  set isLoginMode(value: boolean) {
    this._isLoginMode = value;
  }

  signup(fullname: string, email: string, password: string) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    let body = new FormData();
    body.append("fullname", fullname);
    body.append("email", email);
    body.append("password", password);
    return this.http
      .post<User>("https://localhost:5001/api/users", body)
      .pipe(catchError(this.handleError));

  }

  login(username: string, password: string) {
    return this.http
      .get<AuthResponseData>(
        "https://localhost:5001/api/accounts/login?username=" +
        username +
        "&password=" +
        password
      )
      .pipe(
        catchError((error) => this.handleError(error)),
        tap((resData: any) => {
          const account: any = this.jwtHelper.decodeToken(resData.value.token);
          const tokenExpiration = this.jwtHelper.getTokenExpirationDate(
            resData.value.token
          );
          this.handleAuthentication(
            account.sub[0],
            account.sub[1],
            new Date(tokenExpiration).getTime(),
            resData.value.token
          );
        })
      );

  }

  public handleError(errorRes: HttpErrorResponse) {
    let errorMessage = errorRes.error;

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    return throwError(errorMessage);
  }

  logout() {
    this.account.next(null);
    this.router.navigate(["/home"]);
    localStorage.removeItem("userData");
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.isLoginMode = false;
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
    token?: string
  ) {
    const expirationDate = new Date(expiresIn);
    const user = new Account(username, userId, token, expirationDate);
    this.account.next(user);
    this.autoLogout(expiresIn / 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  autoLogin() {
    const userData: {
      username: string;
      userId: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));

    if (!userData) {
      return;
    }

    const loadedUser = new Account(
      userData.username,
      userData.userId,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.account.next(loadedUser);
      if (
        this.jwtHelper.isTokenExpired(
          "",
          +loadedUser._tokenExpirationDate.getTime()
        )
      ) {
        this.autoLogout(
          new Date(loadedUser._tokenExpirationDate).getTime() -
          new Date().getTime()
        );
      }
    }
  }

  getUser(userId: string): Observable<User> {
    return this.http
      .get<User>("https://localhost:5001/api/users/" + userId)
      .pipe(catchError((error) => this.handleError));
  }
}
