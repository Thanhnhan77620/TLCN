import { User } from './../model/user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import jwt_decode from "jwt-decode";

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private http: HttpClient, 
                private router: Router) {}
    
    user:User;
    currentUser: any
    token: string
    login(username: string, password: string) {  
      return this.http
        .get('https://localhost:5001/api/accounts/login?username='+ username+ '&password=' + password)
        // .pipe(
        //   map(user =>{
        //     this.user= user,
        //     console.log(this.user),
        //     console.log(this.user.value.token)
        //     return this.user.value.token
        //   })
        // );
    } 

    getToken(username: string, password: string){
      return this.http
      .get('https://localhost:5001/api/accounts/login?username='+ username+ '&password=' + password)
      .pipe(
        map(user => {
          this.currentUser = user
          // this.user = this.decode_token(this.currentUser.value.token);
        })
      )
      .subscribe();
    }


    decode_token(token: string){
      let decodedHeader:any = jwt_decode(this.token);
      if(decodedHeader.exp){
        console.log(decodedHeader.sub.message)
      }
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