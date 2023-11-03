import { setCookie } from "cookies-next";
import { apiSlice } from "../api/apiSlice";
import { setCredentials } from "../auth/authSlice";

const profileAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        myCourses: builder.query({
            query: (code) => `my-courses?lang=${code}`,
            transformResponse: ({ data }) => data,
        }),

        updateProfile: builder.mutation({
            query: (data) => ({
                url: "update-profile",
                method: "POST",
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

        changePicture: builder.mutation({
            query: (data) => ({
                url: "change-picture",
                method: "POST",
                body: data,
                headers: { file: true },
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

export const { useMyCoursesQuery, useUpdateProfileMutation, useChangePictureMutation } = profileAPI;
