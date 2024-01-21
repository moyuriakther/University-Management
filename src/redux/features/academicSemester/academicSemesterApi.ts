import { apiSlice } from "../api/apiSlice";

export const academicSemesterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemester: builder.query({
      query: () => ({
        url: "/academic-semesters",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllAcademicSemesterQuery } = academicSemesterApi;
