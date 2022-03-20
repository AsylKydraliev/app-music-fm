import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Album } from '../../models/album.model';
import { fetchAlbumsRequest } from '../../store/albums/albums.actions';
import { ActivatedRoute } from '@angular/router';


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
  title!: string;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.albums = store.select(state => state.albums.albums);
    this.loading = store.select(state => state.albums.fetchLoading);
    this.error = store.select(state => state.albums.fetchError);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.title = params['title'];
      this.store.dispatch(fetchAlbumsRequest({artist_id: params['id']}));
    })
  }
}
