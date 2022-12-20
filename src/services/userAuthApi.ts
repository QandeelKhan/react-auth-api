// Need to use the React-specific entry point to import createApi
import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

export const userAuthApi = createApi({
    // reducerPath: can determine where to store cache in our redux store and by which name.
    reducerPath: "userAuthApi",
    // fetchBaseQuery: is fetch wrapper, automatically handle request headers and response parsing similar to axios.
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/user/" }),

    // endpoints:receives a call back func, normally passed parameter as builder(abc/anything),in which we
    // write actions/operations functions i/e registerUser
    endpoints: (builder) => ({
        // consider below as the functions or actions of endpoints i.e
        // registerUser is the first action or function.
        // we use 'mutation' because we want to modify(update,delete,modify) our data and we
        // use "query" if we want to query the data(only want to get/read the data)
        registerUser: builder.mutation({
            // the data we want to send from our frontend to backend and we store that data in "user" named var and
            // then we send that to our backend api through api call
            query: (user) => {
                return {
                    // "url": send request to which url
                    url: "register/",
                    method: "POST",
                    // sending a "user" obj containing login/register fields data to the backend
                    body: user,
                    // if we want to pass headers as well,i.e application/json so in future we can pass token
                    headers: {
                        "content-type": "application/json",
                    },
                };
            },
        }),
        loginUser: builder.mutation({
            // the data we want to send from our frontend to backend and we store that data in "user" named var and
            // then we send that to our backend api through api call
            query: (user) => {
                return {
                    url: "login/",
                    method: "POST",
                    // sending a "user" obj containing login/register fields data to the backend
                    body: user,
                    headers: {
                        "Content-type": "application/json",
                    },
                };
            },
        }),
        // query: because only getting data.
        // giving_access token to get data of logged in user
        getLoggedUser: builder.query({
            query: (access_token) => {
                // console.log(access_token); : if we don't type below code in "return{}" statement then we cannot
                // be able to do i.e console.log(access_token) here. otherwise we can use it without "return" as well.
                return {
                    url: "profile/",
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${access_token}`,
                    },
                };
            },
        }),
        changeUserPassword: builder.mutation({
            query: ({ actualData, access_token }) => {
                return {
                    url: "changepassword/",
                    method: "POST",
                    body: actualData,
                    headers: {
                        authorization: `Bearer ${access_token}`,
                    },
                };
            },
        }),
        sendPasswordResetEmail: builder.mutation({
            query: (user) => {
                return {
                    url: "send-reset-password-email/",
                    method: "POST",
                    body: user,
                    headers: {
                        "Content-type": "application/json",
                    },
                };
            },
        }),
        resetPassword: builder.mutation({
            query: ({ actualData, id, token }) => {
                return {
                    url: `/reset-password/${id}/${token}/`,
                    method: "POST",
                    body: actualData,
                    headers: {
                        "Content-type": "application/json",
                    },
                };
            },
        }),
    }),
});

// --------

// --------

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints, this can contain some hooks i.e useRegisterUserMutation
export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useGetLoggedUserQuery,
    useChangeUserPasswordMutation,
    useSendPasswordResetEmailMutation,
    useResetPasswordMutation,
} = userAuthApi;
