import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginResponse, RegisterUser, UpdateUser, UserInfo } from "interfaces/user";
import { createBaseQuery } from "utils/baseQuery";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: createBaseQuery("Accounts"),
    tagTypes: ["User"],

    endpoints: (builder) => ({
        getInfo: builder.query<UserInfo, void>({
            query: () => ({
                url: "GetInfo",
                method: "GET",
            }),
            providesTags: ["User"],
        }),

        updateUser: builder.mutation<void, UpdateUser>({
            query: (data) => {
              const formData = new FormData();
              if (data.username) formData.append("username", data.username);
              if (data.image) formData.append("image", data.image);
          
              return {
                url: "update",
                method: "PUT",
                body: formData,
              };
            },
            invalidatesTags: ["User"],
          }),

        login: builder.mutation<LoginResponse, { email: string; password: string }>({
            query: (data) => {
                const formData = new FormData();
                formData.append("email", data.email);
                formData.append("password", data.password);

                return {
                    url: "Login",
                    method: "POST",
                    body: formData,
                };
            },
        }),

        register: builder.mutation<LoginResponse, RegisterUser>({
            query: (data) => {
                const formData = new FormData();
                formData.append("Name", data.name);
                formData.append("Username", data.username);
                if (data.image) formData.append("Image", data.image);
                formData.append("Email", data.email);
                formData.append("UserName", data.username);
                formData.append("Password", data.password);
                formData.append("DateOfBirth", data.birthDate);

                return {
                    url: "Registration",
                    method: "POST",
                    body: formData,
                };
            },
        }),

        googleLogin: builder.mutation<LoginResponse, { credential: string }>({
            query: (data) => {
                const formData = new FormData();
                formData.append("credential", data.credential);

                return {
                    url: "GoogleSignIn",
                    method: "POST",
                    body: formData,
                };
            },
        }),

        forgotPassword: builder.mutation<void, { email: string }>({
            query: (data) => ({
                url: "ForgotPassword",
                method: "POST",
                body: data,
            }),
        }),

        resetPassword: builder.mutation<void, { email: string; token: string; password: string }>({
            query: (data) => ({
                url: "ResetPassword",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useGetInfoQuery, useUpdateUserMutation, useLoginMutation, useRegisterMutation, useGoogleLoginMutation, useForgotPasswordMutation, useResetPasswordMutation } = userApi;