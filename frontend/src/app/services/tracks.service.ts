import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiTrackData, Track, TrackData } from '../models/track.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TracksService {

  constructor(private http: HttpClient) {}

  getTracksByAlbum(id: string){
    return this.http.get<ApiTrackData[]>(environment.apiUrl + `/tracks?album=${id}`).pipe(
      map(response => {
        return response.map(track => {
          return new Track(
            track._id,
            track.title,
            track.album,
            track.duration,
            track.isPublished,
          )
        })
      })
    );
  }

  createTrack(trackData: TrackData){
    return this.http.post<ApiTrackData>(environment.apiUrl + '/tracks', trackData);
  }
}
