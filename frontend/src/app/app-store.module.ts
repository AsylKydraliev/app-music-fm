import { NgModule } from '@angular/core';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { artistsReducer } from './store/artists/artists.reducer';
import { albumsReducer } from './store/albums/albums.reducer';
import { usersReducer } from './store/users/users.reducer';
import { tracksReducer } from './store/tracks/tracks.reducer';
import { trackHistoryReducer } from './store/trackHistory/trackHistory.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ArtistsEffects } from './store/artists/artists.effects';
import { AlbumsEffects } from './store/albums/albums.effects';
import { UsersEffects } from './store/users/users.effects';
import { TracksEffects } from './store/tracks/tracks.effects';
import { TrackHistoryEffects } from './store/trackHistory/trackHistory.effects';

export const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true
  })(reducer);
}

const metaReducers: Array<MetaReducer> = [localStorageSyncReducer];

const reducers = {
    artists: artistsReducer,
    albums: albumsReducer,
    users: usersReducer,
    tracks: tracksReducer,
    trackHistory: trackHistoryReducer
  };

const effects = [ArtistsEffects, AlbumsEffects, UsersEffects, TracksEffects, TrackHistoryEffects];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers,{metaReducers}),
    EffectsModule.forRoot(effects),
  ],
  exports: [StoreModule, EffectsModule]
})

export class AppStoreModule {}
