import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, NEVER, of, withLatestFrom } from 'rxjs';
import {
  createHistoryFailure,
  createHistoryRequest,
  createHistorySuccess,
  fetchHistoryFailure,
  fetchHistoryRequest,
  fetchHistorySuccess
} from './trackHistory.actions';
import { TrackHistoryService } from '../services/trackHistory.service';
import { Store } from '@ngrx/store';
import { AppState } from './types';

@Injectable()

export class TrackHistoryEffects {
  createTrackHistory = createEffect(() => this.actions.pipe(
    ofType(createHistoryRequest),
    mergeMap(({trackHistoryData, token}) =>
      this.trackHistoryService.createTrackHistory(trackHistoryData, token).pipe(
      map(trackHistory => createHistorySuccess({trackHistory}),
      catchError(() => of(createHistoryFailure({error: 'Something went wrong'})
      ))
    )
  ))));

  fetchTrackHistory = createEffect(() => this.actions.pipe(
    ofType(fetchHistoryRequest),
    withLatestFrom(this.store.select(state => state.users.user)),
    mergeMap(([_, user]) => {
      if(user){
        return this.trackHistoryService.getTracksHistories(user.token).pipe(
          map(trackHistories => {
            return fetchHistorySuccess({trackHistories})
          }),
          catchError(() => of(fetchHistoryFailure({error: 'Something went wrong'})
        )))
      }

      return NEVER;
    })))

  constructor(
    private trackHistoryService: TrackHistoryService,
    private actions: Actions,
    private store: Store<AppState>
  ) {}
}
