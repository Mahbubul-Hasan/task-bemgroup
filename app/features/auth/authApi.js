import { apiSlice } from "../api/apiSlice";
import { setCredentials } from "./authSlice";
import { setCookie } from "cookies-next";

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "signin",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }) {
                try {
                    const result = await queryFulfilled;
                    const date = {
                        user: result,
                        token: result?.token,
                    };
                    dispatch(setCredentials(date));
                    setCookie("token", result?.token);
                } catch (error) {}
            },
        }),
    }),
    overrideExisting: true,
});

export const { useLoginMutation } = authApi;
