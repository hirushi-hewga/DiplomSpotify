export interface IArtist {
  id: number,
  name: string,
  image: string,
  albumsCount: number,
  tracksCount: number
}

export interface IArtistCreate {
  name: string,
  image: File
}

export interface IArtistUpdate {
  id: number,
  name: string,
  image: File
}

export interface IArtistFilter {
  PageIndex?: number;
  PageSize?: number;
  SearchTerm?: string;
  IsRandom?: boolean;
}

export interface IArtistsResponse {
  data: IArtist[];
  itemsAvailable: number;
  pagesAvailable: number;
}