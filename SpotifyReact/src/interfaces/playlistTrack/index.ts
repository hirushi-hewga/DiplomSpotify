export interface IPlaylistTrackFilter {
  PageIndex?: number;
  PageSize?: number;
  SearchTerm?: string;
  ArtistId?: number;
  AlbumId?: number;
  PlaylistId: number;
}