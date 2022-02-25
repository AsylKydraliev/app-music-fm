import { createReducer, on } from '@ngrx/store';
import { fetchArtistsFailure, fetchArtistsRequest, fetchArtistsSuccess } from './artists.actions';
import { Artist } from '../models/artist.model';

const initialState = {
  artists: <Artist[]>[],
  fetchLoading: false,
  fetchError: <null | string>null
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
