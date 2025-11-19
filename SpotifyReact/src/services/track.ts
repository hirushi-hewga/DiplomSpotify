import { createApi } from "@reduxjs/toolkit/query/react";
import { ITrack, ITrackCreate, ITrackUpdate, ITrackFilter, ITracksResponse } from "interfaces/track"; // Додайте TrackFilterVm
import { createBaseQuery } from "utils/baseQuery.ts";

export const trackApi = createApi({
  reducerPath: "trackApi",
  baseQuery: createBaseQuery("tracks"),
  tagTypes: ["Tracks"],

  endpoints: (builder) => ({
    getTracks: builder.query<ITracksResponse, ITrackFilter>({
      query: (filter) => ({
        url: "GetPage",
        params: filter,
      }),
      providesTags: ["Tracks"],
    }),

    getTrackById: builder.query<ITrack, number>({
      query: (id) => `getById/${id}`,
      providesTags: (_result, _error, arg) => [{ type: "Tracks", id: arg }],
    }),

    createTrack: builder.mutation<void, ITrackCreate>({
      query: (track) => {
        const formData = new FormData();
        formData.append("Name", track.name);
        formData.append("Image", track.image);

        return {
          url: "create",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Tracks"],
    }),

    updateTrack: builder.mutation<void, ITrackUpdate>({
      query: (track) => ({
        url: "update",
        method: "PUT",
        body: track,
      }),
      invalidatesTags: ["Tracks"],
    }),

    deleteTrack: builder.mutation<void, number>({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tracks"],
    }),
  }),
});

export const {
  useGetTracksQuery,
  useUpdateTrackMutation,
  useGetTrackByIdQuery,
  useCreateTrackMutation,
  useDeleteTrackMutation,
} = trackApi;
