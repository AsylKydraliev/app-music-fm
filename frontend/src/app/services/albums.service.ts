import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AlbumData, ApiAlbumsData } from '../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(private http: HttpClient) {}

  createAlbum(albumData: AlbumData){
    const formData = new FormData();

    Object.keys(albumData).forEach(key => {
      if (albumData[key] !== null) {
        formData.append(key, albumData[key]);
      }
    });
    return this.http.post<ApiAlbumsData>(environment.apiUrl + `/albums`, formData);
  }
}
