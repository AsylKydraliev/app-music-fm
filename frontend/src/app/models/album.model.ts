export class Album {
  constructor(
    public _id: string,
    public title: string,
    public artist_id: {
      _id: string,
      title: string
    },
    public year: string,
    public image: string
  ) {}
}

export interface AlbumData {
  _id: string,
  title: string,
  artist_id: {
    _id: string,
    title: string
  },
  year: string,
  image: File | null,
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
}
