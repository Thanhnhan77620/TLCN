import { Account } from './../../model/account.model';

import * as AuthActions from './auth.action';

export interface State {
  account: Account
}

const initialState: State = {
 account: null
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
){
  switch(action.type){
    case AuthActions.LOGIN:
      const account =  new Account(action.payload.username, action.payload.password)
      return {
       ...state,
       account: account,
      };
      break;
    case AuthActions.LOGOUT:
      return {
        ...state,
        account: null,
      }
    default:
      return state;
    
  }

}
