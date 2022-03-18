import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { ArtistsComponent } from './pages/artists/artists.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';
import { EffectsModule } from '@ngrx/effects';
import { artistsReducer } from './store/artists.reducer';
import { ArtistsEffects } from './store/artists.effects';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { albumsReducer } from './store/albums.reducer';
import { AlbumsEffects } from './store/albums.effects';
import { RegisterComponent } from './userManage/register/register.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { ValidateIdenticalDirective } from './validate-identical.directive';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { usersReducer } from './store/users.reducer';
import { UsersEffects } from './store/users.effects';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LayoutComponent } from './ui/layout/layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './userManage/login/login.component';
import { localStorageSync } from 'ngrx-store-localstorage';
import { MatMenuModule } from '@angular/material/menu';
import { tracksReducer } from './store/tracks.reducer';
import { TracksEffects } from './store/tracks.effects';
import { TracksComponent } from './pages/tracks/tracks.component';
import { MatSliderModule } from '@angular/material/slider';
import { trackHistoryReducer } from './store/trackHistory.reducer';
import { TrackHistoryEffects } from './store/trackHistory.effects';
import { TrackHistoryComponent } from './pages/track-history/track-history.component';
import { MatTableModule } from '@angular/material/table';

export const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true
  })(reducer);
}

const metaReducers: Array<MetaReducer> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    ArtistsComponent,
    AlbumsComponent,
    RegisterComponent,
    LoginComponent,
    FileInputComponent,
    ValidateIdenticalDirective,
    LayoutComponent,
    TracksComponent,
    TrackHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({
      artists: artistsReducer,
      albums: albumsReducer,
      users: usersReducer,
      tracks: tracksReducer,
      trackHistory: trackHistoryReducer
    }, {metaReducers}),
    MatToolbarModule,
    MatCardModule,
    FlexModule,
    EffectsModule.forRoot(
      [ArtistsEffects, AlbumsEffects, UsersEffects, TracksEffects, TrackHistoryEffects]
    ),
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatSliderModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
