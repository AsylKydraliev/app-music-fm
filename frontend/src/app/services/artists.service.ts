import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiArtistData, ArtistData } from '../models/artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  constructor(private http: HttpClient) {}

  addArtist(artistData: ArtistData){
    const formData = new FormData();

    Object.keys(artistData).forEach(key => {
      if (artistData[key] !== null) {
        formData.append(key, artistData[key]);
      }
    });
    return this.http.post<ApiArtistData>(environment.apiUrl + `/artists`, formData);
  }
}
