import { createAction, props } from '@ngrx/store';
import { Artist, ArtistData, ArtistPublish } from '../../models/artist.model';

export const fetchArtistsRequest = createAction('[Artists] Fetch Request');
export const fetchArtistsSuccess = createAction('[Artists] Fetch Success', props<{artists: Artist[]}>());
export const fetchArtistsFailure = createAction('[Artists] Fetch Failure', props<{error: string}>());

export const createArtistRequest = createAction('[Artist] Create Request', props<{artistData: ArtistData}>());
export const createArtistSuccess = createAction('[Artist] Create Success');
export const createArtistFailure = createAction('[Artist] Create Failure', props<{error: string | null}>());

export const publishArtistRequest = createAction('[Artist] Publish Request',
  props<{artistPublish: ArtistPublish, id: string}>());
export const publishArtistSuccess = createAction('[Artist] Publish Success');

export const removeArtistRequest = createAction('[Artist] Remove Request',
  props<{id: string}>());
export const removeArtistSuccess = createAction('[Artist] Remove Success');
