import { createAction, props } from "@ngrx/store";
import { User } from "./model/user.model";


/* action creator, create the action */
export const login = createAction(
        "[Login Page] " /* where the action is use - the source (where this action will be dispatch) */ + 
        "User Login" /* what the action is doing */ 
        ,props<{user:User}>() 
)

/* action creator, create the action */
export const logout = createAction(
    "[Top Menu] Logout" 
    // without payload
)