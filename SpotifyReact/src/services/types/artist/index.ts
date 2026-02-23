import { ApiResponse } from "services/types/api.ts";

export type ArtistPayload = {
  id: number,
  name: string,
  image: string,
  albumsCount: number,
  followersCount: number
}
export type ArtistResponse = ApiResponse<ArtistPayload>;

export type ArtistCreatePayload = {
  name: string,
  image: File
}
export type ArtistCreateResponse = ApiResponse<ArtistCreatePayload>;

export type ArtistUpdatePayload = {
  id: number,
  name: string,
  image: File
}
export type ArtistUpdateResponse = ApiResponse<ArtistUpdatePayload>;