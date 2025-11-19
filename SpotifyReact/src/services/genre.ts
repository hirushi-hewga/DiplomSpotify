import { createApi } from "@reduxjs/toolkit/query/react";
import { IGenre, IGenreCreate, IGenreUpdate } from "interfaces/genre";
import { createBaseQuery } from "utils/baseQuery.ts";

export const genreApi = createApi({
  reducerPath: "genreApi",
  baseQuery: createBaseQuery("genre"),
  tagTypes: ["Genre"],

  endpoints: (builder) => ({
    getGenres: builder.query<IGenre[], void>({
      query: () => "GetAll",
      providesTags: ["Genre"],
    }),

    getGenreById: builder.query<IGenre, number>({
      query: (id) => `getById/${id}`,
      providesTags: (_result, _error, arg) => [{ type: "Genre", id: arg }],
    }),

    createGenre: builder.mutation<void, IGenreCreate>({
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
      invalidatesTags: ["Genre"],
    }),

    updateGenre: builder.mutation<void, IGenreUpdate>({
      query: (artist) => ({
        url: "update",
        method: "PUT",
        body: artist,
      }),
      invalidatesTags: ["Genre"],
    }),

    deleteGenre: builder.mutation<void, number>({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Genre"],
    }),
  }),
});

export const {
  useGetGenresQuery,
  useUpdateGenreMutation,
  useGetGenreByIdQuery,
  useCreateGenreMutation,
  useDeleteGenreMutation,
} = genreApi;