import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { TrackHistories } from '../../models/trackHistory.model';
import { fetchHistoryRequest } from '../../store/trackHistory.actions';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-track-history',
  templateUrl: './track-history.component.html',
  styleUrls: ['./track-history.component.sass']
})
export class TrackHistoryComponent implements OnInit {
  histories: Observable<TrackHistories[]>;
  albums: Observable<Album[]>;
  userSubscription!: Subscription;

  constructor(private store: Store<AppState>) {
    this.histories = store.select(state => state.trackHistory.trackHistories);
    this.albums = store.select(state => state.albums.albums);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchHistoryRequest());
  }
}
