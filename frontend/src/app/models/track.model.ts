export class Track {
  constructor(
    public _id: string,
    public title: string,
    public album: {
      _id: string,
      title: string,
      image: string
    },
    public duration: string,
  ) {}
}

export interface ApiTrackData {
  _id: string,
  title: string,
  album: {
    _id: string,
    title: string,
    image: string
  },
  duration: string,
}
