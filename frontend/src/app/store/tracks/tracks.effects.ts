import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import {
  createTrackFailure,
  createTrackRequest,
  createTrackSuccess,
  fetchTracksFailure,
  fetchTracksRequest,
  fetchTracksSuccess,
  publishTrackRequest,
  publishTrackSuccess
} from './tracks.actions';
import { TracksService } from '../../services/tracks.service';
import { HelpersService } from '../../services/helpers.service';
import { Router } from '@angular/router';

@Injectable()

export class TracksEffects {
  fetchTracksByAlbum = createEffect(() => this.actions.pipe(
    ofType(fetchTracksRequest),
    mergeMap(id => this.tracksService.getTracksByAlbum(id.album).pipe(
      map(tracks => fetchTracksSuccess({tracks})),
      catchError(() => of(fetchTracksFailure({
        error: 'Something went wrong'
      })))
    )
  )));

  createTrack = createEffect(() => this.actions.pipe(
    ofType(createTrackRequest),
    mergeMap(({trackData}) => this.tracksService.createTrack(trackData).pipe(
        map(() => createTrackSuccess()),
        tap(() => {
          this.helpers.openSnackbar('Track added');
          void this.router.navigate(['/']);
        }),
        catchError(() => of(createTrackFailure({
          error: 'You need to register to add an track!'
        })))
      )
    ))
  );

  publishTrack = createEffect(() => this.actions.pipe(
    ofType(publishTrackRequest),
    mergeMap(({trackPublish, id}) => this.tracksService.publishTrack(trackPublish, id).pipe(
        map(() => publishTrackSuccess()),
        tap(() => {
          this.helpers.openSnackbar('Track published');
        }),
      )
    ))
  );

  constructor(
    private tracksService: TracksService,
    private actions: Actions,
    private helpers: HelpersService,
    private router: Router,
  ) {}
}
