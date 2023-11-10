import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const mapApi = createApi({
  reducerPath: "mapApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://overpass-api.de",
  }),
  endpoints: (builder) => ({
    getRailway: builder.query<any, string>({
      query: () => ({
        url: `/api/interpreter?data=[out:json];way[railway](55.5,37.0,56.0,38.0);out;`,
      })
    }),
  }),
});

export const { useGetRailwayQuery } = mapApi;