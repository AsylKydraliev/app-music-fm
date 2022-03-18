import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { createHistoryFailure, createHistoryRequest, createHistorySuccess } from './trackHistory.actions';
import { TrackHistoryService } from '../services/trackHistory.service';

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

  constructor(
    private trackHistoryService: TrackHistoryService,
    private actions: Actions
  ) {}
}
