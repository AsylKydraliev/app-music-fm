import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { Track, TrackPublish } from '../../models/track.model';
import { fetchTracksRequest, publishTrackRequest } from '../../store/tracks/tracks.actions';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../../models/album.model';
import { environment } from '../../../environments/environment';
import { createHistoryRequest } from '../../store/trackHistory/trackHistory.actions';
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
  slider = 0;
  idTrack!: string;
  interval = 0;
  albumId!: string;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.tracks = store.select(state => state.tracks.tracks);
    this.loading = store.select(state => state.tracks.fetchLoading);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.albumId = params['id'];
      this.store.dispatch(fetchTracksRequest({album: params['id']}));
    })
    this.tracksSubscription = this.tracks.subscribe((tracks: Track[]) => {
      tracks.forEach(track => {
        this.album = <Album>track.album;
      })
    })
  }

  onListen(id: string) {
    this.idTrack = id;
    this.playTrack();

    const trackHistoryData: TrackHistoryData = {
      track: this.idTrack,
    }

    this.store.dispatch(createHistoryRequest({trackHistoryData: trackHistoryData}));
  };

  playTrack(){
    this.slider = 0;

    this.interval = setInterval(() => {
      this.slider++;
    }, 1000)
  }

  onPause() {
    clearInterval(this.interval);
  };

  ngOnDestroy(){
    this.tracksSubscription.unsubscribe();
  }

  onPublish(_id: string) {
    const track: TrackPublish = {
      isPublished: true,
    }

    this.store.dispatch(publishTrackRequest({trackPublish: track, id: _id}));
    this.store.dispatch(fetchTracksRequest({album: this.albumId}));
  }
}


