import { createSlice } from "@reduxjs/toolkit";

//  initial State
const initialState = {
    user: undefined,
    token: undefined,
};

//  auth slice
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token, user } = action.payload;
            if (user) state.user = user;
            if (token) state.token = token;
        },
        authReset: (state, action) => {
            state = initialState;
        },
        logOut: (state, action) => {
            state.user = undefined;
            state.token = undefined;
        },
    },
});

//  export reducer
export const { setCredentials, authReset, logOut } = authSlice.actions;

//  crete sort state const
export const userSelector = (state) => state.auth?.user;
export const tokenSelector = (state) => state.auth?.token;

//  export
export default authSlice.reducer;
