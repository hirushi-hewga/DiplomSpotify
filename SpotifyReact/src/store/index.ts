import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { userApi } from "services/user.ts";
import { artistApi } from "services/artist";
import { genreApi } from "services/genre";
import { playlistApi } from "services/playlist";
import userReducer from "store/slice/userSlice.ts";
import { trackApi } from "services/track";
import { likeApi } from "services/like";
import { playlistTracksApi } from "services/playlistTrack";
import { albumApi } from "services/album";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [userApi.reducerPath]: userApi.reducer,
        [artistApi.reducerPath]: artistApi.reducer,
        [genreApi.reducerPath]: genreApi.reducer,
        [playlistApi.reducerPath]: playlistApi.reducer,
        [trackApi.reducerPath]: trackApi.reducer,
        [likeApi.reducerPath]: likeApi.reducer,
        [playlistTracksApi.reducerPath]: playlistTracksApi.reducer,
        [albumApi.reducerPath]: albumApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
          userApi.middleware,
          artistApi.middleware,
          genreApi.middleware,
          playlistApi.middleware,
          trackApi.middleware,
          likeApi.middleware,
          playlistTracksApi.middleware,
          albumApi.middleware,
        ),
});

setupListeners(store.dispatch);

// Типізація Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;