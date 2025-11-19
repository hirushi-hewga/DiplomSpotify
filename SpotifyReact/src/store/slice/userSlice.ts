import { createSlice } from "@reduxjs/toolkit";
import { User, UserState } from "interfaces/user";
import { jwtParser } from "utils/jwtParser.ts";

const initialState: UserState = {
    user: jwtParser(localStorage.getItem("authToken")) as User,
    token: localStorage.getItem("authToken") || null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCredentials: (state, action: { payload: { user: User; token: string } }) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("authToken");
            sessionStorage.clear();
            localStorage.clear();
            document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        },
    },
});

export const getUser = (state: { user: UserState }) => state.user.user;
export const getToken = (state: { user: UserState }) => state.user.token;
export const { setCredentials, logOut } = userSlice.actions;
export default userSlice.reducer;