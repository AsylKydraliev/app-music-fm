export class Artist {
  constructor(
    public _id: string,
    public title: string,
    public photo: string,
    public info: string,
    public isPublished: boolean,
  ) {}
}

export interface ArtistData {
  [key: string]: any,
  title: string,
  photo: File | null,
  info: string,
}

export interface ArtistPublish {
  isPublished: boolean,
}

export interface ApiArtistData {
  _id: string,
  title: string,
  photo: string,
  info: string,
  isPublished: boolean,
}
