import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpService } from '../../services/http.service';
import {
  createArtistFailure,
  createArtistRequest,
  createArtistSuccess,
  fetchArtistsFailure,
  fetchArtistsRequest,
  fetchArtistsSuccess,
  publishArtistRequest,
  publishArtistSuccess,
  removeArtistRequest,
  removeArtistSuccess
} from './artists.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { HelpersService } from '../../services/helpers.service';
import { Router } from '@angular/router';
import { ArtistsService } from '../../services/artists.service';
import { Store } from '@ngrx/store';
import { AppState } from '../types';

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

  createArtist = createEffect(() => this.actions.pipe(
    ofType(createArtistRequest),
    mergeMap(({artistData}) => this.artistsService.addArtist(artistData).pipe(
        map(() => createArtistSuccess()),
        tap(() => {
          this.helpers.openSnackbar('Artist added');
          void this.router.navigate(['/']);
        }),
        catchError(() => of(createArtistFailure({
          error: 'You need to register to add an artist!'
        })))
      )
    )));

  publishArtist = createEffect(() => this.actions.pipe(
    ofType(publishArtistRequest),
    mergeMap(({artistPublish, id}) => this.artistsService.publishArtist(artistPublish, id).pipe(
        map(() => publishArtistSuccess()),
        tap(() => {
          this.store.dispatch(fetchArtistsRequest());
          this.helpers.openSnackbar('Artist published');
        }),
      )
    ))
  );

  removeArtist = createEffect(() => this.actions.pipe(
    ofType(removeArtistRequest),
    mergeMap(({id}) => this.artistsService.removeArtist(id).pipe(
        map(() => removeArtistSuccess()),
        tap(() => {
          this.helpers.openSnackbar('Artist deleted');
        }),
      )
    ))
  );

  constructor(
    private actions: Actions,
    private httpService: HttpService,
    private artistsService: ArtistsService,
    private helpers: HelpersService,
    private router: Router,
    private store: Store<AppState>,
  ) {}
}

