export class Album {
  constructor(
    public _id: string,
    public title: string,
    public artist_id: {
      _id: string,
      title: string
    },
    public year: string,
    public image: string,
    public isPublished: boolean,
  ) {}
}

export interface AlbumData {
  [key: string]: any,
  title: string,
  artist_id: string,
  year: string,
  image: File | null,
}

export interface AlbumPublish {
  isPublished: boolean,
}

export interface ApiAlbumsData {
  _id: string,
  title: string,
  artist_id: {
    _id: string,
    title: string
  },
  year: string,
  image: string,
  isPublished: boolean,
}
