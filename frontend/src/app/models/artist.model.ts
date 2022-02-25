export class Artist {
  constructor(
    public _id: string,
    public title: string,
    public photo: string,
    public info: string
  ) {}
}

export interface ArtistData {
  _id: string,
  title: string,
  photo: File | null,
  info: string,
}

export interface ApiArtistData {
  _id: string,
  title: string,
  photo: string,
  info: string,
}
