import { createReducer, on } from '@ngrx/store';
import {
  createArtistFailure,
  createArtistRequest,
  createArtistSuccess,
  fetchArtistsFailure,
  fetchArtistsRequest,
  fetchArtistsSuccess,
  publishArtistRequest,
  publishArtistSuccess,
  removeArtistRequest,
  removeArtistSuccess
} from './artists.actions';
import { ArtistsState } from '../types';

const initialState: ArtistsState = {
  artists: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  publishLoading: false,
  removeLoading: false
};

export const artistsReducer = createReducer(
  initialState,
  on(fetchArtistsRequest, state => ({...state, fetchLoading: true})),
  on(fetchArtistsSuccess, (state, {artists}) => ({...state, fetchLoading: false, artists})),
  on(fetchArtistsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(createArtistRequest, state => ({...state, createLoading: true,})),
  on(createArtistSuccess, state => ({...state, createLoading: false})),
  on(createArtistFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),

  on(publishArtistRequest, state => ({...state, publishLoading: true})),
  on(publishArtistSuccess, state => ({...state, publishLoading: false})),

  on(removeArtistRequest, (state, {id}) => {
    const updateArtist = state.artists.filter(artist => {
      return artist._id !== id;
    });

    return {...state, artists: updateArtist, removeLoading: true}
  }),
  on(removeArtistSuccess, state => ({...state, publishLoading: false})),
)
