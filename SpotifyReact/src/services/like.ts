import { createApi } from "@reduxjs/toolkit/query/react";
import { ITracksResponse, ITrackFilter } from "interfaces/track";
import { createBaseQuery } from "utils/baseQuery.ts";

export const likeApi = createApi({
  reducerPath: "likeApi",
  baseQuery: createBaseQuery("likes"),
  tagTypes: ["Likes"],

  endpoints: (builder) => ({
    getLikes: builder.query<ITracksResponse, ITrackFilter>({
      query: (filter) => ({
        url: "GetPage",
        params: filter
      }),
      providesTags: ["Likes"],
    }),

    createLike: builder.mutation<void, { TrackId: number }>({
      query: (track) => {
        const formData = new FormData();
        formData.append("TrackId", track.TrackId.toString());
    
        return {
          url: "create",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Likes"],
    }),

    deleteLike: builder.mutation<void, number>({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Likes"],
    }),
  }),
});

export const {
  useGetLikesQuery,
  useCreateLikeMutation,
  useDeleteLikeMutation,
} = likeApi;