import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpService } from '../../services/http.service';
import {
  createAlbumFailure,
  createAlbumRequest,
  createAlbumSuccess,
  fetchAlbumsFailure,
  fetchAlbumsRequest,
  fetchAlbumsSuccess, publishAlbumRequest, publishAlbumSuccess
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
          error: 'You need to register to add an album!'
        })))
      )
    ))
  );

  publishAlbum = createEffect(() => this.actions.pipe(
    ofType(publishAlbumRequest),
    mergeMap(({albumPublish, id}) => this.albumsService.publishAlbum(albumPublish, id).pipe(
        map(() => {
          console.log('ok')

          return publishAlbumSuccess()
        }),
        tap(() => {
          this.helpers.openSnackbar('Album published');
        }),
      )
    ))
  );

  constructor(
    private albumsService: AlbumsService,
    private httpService: HttpService,
    private actions: Actions,
    private helpers: HelpersService,
    private router: Router,
  ) {}
}
