import { IArtist } from "interfaces/artist";

export interface IAlbum {
  id: number,
  releaseDate: Date,
  name: string,
  image: string,
  artist: IArtist,
}

export interface IAlbumFilter {
  PageIndex?: number,
  PageSize?: number,
  isRandom?: boolean,
  SearchTerm?: string,
}

export interface IAlbumsResponse {
  data: IAlbum[],
  itemsAvailable: number,
  pagesAvailable: number,
}