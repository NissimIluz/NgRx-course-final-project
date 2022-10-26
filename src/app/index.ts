import { Action } from 'rxjs/internal/scheduler/Action';
import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
  } from '@ngrx/store';
  import {routerReducer} from '@ngrx/router-store';
import { environment } from '../environments/environment';
  
  export interface AppState {
  
  }

  export function logger(reducers:ActionReducer<any>) : ActionReducer<any> {
    return (state,action) => {
        console.log("state before: ", state);
        console.log("action", action);
        return reducers(action, state);
    }
  }
  
  export const reducers: ActionReducerMap<AppState> = {
      router: routerReducer
  };
  
  export const metaReducers: MetaReducer<AppState>[] =
      !environment.production ? [logger] : []; 
      // the order of the array will be the order that MetaReducer will be execute