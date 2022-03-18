import { createAction, props } from '@ngrx/store';
import { TrackHistory, TrackHistoryData } from '../models/trackHistory.model';

export const createHistoryRequest = createAction('[History] Create Request',
  props<{trackHistoryData: TrackHistoryData, token: string}>());
export const createHistorySuccess = createAction('[History] Create Success', props<{trackHistory: TrackHistory}>());
export const createHistoryFailure = createAction('[History] Create Failure', props<{error: string}>());
