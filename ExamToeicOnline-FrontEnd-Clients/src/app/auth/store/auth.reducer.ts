import { User } from 'src/app/model/user.model';
import * as AuthActions from './auth.action';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
){
  switch(action.type){
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true
      };

    
  }

}
