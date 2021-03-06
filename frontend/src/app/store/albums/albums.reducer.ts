import { AlbumsState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  createAlbumFailure,
  createAlbumRequest,
  createAlbumSuccess,
  fetchAlbumsFailure,
  fetchAlbumsRequest,
  fetchAlbumsSuccess,
  publishAlbumRequest,
  publishAlbumSuccess,
  removeAlbumRequest,
  removeAlbumSuccess
} from './albums.actions';

const initialState: AlbumsState = {
  albums: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  publishLoading: false,
  removeLoading: false,
}
export const albumsReducer = createReducer(
  initialState,
  on(fetchAlbumsRequest, state => ({...state, fetchLoading: true})),
  on(fetchAlbumsSuccess, (state, {albums}) => ({...state, fetchLoading: false, albums})),
  on(fetchAlbumsFailure, (state, {error}) => ({...state, fetchLoading: true, fetchError: error})),

  on(createAlbumRequest, state => ({...state, createLoading: true})),
  on(createAlbumSuccess, state => ({...state, createLoading: false})),
  on(createAlbumFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),

  on(publishAlbumRequest, state => ({...state, publishLoading: true})),
  on(publishAlbumSuccess, state => ({...state, publishLoading: false})),

  on(removeAlbumRequest, (state, {id}) => {
    const updateAlbum = state.albums.filter(album => {
      return album._id !== id;
    });

    return {...state, albums: updateAlbum, removeLoading: true}
  }),
  on(removeAlbumSuccess, state => ({...state, publishLoading: false})),
)
