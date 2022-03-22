import { createAction, props } from '@ngrx/store';
import { Album, AlbumData, AlbumPublish } from '../../models/album.model';

export const fetchAlbumsRequest = createAction('[Albums] Fetch Request', props<{artist_id: string}>());
export const fetchAlbumsSuccess = createAction('[Albums] Fetch Success', props<{albums: Album[]}>());
export const fetchAlbumsFailure = createAction('[Albums] Fetch Failure', props<{error: string}>());

export const createAlbumRequest = createAction('[Album] Create Request', props<{albumData: AlbumData}>());
export const createAlbumSuccess = createAction('[Album] Create Success');
export const createAlbumFailure = createAction('[Album] Create Failure', props<{error: string | null}>());

export const publishAlbumRequest = createAction('[Album] Publish Request',
  props<{albumPublish: AlbumPublish, id: string}>());
export const publishAlbumSuccess = createAction('[Album] Publish Success');

export const removeAlbumRequest = createAction('[Album] Remove Request',
  props<{id: string}>());
export const removeAlbumSuccess = createAction('[Album] Remove Success');
