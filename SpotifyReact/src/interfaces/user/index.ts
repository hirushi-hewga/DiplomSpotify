export interface User {
    id: string;
    email: string;
    name: string;
    username: string;
    image: string;
    birthDate: string;
}

export interface LoginResponse {
    token: string;
}

export interface UserState {
    user: User | null;
    token: string | null;
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