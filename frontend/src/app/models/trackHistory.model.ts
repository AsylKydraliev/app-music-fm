export class TrackHistory {
  constructor(
    public _id: string,
    public user: string,
    public track: string,
    public datetime: string,
    public artist: string,
  ) {}
}

export class TrackHistoryApi {
  constructor(
    public _id: string,
    public user: string,
    public track: {
      _id: string,
      title: string,
    },
    public datetime: string,
    public artist: string,
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
  },
  datetime: string,
  artist: string,

}
