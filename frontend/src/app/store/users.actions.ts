import { createAction, props } from '@ngrx/store';
import { RegisterError, RegisterUser, User } from '../models/user.model';

export const registerUserRequest = createAction('[Users] Register Request', props<{users: RegisterUser}>());
export const registerUserSuccess = createAction('[Users] Register Success', props<{user: User}>());
export const registerUserFailure = createAction('[Users] Register Failure', props<{error: null | RegisterError}>());
