import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { createAlbumRequest } from '../../store/albums/albums.actions';
import { NgForm } from '@angular/forms';
import { AlbumData } from '../../models/album.model';
import { Artist } from '../../models/artist.model';
import { fetchArtistsRequest } from '../../store/artists/artists.actions';

@Component({
  selector: 'app-form-album',
  templateUrl: './form-album.component.html',
  styleUrls: ['./form-album.component.sass']
})
export class FormAlbumComponent implements OnInit {
  @ViewChild('f') form!: NgForm;

  loading: Observable<boolean>;
  error: Observable<null | string>;
  artists: Observable<Artist[]>;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.albums.createLoading);
    this.error = store.select(state => state.albums.createError);
    this.artists = store.select(state => state.artists.artists);
  }

  ngOnInit() {
    this.store.dispatch(fetchArtistsRequest());
  }

  onSubmit() {
    const albumData: AlbumData = this.form.value;
    this.store.dispatch(createAlbumRequest({albumData: albumData}));
  }
}
