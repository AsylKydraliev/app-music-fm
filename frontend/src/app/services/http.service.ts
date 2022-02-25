import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiArtistData, Artist } from '../models/artist.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpService{
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
}
