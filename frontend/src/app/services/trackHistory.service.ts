import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TrackHistory, TrackHistoryData } from '../models/trackHistory.model';

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
}
