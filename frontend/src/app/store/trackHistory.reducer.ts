import { TrackHistoryState } from './types';
import { createReducer, on } from '@ngrx/store';
import { createHistoryFailure, createHistoryRequest, createHistorySuccess } from './trackHistory.actions';

const initialState: TrackHistoryState = {
  trackHistory: null,
  createLoading: false,
  createError: null
}
export const trackHistoryReducer = createReducer(
  initialState,
  on(createHistoryRequest, state => ({...state, createLoading: true})),
  on(createHistorySuccess, (state, {trackHistory}) => ({...state, createLoading: false, trackHistory: trackHistory})),
  on(createHistoryFailure, (state, {error}) => ({...state, createLoading: true, createError: error})),
)
