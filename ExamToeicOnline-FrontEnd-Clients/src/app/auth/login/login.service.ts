import { Router } from '@angular/router';
import { AppState } from './../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Account } from './../../model/account.model';
import { User } from './../../model/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import * as AuthActions from '../store/auth.action'
import * as fromApp from '../../store/app.reducer';
import { throwError } from 'rxjs';

export interface AuthResponseData {
    id: number,
    username: string,
    password: string, 
    isActive: boolean,
    userId: string,
    user: User
  }

@Injectable({ providedIn: 'root' })
export class LoginService {

    constructor(private http: HttpClient, 
                private store: Store<fromApp.AppState>,
                private router: Router) {}
    
    
    login(username: string, password: string) {  
       return this.http.post<AuthResponseData>('https://localhost:44300/api/accounts/login', {username: username, password:password})
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                this.handleAuthentication(
                    resData.username,
                    resData.password,
                );
        })
            )
    } 

    logout(){
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigate(['/home']);
        localStorage.removeItem('accountData');
        alert('Logged out Successful');
    }

    private handleAuthentication(
       username: string,
       password: string,
      ) {
        const account = new Account(username,password);
        this.store.dispatch(
          new AuthActions.Login({
            username,
            password
          })
        );
        localStorage.setItem('accountData', JSON.stringify(account));
      }
    
      private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist.';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct.';
            break;
        }
        return throwError(errorMessage);
      }
}