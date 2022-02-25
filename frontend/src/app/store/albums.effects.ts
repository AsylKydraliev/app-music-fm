import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpService } from '../services/http.service';
import { fetchAlbumsFailure, fetchAlbumsRequest, fetchAlbumsSuccess } from './albums.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()

export class AlbumsEffects {
  fetchAlbums = createEffect(() => this.actions.pipe(
    ofType(fetchAlbumsRequest),
    mergeMap(artist_id => this.httpService.getAlbumsByArtist({artist_id})).pipe(
      map(albums => fetchAlbumsSuccess({albums})),
      catchError(() => of(fetchAlbumsFailure({
        error: 'Something went wrong'
      })))
    )
  ));

  constructor(
    private httpService: HttpService,
    private actions: Actions
  ) {}
}
