import { TrackHistoryState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createHistoryFailure,
  createHistoryRequest,
  createHistorySuccess, fetchHistoryFailure,
  fetchHistoryRequest, fetchHistorySuccess
} from './trackHistory.actions';
import { fetchTracksRequest } from './tracks.actions';
import { fetchAlbumsFailure } from './albums.actions';

const initialState: TrackHistoryState = {
  trackHistory: null,
  trackHistories: [],
  createLoading: false,
  createError: null,
  fetchLoading: false,
  fetchError: null,
}
export const trackHistoryReducer = createReducer(
  initialState,
  on(createHistoryRequest, state => ({...state, createLoading: true})),
  on(createHistorySuccess, (state, {trackHistory}) => ({...state, createLoading: false, trackHistory: trackHistory})),
  on(createHistoryFailure, (state, {error}) => ({...state, createLoading: true, createError: error})),

  on(fetchHistoryRequest, state => ({...state, fetchLoading: true})),
  on(fetchHistorySuccess, (state, {trackHistories}) => ({
    ...state, fetchLoading: false,
    trackHistories
  })),
  on(fetchHistoryFailure, (state, {error}) => ({...state, fetchLoading: true, fetchError: error})),
)
