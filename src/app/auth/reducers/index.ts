import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
  State
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { AuthActions } from '../action-types';
import { User } from '../model/user.model';


export const authFeatureKey = 'auth';

export interface AuthState {
  user: User 
}

export const initAuthReducer = {
  user: undefined
};

export  const authReducer = createReducer(
  initAuthReducer,
  on(AuthActions.login, (state, action) =>  {
    const x: AuthState  = {
      user: action.user
    }
    return x;
  }),
  on(AuthActions.logout, (state, action) => {
    const x: AuthState  = {
      user: undefined
    }
    return x;
  })
)