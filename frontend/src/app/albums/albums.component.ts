import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../models/artist.model';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { fetchArtistsRequest } from '../store/artists.actions';
import { Album } from '../models/album.model';
import { fetchAlbumsRequest } from '../store/albums.actions';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.sass']
})
export class AlbumsComponent implements OnInit {
  albums: Observable<Album[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  api = environment.apiUrl;

  constructor(private store: Store<AppState>) {
    this.albums = store.select(state => state.albums.albums);
    this.loading = store.select(state => state.albums.fetchLoading);
    this.error = store.select(state => state.albums.fetchError);
  }

  ngOnInit(): void {
  }

}
