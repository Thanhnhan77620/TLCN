import { HttpErrorResponse } from '@angular/common/http';
import { User } from './../../model/user.model';
import { Action, createAction, props } from '@ngrx/store';

export const login = createAction(
  '[User] Login',
  props<{username: string, password: string}>()
)

export const loginSuccess = createAction(
  '[User] Login Success', 
  props<{user: User}>()
)

export const loginFail = createAction(
  '[User] Login Fail',
  props<{error: HttpErrorResponse}>()
)

export const logout = createAction(
  '[User] Logout' 
)

export const signup = createAction(
  '[User] Sign up',
  props<{fullname: string, email: string, phonenumber: string}>()
)

export const signupSuccess= createAction(
  '[User] Sigup Success'
)

export const signupFail = createAction(
  '[User] Sigup Fail'
)