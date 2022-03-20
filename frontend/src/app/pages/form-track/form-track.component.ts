import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { Album } from '../../models/album.model';
import { NgForm } from '@angular/forms';
import { fetchAlbumsRequest } from '../../store/albums/albums.actions';
import { Artist } from '../../models/artist.model';
import { fetchArtistsRequest } from '../../store/artists/artists.actions';
import { TrackData } from '../../models/track.model';
import { createTrackRequest } from '../../store/tracks/tracks.actions';

@Component({
  selector: 'app-form-track',
  templateUrl: './form-track.component.html',
  styleUrls: ['./form-track.component.sass']
})
export class FormTrackComponent implements OnInit {
  @ViewChild('f') form!: NgForm;

  loading: Observable<boolean>;
  error: Observable<null | string>;
  albums: Observable<Album[]>;
  artists: Observable<Artist[]>;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.tracks.createLoading);
    this.error = store.select(state => state.tracks.createError);
    this.albums = store.select(state => state.albums.albums);
    this.artists = store.select(state => state.artists.artists);
  }

  ngOnInit(){
    this.store.dispatch(fetchArtistsRequest());
  }

  onSubmit() {
    const trackData: TrackData = this.form.value;
    this.store.dispatch(createTrackRequest({trackData: trackData}))
  }

  getAlbums(id: string){
    this.store.dispatch(fetchAlbumsRequest({artist_id: id}));
  }
}
