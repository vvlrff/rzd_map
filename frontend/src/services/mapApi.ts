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
    getTrainIndexes: builder.query<any, string>({
      query: () => ({
        url: `/admin/trains_index`,
      })
    }),
    postTrainWagonData: builder.mutation<any, string>({
      query: (train_index) => ({
        url: `/admin/Support_2`,
        method: "POST",
        body: {
          train_index
        }
      })
    }),
  }),
});

export const { useGetStationCoordQuery, useGetTrainIndexesQuery, usePostTrainWagonDataMutation } = mapApi;