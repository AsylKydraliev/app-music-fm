import { Component, OnInit } from '@angular/core';
import { Artist, ArtistPublish } from '../../models/artist.model';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { fetchArtistsRequest, publishArtistRequest, removeArtistRequest } from '../../store/artists/artists.actions';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.sass']
})
export class ArtistsComponent implements OnInit {
  artists: Observable<Artist[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  api = environment.apiUrl;

  constructor(private store: Store<AppState>) {
    this.artists = store.select(state => state.artists.artists);
    this.loading = store.select(state => state.artists.fetchLoading);
    this.error = store.select(state => state.artists.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchArtistsRequest());
  }

  onPublish(_id: string, event: Event) {
    event.stopPropagation();
    const artistPublish: ArtistPublish = {
      isPublished: true,
    }

    this.store.dispatch(publishArtistRequest({artistPublish: artistPublish, id: _id}));
    this.store.dispatch(fetchArtistsRequest());
  }

  onRemove(_id: string) {
    this.store.dispatch(removeArtistRequest({id: _id}));
  }
}
