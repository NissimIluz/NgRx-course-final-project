import { AuthState } from './reducers/index';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectAuthState = createFeatureSelector<AuthState>("auth");


export const isLoggedIn = createSelector(
    selectAuthState, 
    (auth) => !!auth.user  // memoried function. // !! - convert obj to bool -if exist
);

export const isLoggedOut = createSelector(
    isLoggedIn, // state can be anther selector 
    loggedIn => !loggedIn
)
