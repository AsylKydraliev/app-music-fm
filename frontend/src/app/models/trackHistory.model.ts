export class TrackHistory {
  constructor(
    public _id: string,
    public user: string,
    public track: string,
    public datetime: string,
  ) {}
}

export interface TrackHistoryData {
  user: string,
  track: string,
}
