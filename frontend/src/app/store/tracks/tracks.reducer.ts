import { TracksState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  createTrackFailure,
  createTrackRequest,
  createTrackSuccess,
  fetchTracksFailure,
  fetchTracksRequest,
  fetchTracksSuccess,
  publishTrackRequest,
  publishTrackSuccess,
  removeTrackRequest
} from './tracks.actions';
import { removeArtistSuccess } from '../artists/artists.actions';

const initialState: TracksState = {
  tracks: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  publishLoading: false,
  removeLoading: false,
}
export const tracksReducer = createReducer(
  initialState,
  on(fetchTracksRequest, state => ({...state, fetchLoading: true})),
  on(fetchTracksSuccess, (state, {tracks}) => ({...state, fetchLoading: false, tracks})),
  on(fetchTracksFailure, (state, {error}) => ({...state, fetchLoading: true, fetchError: error})),

  on(createTrackRequest, state => ({...state, createLoading: true})),
  on(createTrackSuccess, state => ({...state, createLoading: false})),
  on(createTrackFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),

  on(publishTrackRequest, state => ({...state, publishLoading: true})),
  on(publishTrackSuccess, state => ({...state, publishLoading: false})),

  on(removeTrackRequest, (state, {id}) => {
    const updateTrack = state.tracks.filter(track => {
      return track._id !== id;
    });

    return {...state, tracks: updateTrack, removeLoading: true}
  }),
  on(removeArtistSuccess, state => ({...state, publishLoading: false})),
)
