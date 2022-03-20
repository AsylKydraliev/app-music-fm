import { createReducer, on } from '@ngrx/store';
import { fetchArtistsFailure, fetchArtistsRequest, fetchArtistsSuccess } from './artists.actions';
import { ArtistsState } from '../types';

const initialState: ArtistsState = {
  artists: [],
  fetchLoading: false,
  fetchError: null
};

export const artistsReducer = createReducer(
  initialState,
  on(fetchArtistsRequest, state => ({...state, fetchLoading: true})),
  on(fetchArtistsSuccess, (state, {artists}) => ({
    ...state,
    fetchLoading: false,
    artists
  })),
  on(fetchArtistsFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),

)
