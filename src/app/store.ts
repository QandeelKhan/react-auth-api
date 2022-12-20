import { configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { userAuthApi } from "../services/userAuthApi";
// name our authSlice.ts as authReducer
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [userAuthApi.reducerPath]: userAuthApi.reducer,
        // our created reducers, now we set a state from it in userLogin because whenever user
        // login the process will start by setting our generated token as state in our app
        auth: authReducer,
        user: userReducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userAuthApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
