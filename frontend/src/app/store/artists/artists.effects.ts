import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpService } from '../../services/http.service';
import { fetchArtistsFailure, fetchArtistsRequest, fetchArtistsSuccess } from './artists.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()

export class ArtistsEffects {
  fetchArtists = createEffect(() => this.actions.pipe(
    ofType(fetchArtistsRequest),
    mergeMap(() => this.httpService.getArtists().pipe(
      map(artists => fetchArtistsSuccess({artists})),
      catchError(() => of(fetchArtistsFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  constructor(
    private actions: Actions,
    private httpService: HttpService,
  ) {}
}

