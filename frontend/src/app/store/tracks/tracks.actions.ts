import { createAction, props } from '@ngrx/store';
import { Track, TrackData, TrackPublish } from '../../models/track.model';

export const fetchTracksRequest = createAction('[Tracks] Fetch Request', props<{album: string}>());
export const fetchTracksSuccess = createAction('[Tracks] Fetch Success', props<{tracks: Track[]}>());
export const fetchTracksFailure = createAction('[Tracks] Fetch Failure', props<{error: string}>());

export const createTrackRequest = createAction('[Track] Create Request', props<{trackData: TrackData}>());
export const createTrackSuccess = createAction('[Track] Success Request');
export const createTrackFailure = createAction('[Track] Create Failure', props<{error: null | string}>());

export const publishTrackRequest = createAction('[Track] Publish Request',
  props<{trackPublish: TrackPublish, id: string}>());
export const publishTrackSuccess = createAction('[Track] Publish Success');

export const removeTrackRequest = createAction('[Track] Remove Request',
  props<{id: string}>());
export const removeTrackSuccess = createAction('[Track] Remove Success');
