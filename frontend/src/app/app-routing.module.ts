import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './pages/artists/artists.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { RegisterComponent } from './userManage/register/register.component';
import { LoginComponent } from './userManage/login/login.component';
import { TracksComponent } from './pages/tracks/tracks.component';
import { TrackHistoryComponent } from './pages/track-history/track-history.component';
import { FormAlbumComponent } from './pages/form-album/form-album.component';
import { FormArtistComponent } from './pages/form-artist/form-artist.component';
import { FormTrackComponent } from './pages/form-track/form-track.component';

const routes: Routes = [
  {path: '', component: ArtistsComponent},
  {path: 'trackHistory', component: TrackHistoryComponent},
  {path: ':id/:title/artistAlbums', component: AlbumsComponent},
  {path: ':id/tracks', component: TracksComponent},
  {path: 'registration', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'addArtist', component: FormArtistComponent},
  {path: 'addAlbum', component: FormAlbumComponent},
  {path: 'addTrack', component: FormTrackComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
