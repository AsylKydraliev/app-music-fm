import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Album, AlbumPublish } from '../../models/album.model';
import { fetchAlbumsRequest, publishAlbumRequest, removeAlbumRequest } from '../../store/albums/albums.actions';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.sass']
})

export class AlbumsComponent implements OnInit {
  albums: Observable<Album[]>;
  user: Observable<User | null>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  api = environment.apiUrl;
  title!: string;
  artistId!: string;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.albums = store.select(state => state.albums.albums);
    this.loading = store.select(state => state.albums.fetchLoading);
    this.error = store.select(state => state.albums.fetchError);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.title = params['title'];
      this.artistId = params['id'];
      this.store.dispatch(fetchAlbumsRequest({artist_id: params['id']}));
    })
  }

  onPublish(_id: string) {
    const albumPublish: AlbumPublish = {
      isPublished: true,
    }

    this.store.dispatch(publishAlbumRequest({albumPublish: albumPublish, id: _id}));
    this.store.dispatch(fetchAlbumsRequest({artist_id: this.artistId}));
  }

  onDelete(_id: string) {
    this.store.dispatch(removeAlbumRequest({id: _id}));
  }
}
