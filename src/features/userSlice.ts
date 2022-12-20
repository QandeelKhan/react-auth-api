import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface userDataInterface {
    name: string;
    email: string;
}

const initialState: userDataInterface = {
    name: "",
    email: "",
};

export const userSlice = createSlice({
    name: "user_info",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
        },
        unSetUserInfo: (state, action) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
        },
    },
});

export const { setUserInfo, unSetUserInfo } = userSlice.actions;

export default userSlice.reducer;
