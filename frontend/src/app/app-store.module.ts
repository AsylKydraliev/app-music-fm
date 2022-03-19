import { NgModule } from '@angular/core';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { artistsReducer } from './store/artists.reducer';
import { albumsReducer } from './store/albums.reducer';
import { usersReducer } from './store/users.reducer';
import { tracksReducer } from './store/tracks.reducer';
import { trackHistoryReducer } from './store/trackHistory.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ArtistsEffects } from './store/artists.effects';
import { AlbumsEffects } from './store/albums.effects';
import { UsersEffects } from './store/users.effects';
import { TracksEffects } from './store/tracks.effects';
import { TrackHistoryEffects } from './store/trackHistory.effects';

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
