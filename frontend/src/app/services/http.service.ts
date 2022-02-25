import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiArtistData, Artist } from '../models/artist.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Album, ApiAlbumsData } from '../models/album.model';

@Injectable({
  providedIn: 'root'
})

export class HttpService{
  id!: string;
  constructor(private http: HttpClient) {}

  getArtists(){
    return this.http.get<ApiArtistData[]>(environment.apiUrl + '/artists').pipe(
      map(response => {
        return response.map(artists => {
          return new Artist(
            artists._id,
            artists.title,
            artists.photo,
            artists.info,
          )
        })
      }
    ))
  }

  getAlbumsByArtist(id: string){
    return this.http.get<ApiAlbumsData[]>(environment.apiUrl + `/albums?artist_id=${id}`).pipe(
      map(response => {
          return response.map(albums => {
            return new Album(
              albums._id,
              albums.title,
              albums.artist_id,
              albums.year,
              albums.image
            )
          })
        }
      ))
  }
}
