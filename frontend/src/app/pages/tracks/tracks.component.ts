import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { Track } from '../../models/track.model';
import { fetchTracksRequest } from '../../store/tracks.actions';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../../models/album.model';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';
import { createHistoryRequest } from '../../store/trackHistory.actions';
import { TrackHistoryData } from '../../models/trackHistory.model';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.sass']
})
export class TracksComponent implements OnInit, OnDestroy {
  tracks: Observable<Track[]>;
  loading: Observable<boolean>;
  album!: Album;
  api = environment.apiUrl;
  tracksSubscription!: Subscription;
  userSubscription!: Subscription;
  user: Observable<null | User>;
  userData!: User;
  slider = 0;
  idTrack!: string;
  interval = 0;
  duration!: string;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.tracks = store.select(state => state.tracks.tracks);
    this.user = store.select(state => state.users.user);
    this.loading = store.select(state => state.tracks.fetchLoading);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.store.dispatch(fetchTracksRequest({album: params['id']}));
    })
    this.tracksSubscription = this.tracks.subscribe((tracks: Track[]) => {
      tracks.forEach(track => {
        this.album = <Album>track.album;
        this.duration = track.duration;
      })
    })
    this.userSubscription = this.user.subscribe(user => {
      this.userData = <User>user;
    })
  }

  onListen(id: string) {
    this.idTrack = id;
    this.slider = 0;

    const trackHistoryData: TrackHistoryData = {
      user: this.userData?._id,
      track: this.idTrack,
    }
    console.log(trackHistoryData)

    this.store.dispatch(createHistoryRequest({
      trackHistoryData: trackHistoryData,
      token: this.userData.token
    }));

    this.interval = setInterval(() => {
        this.slider++;
    }, 1000)
  };

  onPause() {
    clearInterval(this.interval);
  };

  ngOnDestroy(){
    this.tracksSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}


