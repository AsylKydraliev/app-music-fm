import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  loginUsersFailure,
  loginUsersRequest,
  loginUsersSuccess, logoutUser, logoutUserRequest,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess
} from './users.actions';
import { catchError, map, mergeMap, NEVER, of, tap, withLatestFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from './types';

@Injectable()
export class UsersEffects {
  registerUser = createEffect(() => this.actions.pipe(
    ofType(registerUserRequest),
    mergeMap(({users}) => this.usersService.registerUser(users).pipe(
      map(user => registerUserSuccess({user})),
      tap(() => {
        this.snackbar.open('Register successful', 'OK', {duration: 3000});
        void this.router.navigate(['/']);
      }),
      catchError(requestError => {
        let registerError = null;

        if(requestError instanceof HttpErrorResponse && requestError.status === 400) {
          registerError = requestError.error;
        }else{
          this.snackbar.open('Server error', 'OK', {duration: 3000});
        }

        return of(registerUserFailure({error: registerError}));
      })
    ))
  ))

  loginUser = createEffect(() => this.actions.pipe(
    ofType(loginUsersRequest),
    mergeMap(({userData}) => this.usersService.loginUser(userData).pipe(
      map(user => loginUsersSuccess({user})),
      tap(() => {
        this.snackbar.open('Login successful', 'OK', {duration: 3000});
        void this.router.navigate(['/']);
      }),
      catchError(requestError => {
        let loginError = null;

        if(requestError instanceof HttpErrorResponse && requestError.status === 400) {
          loginError = requestError.error;
        }else{
          this.snackbar.open('Server error', 'OK', {duration: 3000});
        }

        return of(loginUsersFailure({error: loginError}));
      })
    ))
  ))

  logoutUser = createEffect(() => this.actions.pipe(
    ofType(logoutUserRequest),
    withLatestFrom(this.store.select(state => state.users.user)),
    mergeMap(([_, user]) => {
      if(user){
        return this.usersService.logoutUser(user.token).pipe(
          map(() => logoutUser()),
          tap(() => {
            this.snackbar.open('Logout successful', 'OK', {duration: 3000});
            void this.router.navigate(['/'])
          })
        )
      }

      return NEVER;
    })
  ))

  constructor(
    private actions: Actions,
    private usersService: UsersService,
    private router: Router,
    private snackbar: MatSnackBar,
    private store: Store<AppState>,
  ) {}
}
