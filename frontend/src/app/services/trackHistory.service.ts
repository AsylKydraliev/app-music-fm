import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TrackHistories, TrackHistory, TrackHistoryApi, TrackHistoryData } from '../models/trackHistory.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrackHistoryService {

  constructor(private http: HttpClient) {}

  createTrackHistory(trackHistory: TrackHistoryData, token: string){
    return this.http.post<TrackHistory>(environment.apiUrl + `/track_history`, trackHistory, {
      headers: new HttpHeaders({'Authorization': token})
    });
  }

  getTracksHistories(token: string){
    return this.http.get<TrackHistories[]>(environment.apiUrl + `/track_history`, {
      headers: new HttpHeaders({'Authorization': token})
    }).pipe(
      map(response => {
        return response.map(history => {
          return new TrackHistoryApi(
            history._id,
            history.user,
            history.track,
            history.datetime,
            history.artist,
          )
        })
      })
    );
  }
}
