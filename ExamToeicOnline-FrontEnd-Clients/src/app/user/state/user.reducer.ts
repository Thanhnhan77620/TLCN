import { HttpErrorResponse } from '@angular/common/http';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Guid } from 'guid-typescript';

import { User } from './../../model/user.model';

import * as AppState from '../../state/app.reducer';
import * as UserActions from '../state/user.action'



export interface State extends AppState.State{
  users: UserState;
}

export interface UserState {
  currentUserId: Guid | null,
  currentUser: User,
  users: User[],
  error: HttpErrorResponse | null,
  isLogin: boolean,
}

const initialState: UserState = {
  currentUserId: null,
  users:[],
  error: null,
  isLogin: false,
  currentUser: null,
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const  getCurrentUserId = createSelector(
  getUserFeatureState,
  state =>  state.currentUserId
)

export const getIsLogin = createSelector(
  getUserFeatureState,
  state =>state.isLogin
)

export const getUsers = createSelector(
  getUserFeatureState,
  state => state.users
)

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
)

export const userReducer = createReducer<UserState>(
  initialState,
  on(UserActions.loginSuccess, (state, action): UserState => {

    return {
      ...state,
      currentUserId: action.user.Id,
      currentUser: action.user,
      error: null,
      isLogin:true
    }
  }),
  on(UserActions.loginFail,(state, action):UserState => {
    return {
      ...state,
      error:action.error,
      isLogin: false,
    }
  }),
  on(UserActions.logout,(state):UserState => {
    return {
      ...state,
      isLogin: false,
      currentUser: null,
      currentUserId: null
    }
  })
)

