export class Track {
  constructor(
    public _id: string,
    public title: string,
    public album: string,
    public duration: string,
  ) {}
}

export interface ApiTrackData {
  _id: string,
  title: string,
  album: string,
  duration: string,
}
