import { AlbumsState } from './types';
import { createReducer, on } from '@ngrx/store';
import { fetchAlbumsFailure, fetchAlbumsRequest, fetchAlbumsSuccess } from './albums.actions';

const initialState: AlbumsState = {
  albums: [],
  fetchLoading: false,
  fetchError: null
}
export const albumsReducer = createReducer(
  initialState,
  on(fetchAlbumsRequest, state => ({...state, fetchLoading: true})),
  on(fetchAlbumsSuccess, (state, {albums}) => ({
    ...state,
    fetchLoading: false,
    albums
  })),
  on(fetchAlbumsFailure, (state, {error}) => ({
    ...state,
    fetchLoading: true,
    fetchError: error
  })),
)
