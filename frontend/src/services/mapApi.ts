import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRequest } from "../models/IRequest";


export const mapApi = createApi({
  reducerPath: "mapApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000",
  }),
  endpoints: (builder) => ({
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
    postSupport2: builder.mutation<any, string>({
      query: (train_index: string) => ({
        url: `/admin/Support_2`,
        method: "POST",
        body: {
          train_index
        }
      })
    }),
  }),
});

export const { useGetTrainIndexesQuery, usePostTrainWagonDataMutation, usePostSupport2Mutation } = mapApi;