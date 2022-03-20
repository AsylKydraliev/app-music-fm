import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { fetchTracksFailure, fetchTracksRequest, fetchTracksSuccess } from './tracks.actions';
import { TracksService } from '../../services/tracks.service';

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

  constructor(
    private tracksService: TracksService,
    private actions: Actions
  ) {}
}
