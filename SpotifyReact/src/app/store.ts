import { configureStore } from "@reduxjs/toolkit";
import { artistApi } from "services/artist";

export const store = configureStore({
    reducer: {
        [artistApi.reducerPath]: artistApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            artistApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
