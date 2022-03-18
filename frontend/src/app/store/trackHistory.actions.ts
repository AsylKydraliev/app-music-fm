import { createAction, props } from '@ngrx/store';
import { TrackHistories, TrackHistory, TrackHistoryData } from '../models/trackHistory.model';

export const createHistoryRequest = createAction('[History] Create Request',
  props<{trackHistoryData: TrackHistoryData, token: string}>());
export const createHistorySuccess = createAction('[History] Create Success', props<{trackHistory: TrackHistory}>());
export const createHistoryFailure = createAction('[History] Create Failure', props<{error: string}>());

export const fetchHistoryRequest = createAction('[History] Fetch Request', props<{token: string}>());
export const fetchHistorySuccess = createAction('[History] Fetch Success',
  props<{trackHistories: TrackHistories[]}>());
export const fetchHistoryFailure = createAction('[History] Fetch Failure', props<{error: string}>());
