export class AlbumModel {
  constructor(
    public _id: string,
    public title: string,
    public artist_id: string,
    public year: string,
    public image: string
  ) {}
}

export interface ArtistData {
  _id: string,
  title: string,
  artist_id: string,
  year: string,
  image: File | null,
}
