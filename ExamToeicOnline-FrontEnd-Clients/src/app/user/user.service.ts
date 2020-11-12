import { User } from './../model/user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { State } from './state/user.reducer';
import * as UserActions from './state/user.action';

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private http: HttpClient, 
                private store: Store<State>,
                private router: Router) {}
    

    login(username: string, password: string) {  
      return this.http.post<User>('https://localhost:5001/api/accounts/login', {username,password});

    } 
    
    loggedIn(){
      let token = localStorage.getItem('token');
    }

    public handleError(errorRes: HttpErrorResponse) {
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