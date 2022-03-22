import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AlbumData, AlbumPublish, ApiAlbumsData } from '../models/album.model';

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

  publishAlbum(albumPublish: AlbumPublish, id: string){
    return this.http.post(environment.apiUrl + `/albums/${id}/publish`, albumPublish);
  }

  removeAlbum(id: string){
    return this.http.delete(environment.apiUrl + `/albums/${id}`);
  }
}
