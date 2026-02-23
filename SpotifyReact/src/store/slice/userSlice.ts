import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtParser } from "utils/jwtParser";

export type AuthUser = {
  id: string;
  email: string;
  userName: string;
  role?: string | string[];
  birthDate?: string;
  image?: string;
};

export type UserState = {
  user: AuthUser | null;
  accessToken: string | null;
};

const accessToken = localStorage.getItem("accessToken");

const initialState: UserState = {
  user: accessToken ? (jwtParser(accessToken) as AuthUser) : null,
  accessToken: accessToken ?? null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; user: AuthUser }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    logOut: (state) => {
      state.user = null;
      state.accessToken = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { setCredentials, logOut } = userSlice.actions;
export const getUser = (state: { user: UserState }) => state.user.user;
export const getAccessToken = (state: { user: UserState }) => state.user.accessToken;

export default userSlice.reducer;