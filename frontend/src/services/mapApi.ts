import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const mapApi = createApi({
  reducerPath: "mapApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000",
  }),
  endpoints: (builder) => ({
    getStationCoord: builder.query<any, string>({
      query: () => ({
        url: `/admin/stantioncoord`,
      })
    }),
  }),
});

export const { useGetStationCoordQuery } = mapApi;