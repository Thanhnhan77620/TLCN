import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';

import * as UserActions from '../state/user.action';
import { map, catchError, tap, mergeMap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class UserEffects {
    constructor(private action$: Actions,
                private userService: UserService,
                private router: Router){}



    @Effect()
    userLogin$ = this.action$.pipe(
        ofType(UserActions.login),
        exhaustMap(action =>
        this.userService
            .login(action.username,action.password)
            .pipe(
                map((user)=>{
                    return UserActions.loginSuccess({user})
                }),
                catchError(error=> {
                    console.log(error)
                    return of(UserActions.loginFail({error}))
                })
            )
        )
   ) 

    @Effect({dispatch:false})
    loginSuccess$ = this.action$.pipe(
        ofType(UserActions.loginSuccess),
        tap((user) => {
            localStorage.setItem('token', JSON.stringify(user.user));
            this.router.navigate(['/home'])
        })
    )

    @Effect({dispatch:false})
    loginFail$ = this.action$.pipe(
        ofType(UserActions.loginFail),
        tap((error) => alert(error.error.error))
    )

    @Effect({dispatch:false})
    logout$ = this.action$.pipe(
        ofType(UserActions.logout),
        tap((user) => {
            localStorage.removeItem('token')
        })
    )

}