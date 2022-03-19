export class TrackHistory {
  constructor(
    public _id: string,
    public user: string,
    public track: string,
    public datetime: string,
  ) {}
}

export class TrackHistoryApi {
  constructor(
    public _id: string,
    public user: string,
    public track: {
      _id: string,
      title: string,
      album: {
        _id: string,
        artist: string[]
      }
    },
    public datetime: string,
  ) {}
}

export interface TrackHistoryData {
  track: string,
}

export interface TrackHistories {
  _id: string,
  user: string,
  track: {
    _id: string,
    title: string,
    album: {
      _id: string,
      artist: string[],
    }
  },
  datetime: string,
}
