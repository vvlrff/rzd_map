import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRequest } from "../models/Request";


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
    postTrainWagonData: builder.mutation<any, IRequest>({
      query: (train_index: IRequest) => ({
        url: `/admin/one_train_with_time`,
        method: "POST",
        body: {
          train_index: train_index.train_index,
          current_data: train_index.current_data
        }
      })
    }),
  }),
});

export const { useGetStationCoordQuery, useGetTrainIndexesQuery, usePostTrainWagonDataMutation } = mapApi;