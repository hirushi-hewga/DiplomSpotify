import { createApi } from "@reduxjs/toolkit/query/react";
import { IAlbum, IAlbumFilter, IAlbumsResponse } from "interfaces/album";
import { createBaseQuery } from "utils/baseQuery.ts";

export const albumApi = createApi({
  reducerPath: "albumApi",
  baseQuery: createBaseQuery("albums"),
  tagTypes: ["Albums"],

  endpoints: (builder) => ({
    getAlbums: builder.query<IAlbumsResponse, IAlbumFilter>({
      query: (filter) => ({
        url: "GetPage",
        params: filter
      }),
      providesTags: ["Albums"],
    }),

    getAlbumById: builder.query<IAlbum, number>({
      query: (id) => `getById/${id}`,
      providesTags: (_result, _error, arg) => [{ type: "Albums", id: arg }],
    }),

    deleteAlbum: builder.mutation<void, number>({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Albums"],
    }),
  }),
});

export const {
  useGetAlbumsQuery,
  useGetAlbumByIdQuery,
  useDeleteAlbumMutation,
} = albumApi;