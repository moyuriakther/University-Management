import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
  }),
  endpoints: (builder) => ({
    getAll: builder.query({
      query: () => `name`,
    }),
  }),
});

export const { useGetAllQuery } = apiSlice;
export default apiSlice.reducer;
