import { createAction, props } from '@ngrx/store';
import { TrackHistories, TrackHistory, TrackHistoryData } from '../models/trackHistory.model';

export const createHistoryRequest = createAction('[History] Create Request',
  props<{trackHistoryData: TrackHistoryData}>());
export const createHistorySuccess = createAction('[History] Create Success', props<{trackHistory: TrackHistory}>());
export const createHistoryFailure = createAction('[History] Create Failure', props<{error: string}>());

export const fetchHistoryRequest = createAction('[Histories] Fetch Request');
export const fetchHistorySuccess = createAction('[Histories] Fetch Success',
  props<{trackHistories: TrackHistories[]}>());
export const fetchHistoryFailure = createAction('[Histories] Fetch Failure', props<{error: string}>());
