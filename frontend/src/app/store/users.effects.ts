import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { registerUserFailure, registerUserRequest, registerUserSuccess } from './users.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UsersEffects {
  fetchUser = createEffect(() => this.actions.pipe(
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

  constructor(
    private actions: Actions,
    private usersService: UsersService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}
}
