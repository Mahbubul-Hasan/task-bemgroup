import { setCookie } from "cookies-next";
import { apiSlice } from "../api/apiSlice";
import { setCredentials } from "../auth/authSlice";

const profileAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateProfile: builder.mutation({
            query: (data) => ({
                url: "profile",
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        setCredentials({
                            user: data?.data?.user,
                        })
                    );
                } catch (error) {}
            },
        }),
    }),
    overrideExisting: true,
});

export const { useUpdateProfileMutation } = profileAPI;
