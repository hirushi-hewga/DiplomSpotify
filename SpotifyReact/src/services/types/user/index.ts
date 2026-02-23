import { ApiResponse } from "services/types/api.ts";

export type UserPayload = {
  id: string;
  email: string;
  userName: string;
  role?: string | string[];
  birthDate?: string;
  image?: string;
}
export type UserResponse = ApiResponse<UserPayload>;

export type LoginPayload = {
  accessToken: string;
  refreshToken: string;
}
export type LoginResponse = ApiResponse<LoginPayload>;

export interface UserState {
  user: UserPayload | null;
  accessToken: string | null;
}

export interface RegisterUser {
  name: string;
  image: File | null;
  email: string;
  username: string;
  password: string;
  birthDate: string;
}

export interface UserInfo {
  name: string,
  photo: string,
  dateOfBirth: Date,
  email: string,
  normalizedEmail: string,
  userName: string,
  normalizedUserName: string,
  emailConfirmed: boolean,
}

export interface UpdateUser {
  username?: string;
  image?: File;
}