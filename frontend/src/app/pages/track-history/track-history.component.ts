import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { TrackHistories } from '../../models/trackHistory.model';
import { fetchHistoryRequest } from '../../store/trackHistory.actions';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-track-history',
  templateUrl: './track-history.component.html',
  styleUrls: ['./track-history.component.sass']
})
export class TrackHistoryComponent implements OnInit {
  histories: Observable<TrackHistories[]>;
  user: Observable<User | null>;

  constructor(private store: Store<AppState>) {
    this.histories = store.select(state => state.trackHistory.trackHistories);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.user.subscribe(user => {
      const token = <string>user?.token;
      this.store.dispatch(fetchHistoryRequest({token: token}))
    })
  }
}
