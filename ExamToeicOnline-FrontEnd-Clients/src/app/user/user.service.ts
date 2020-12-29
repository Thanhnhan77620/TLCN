import { HistoryExam } from './../model/historyExam';
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
import { catchError, map, take, tap } from "rxjs/operators";
import { throwError, of, Subject } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Guid } from 'guid-typescript';
import { UserUpdate } from './../model/userUpdate.model';
export interface AuthResponseData {
  username: string;
  expiresIn: string;
  token: string;
  status?: string;
}

@Injectable({ providedIn: "root" })
export class UserService {

  api: string = "";

  constructor(private http: HttpClient, private router: Router) {
    this.api = "https://localhost:5001/api/";
  }

  account = new BehaviorSubject<Account>(null);
  private tokenExpirationTimer: any;
  jwtHelper = new JwtHelperService();
  private _isLoginMode: boolean = false;

  public redirectUrl: string;


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
      .post<User>(this.api + "users", body)
      .pipe(catchError(this.handleError));
  }

  login(username: string, password: string) {
    return this.http
      .get<AuthResponseData>(
        this.api + "accounts/login?username=" +
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
  setStorageCurrentUser(userId: Guid) {
    return this.http.get<any>(this.api + "users/" + userId).subscribe(data => {
      localStorage.setItem('UserId', data.id);
      localStorage.setItem('email', data.email);
      localStorage.setItem('fullName', data.fullname);
      localStorage.setItem('phone', data.phoneNumber);
      localStorage.setItem('image', data.image);
      localStorage.setItem('birthday', data.birthday);
    })
  }
  setStorageCurrentAccount(userName: string) {
    return this.http.get<any>(this.api + "accounts/" + userName).subscribe(data => {
      localStorage.setItem('userName', data.username);
    })
  }

  updateProfile(userUpdate: UserUpdate) {
    var formData = new FormData();
    formData.append("id", userUpdate.id);
    formData.append("fullName", userUpdate.fullName);
    formData.append("email", userUpdate.email);
    formData.append("PhoneNumber", userUpdate.phone);
    formData.append("birthday", userUpdate.birthDate.toString());
    formData.append("Image", userUpdate.image);
    return this.http.put<any>(this.api + "users/" + userUpdate.id, formData);
    // .subscribe(data=>{
    //   this.setStorageCurrentUser(Guid.parse(userUpdate.id));
    //   //this.router.navigate(["/auth/"+userUpdate.id+"/profile"]);
    // })     
  }

  changePassword(userName: string, oldPassWord: string, newPassWord: string) {
    var formData = new FormData();
    formData.append("userName", userName);
    formData.append("password", oldPassWord);
    formData.append("NewPassword", newPassWord);
    return this.http.put<any>(this.api + "accounts/" + userName, formData);
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
    localStorage.clear();
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    localStorage.removeItem('userData')
    this.isLoginMode = false;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
      localStorage.clear();
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
    console.log((expiresIn / 1000));
    localStorage.setItem("userData", JSON.stringify(user));
    this.setStorageCurrentUser(Guid.parse(userId));
    this.setStorageCurrentAccount(username);
    //localStorage.setItem("userName", username);

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
      console.log("loaded " + new Date(loadedUser._tokenExpirationDate).getTime());
      console.log("loaded exp " + (new Date(loadedUser._tokenExpirationDate).getTime() - new Date().getTime()));
      this.account.next(loadedUser);
      if (
        this.jwtHelper.isTokenExpired(
          "",
          +loadedUser._tokenExpirationDate.getTime()
        )
      ) {
        this.autoLogout(
          new Date(loadedUser._tokenExpirationDate).getTime() - new Date().getTime()
        );
      }
    }
  }


  viewHistoryExam() {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const user: any = JSON.parse(localStorage.getItem('userData'));
    return this.http.get<HistoryExam[]>(this.api + "exams/history/" + user.userId, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // getUser(userId: string): Observable<User> {
  //   return this.http
  //     .get<User>(this.api+"users" + userId)
  //     .pipe(catchError((error) => this.handleError));
  // }
}
