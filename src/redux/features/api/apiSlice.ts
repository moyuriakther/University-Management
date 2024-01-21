import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { userLoggedIn } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.auth?.token;
    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  try {
    let result = await baseQuery(args, api, extraOptions);
    console.log(result, "result");
    if (result && result.error?.status === 401) {
      const res = await fetch(
        "http://localhost:5000/api/v1/auth/refresh-token",
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw new Error(`Refresh token failed: ${res.statusText}`);
      }
      const data = await res.json();
      console.log(data);
      const user = (api.getState() as RootState)?.auth?.user;
      api.dispatch(userLoggedIn({ user, token: data?.data?.accessToken }));
      result = await baseQuery(args, api, extraOptions);
    }
    return result;
  } catch (error) {
    console.error("Error in baseQueryWithRefreshToken:", error);
    throw error;
  }
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});

export default apiSlice.reducer;
