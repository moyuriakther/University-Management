import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { userLoggedIn, userLoggedOut } from "../auth/authSlice";

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

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  // try {
  let result = await baseQuery(args, api, extraOptions);
  if (result && result.error?.status === 401) {
    const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });
    // if (!res.ok) {
    //   throw new Error(`Refresh token failed: ${res.statusText}`);
    // }
    const data = await res.json();
    const token = data?.data?.accessToken;
    if (token) {
      const user = (api.getState() as RootState)?.auth?.user;
      api.dispatch(userLoggedIn({ user, token }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(userLoggedOut());
    }
  }
  return result;
  // } catch (error) {
  //   console.error("Error in baseQueryWithRefreshToken:", error);
  //   throw error;
  // }
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});

export default apiSlice.reducer;
