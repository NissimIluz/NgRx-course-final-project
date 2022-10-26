import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './action-types';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),  // ofType - filter the subscriptions
            tap(action => {
                localStorage.setItem('user', JSON.stringify(action.user));
            })
        )
        ,
        {dispatch: false} // because we change the AuthActions.login that will create new effect and...
    );   // auto subscribe by NgRx Effects

    $logout = createEffect( () => 
        this.actions$.pipe(
            ofType(AuthActions.logout),  // ofType - filter the subscriptions
            tap(() => {
                localStorage.removeItem('user');
                this.router.navigateByUrl('/login');
            })    
        )
        ,
        {dispatch: false} // because we change the AuthActions.login that will create new effect and...
    );
    constructor(private actions$: Actions, private router:Router) {
    }
}