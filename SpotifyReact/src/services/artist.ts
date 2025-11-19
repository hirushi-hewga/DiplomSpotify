import { createApi } from "@reduxjs/toolkit/query/react";
import { IArtist, IArtistCreate, IArtistFilter, IArtistsResponse, IArtistUpdate } from "interfaces/artist";
import { createBaseQuery } from "utils/baseQuery.ts";

export const artistApi = createApi({
  reducerPath: "artistApi",
  baseQuery: createBaseQuery("artists"),
  tagTypes: ["Artists"],

  endpoints: (builder) => ({
    getArtists: builder.query<IArtistsResponse, IArtistFilter>({
      query: (filter) => ({
        url: "GetPage",
        params: filter
      }),
      providesTags: ["Artists"],
    }),

    getArtistById: builder.query<IArtist, number>({
      query: (id) => `getById/${id}`,
      providesTags: (_result, _error, arg) => [{ type: "Artists", id: arg }],
    }),

    createArtist: builder.mutation<void, IArtistCreate>({
      query: (artist) => {
        const formData = new FormData();
        formData.append("Name", artist.name);
        formData.append("Image", artist.image); // додаємо зображення як файл
    
        return {
          url: "create",
          method: "POST",
          body: formData,  // відправляємо як FormData
        };
      },
      // query: (artist) => ({
      //   url: "create",
      //   method: "POST",
      //   body: artist,
      // }),
      invalidatesTags: ["Artists"],
    }),

    updateArtist: builder.mutation<void, IArtistUpdate>({
      query: (artist) => ({
        url: "update",
        method: "PUT",
        body: artist,
      }),
      invalidatesTags: ["Artists"],
    }),

    deleteArtist: builder.mutation<void, number>({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Artists"],
    }),
  }),
});

export const {
  useGetArtistsQuery,
  useUpdateArtistMutation,
  useGetArtistByIdQuery,
  useCreateArtistMutation,
  useDeleteArtistMutation,
} = artistApi;