import { createApi } from "@reduxjs/toolkit/query/react";
import { IPlaylistTrackFilter } from "services/types/playlistTrack";
import { ITracksResponse } from "services/types/track"; // Додайте TrackFilterVm
import { createBaseQuery } from "utils/baseQuery.ts";

export const playlistTracksApi = createApi({
  reducerPath: "PlaylistTracksApi",
  baseQuery: createBaseQuery("PlaylistTracks"),
  tagTypes: ["PlaylistTracks"],

  endpoints: (builder) => ({
    getTracks: builder.query<ITracksResponse, IPlaylistTrackFilter>({
      query: (filter) => ({
        url: "GetPage",
        params: filter,
      }),
      providesTags: ["PlaylistTracks"],
    }),
  }),
});

export const {
  useGetTracksQuery,
} = playlistTracksApi;
