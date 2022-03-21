import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpService } from '../../services/http.service';
import {
  createArtistFailure,
  createArtistRequest,
  createArtistSuccess,
  fetchArtistsFailure,
  fetchArtistsRequest,
  fetchArtistsSuccess
} from './artists.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { HelpersService } from '../../services/helpers.service';
import { Router } from '@angular/router';
import { ArtistsService } from '../../services/artists.service';

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

  constructor(
    private actions: Actions,
    private httpService: HttpService,
    private artistsService: ArtistsService,
    private helpers: HelpersService,
    private router: Router,
  ) {}
}
