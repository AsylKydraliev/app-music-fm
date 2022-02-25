import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { ArtistsComponent } from './artists/artists.component';
import { AlbumsComponent } from './albums/albums.component';
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

@NgModule({
  declarations: [
    AppComponent,
    ArtistsComponent,
    AlbumsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({
      artists: artistsReducer,
      albums: albumsReducer
    }, {}),
    MatToolbarModule,
    MatCardModule,
    FlexModule,
    EffectsModule.forRoot([ArtistsEffects, AlbumsEffects]),
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
