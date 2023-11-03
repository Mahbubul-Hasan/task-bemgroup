import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
    baseUrl: "https://eservice.vemate.com/api/v1/account/public/users/",
    credentials: "include",
    prepareHeaders(headers, { getState }) {
        headers.set("Accept", `application/json`);
        if (!headers.get("file")) {
            headers.set("Content-Type", "application/json");
        }
        headers.set("access-control-allow-origin", "https://eservice.vemate.com");
        const token = getState()?.auth?.token;

        if (token) {
            headers.set("Authorization", `${token}`);
            headers.set("Access-Control-Allow-Credentials", true);
        }
        return headers;
    },
});

//

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQuery,
    keepUnusedDataFor: 180,
    endpoints: (builder) => ({}),
});
