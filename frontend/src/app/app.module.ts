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
import { RegisterComponent } from './register/register.component';
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

@NgModule({
  declarations: [
    AppComponent,
    ArtistsComponent,
    AlbumsComponent,
    RegisterComponent,
    FileInputComponent,
    FileInputComponent,
    ValidateIdenticalDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({
      artists: artistsReducer,
      albums: albumsReducer,
      users: usersReducer
    }, {}),
    MatToolbarModule,
    MatCardModule,
    FlexModule,
    EffectsModule.forRoot([ArtistsEffects, AlbumsEffects, UsersEffects]),
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
