export class Album {
  constructor(
    public _id: string,
    public title: string,
    public artist_id: string,
    public year: string,
    public image: string
  ) {}
}

export interface AlbumData {
  _id: string,
  title: string,
  artist_id: string,
  year: string,
  image: File | null,
}

export interface ApiAlbumsData {
  _id: string,
  title: string,
  artist_id: string,
  year: string,
  image: string,
}
