import { Artist } from '../models/artist.model';
import { Album } from '../models/album.model';
import { LoginError, RegisterError, User } from '../models/user.model';
import { Track } from '../models/track.model';
import { TrackHistories, TrackHistory } from '../models/trackHistory.model';

export type ArtistsState = {
  artists: Artist[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
  publishLoading: boolean,
  removeLoading: boolean,
};

export type AlbumsState = {
  albums: Album[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
  publishLoading: boolean,
  removeLoading: boolean,
};

export type UserState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
  fbLoading: boolean,
  googleLoading: boolean,
};

export type TracksState = {
  tracks: Track[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
  publishLoading: boolean,
  removeLoading: boolean,
};

export type TrackHistoryState = {
  trackHistory: TrackHistory | null,
  trackHistories: TrackHistories[],
  createLoading: boolean,
  createError: null | string,
  fetchLoading: boolean,
  fetchError: null | string,
};

export type AppState = {
  artists: ArtistsState,
  albums: AlbumsState,
  users: UserState,
  tracks: TracksState,
  trackHistory: TrackHistoryState,
};


