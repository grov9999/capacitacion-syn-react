import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum AUTH_STATUS {
    CHECKING = "[checking]", // revisando
    NOT_AUTHENTICATED = "[not-authenticated]", // no esta authenticado
    AUTHENTICATED = "[authenticated]", // esta authenticado
}

export type AUTH_STATE = AUTH_STATUS[keyof AUTH_STATUS];

export interface User {
    uid: string;
    name: string;
}
export interface AuthInitialState {
    status: AUTH_STATE;
    user?: User | null;
    errorMessage?: string | null;
}

const initialState: AuthInitialState = {
    status: AUTH_STATUS.CHECKING,
    // status : AUTH_STATUS.NOT_AUTHENTICATED,
    errorMessage: null,
    user: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        onChecking: (state: AuthInitialState) => {
            state.status = AUTH_STATUS.CHECKING;
        },
        onLogin: (state: AuthInitialState, action: PayloadAction<User>) => {
            state.status = AUTH_STATUS.AUTHENTICATED;
            console.log(action.payload);
            state.user = action.payload;
            state.errorMessage = null;
        },
        onLogoutWithoutError: (state: AuthInitialState) => {
            state.status = AUTH_STATUS.NOT_AUTHENTICATED;
            state.user = null;
            state.errorMessage = null;
        },
        onLogoutWithError: (
            state: AuthInitialState,
            action: PayloadAction<string>
        ) => {
            state.status = AUTH_STATUS.NOT_AUTHENTICATED;
            state.user = null;
            state.errorMessage = action.payload;
        },
        clearErrorMessage: (state: AuthInitialState) => {
            state.errorMessage = null;
        },
    },
});
export const {
    clearErrorMessage,
    onChecking,
    onLogin,
    onLogoutWithError,
    onLogoutWithoutError,
} = authSlice.actions;