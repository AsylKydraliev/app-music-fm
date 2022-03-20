import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpService } from '../../services/http.service';
import {
  createAlbumFailure,
  createAlbumRequest,
  createAlbumSuccess,
  fetchAlbumsFailure,
  fetchAlbumsRequest,
  fetchAlbumsSuccess
} from './albums.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AlbumsService } from '../../services/albums.service';
import { HelpersService } from '../../services/helpers.service';
import { Router } from '@angular/router';

@Injectable()

export class AlbumsEffects {
  fetchAlbums = createEffect(() => this.actions.pipe(
    ofType(fetchAlbumsRequest),
    mergeMap(id => this.httpService.getAlbumsByArtist(id.artist_id).pipe(
      map(albums => fetchAlbumsSuccess({albums})),
      catchError(() => of(fetchAlbumsFailure({
        error: 'Something went wrong'
      })))
    )
  )));

  createAlbum = createEffect(() => this.actions.pipe(
    ofType(createAlbumRequest),
    mergeMap(({albumData}) => this.albumsService.createAlbum(albumData).pipe(
        map(() => createAlbumSuccess()),
        tap(() => {
          this.helpers.openSnackbar('Album added');
          void this.router.navigate(['/']);
        }),
        catchError(() => of(createAlbumFailure({
          error: 'Something went wrong'
        })))
      )
    )));

  constructor(
    private albumsService: AlbumsService,
    private httpService: HttpService,
    private actions: Actions,
    private helpers: HelpersService,
    private router: Router,
  ) {}
}
