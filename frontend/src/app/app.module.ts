import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArtistsComponent } from './pages/artists/artists.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RegisterComponent } from './userManage/register/register.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { ValidateIdenticalDirective } from './validate-identical.directive';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LayoutComponent } from './ui/layout/layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './userManage/login/login.component';
import { MatMenuModule } from '@angular/material/menu';
import { TracksComponent } from './pages/tracks/tracks.component';
import { MatSliderModule } from '@angular/material/slider';
import { TrackHistoryComponent } from './pages/track-history/track-history.component';
import { MatTableModule } from '@angular/material/table';
import { AppStoreModule } from './app-store.module';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthInterceptor } from './auth.interceptor';
import { FormArtistComponent } from './pages/form-artist/form-artist.component';
import { FormAlbumComponent } from './pages/form-album/form-album.component';
import { FormTrackComponent } from './pages/form-track/form-track.component';
import { MatSelectModule } from '@angular/material/select';
import { HasRolesDirective } from './directives/has-roles.directive';
import { RolesDirective } from './directives/roles.directive';
import { NotFoundComponent } from './not-found.component';
import { FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { environment } from '../environments/environment';
import { ProfileComponent } from './pages/profile/profile.component';

const socialConfig: SocialAuthServiceConfig = {
  autoLogin: false,
  providers: [{
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.fbAppId, {
      scope: 'email,public_profile'
    })
  }]
}

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
    TrackHistoryComponent,
    FormArtistComponent,
    FormAlbumComponent,
    FormTrackComponent,
    HasRolesDirective,
    RolesDirective,
    NotFoundComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatCardModule,
    FlexModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSliderModule,
    MatTableModule,
    AppRoutingModule,
    AppStoreModule,
    MatSelectModule,
    SocialLoginModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: 'SocialAuthServiceConfig', useValue: socialConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
