import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TokenState {
    access_token: String | any;
    refresh_token: String | any;
}

const initialState: TokenState = {
    // because token initially can be null
    access_token: null,
    refresh_token: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // it can take a state and action, we pass our access token from the ui component as payload to the action
        // and as a result that 'access_token' will set as initial state from the value of token
        setUserToken: (state, action) => {
            state.access_token = action.payload.access_token;
        },
        // we can pass null to it from ui components to unset the token state
        // and show/hide,enable/disable routes accordingly
        unSetUserToken: (state, action) => {
            state.access_token = action.payload.access_token;
        },
        refreshToken: (state, action) => {
            state.refresh_token = action.payload.refresh_token;
        },
    },
});

export const { setUserToken, unSetUserToken, refreshToken } = authSlice.actions;

export default authSlice.reducer;
