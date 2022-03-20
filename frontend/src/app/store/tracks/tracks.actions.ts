import { createAction, props } from '@ngrx/store';
import { Track, TrackData } from '../../models/track.model';

export const fetchTracksRequest = createAction('[Tracks] Fetch Request', props<{album: string}>());
export const fetchTracksSuccess = createAction('[Tracks] Fetch Success', props<{tracks: Track[]}>());
export const fetchTracksFailure = createAction('[Tracks] Fetch Failure', props<{error: string}>());

export const createTrackRequest = createAction('[Track] Create Request', props<{trackData: TrackData}>());
export const createTrackSuccess = createAction('[Track] Success Request');
export const createTrackFailure = createAction('[Track] Create Failure', props<{error: null | string}>());
