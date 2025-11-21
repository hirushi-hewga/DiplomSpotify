import { createApi } from "@reduxjs/toolkit/query/react";
import { IPlaylist, IPlaylistCreate, IPlaylistFilter, IPlaylistResponce, IPlaylistUpdate } from "interfaces/playlist";
import { createBaseQuery } from "utils/baseQuery.ts";

export const playlistApi = createApi({
  reducerPath: "playlistApi",
  baseQuery: createBaseQuery("playlists"),
  tagTypes: ["Playlists"],

  endpoints: (builder) => ({
    getPlaylists: builder.query<IPlaylistResponce, IPlaylistFilter>({
      query: (filter) => ({
        url: "GetPage",
        params: filter,
      }),
      providesTags: ["Playlists"],
    }),

    getPlaylistById: builder.query<IPlaylist, number>({
      query: (id) => `getById/${id}`,
      providesTags: (_result, _error, arg) => [{ type: "Playlists", id: arg }],
    }),

    createPlaylist: builder.mutation<void, IPlaylistCreate>({
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
      invalidatesTags: ["Playlists"],
    }),

    updatePlaylist: builder.mutation<void, IPlaylistUpdate>({
      query: (artist) => ({
        url: "update",
        method: "PUT",
        body: artist,
      }),
      invalidatesTags: ["Playlists"],
    }),

    deletePlaylist: builder.mutation<void, number>({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Playlists"],
    }),
  }),
});

export const {
  useGetPlaylistsQuery,
  useUpdatePlaylistMutation,
  useGetPlaylistByIdQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
} = playlistApi;