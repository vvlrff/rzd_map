import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query/react";
import authReducer from "../features/authSlice";
import { newsApi } from '../services/newsApi';
import { authApi } from '../services/authApi';
import { elasticApi } from '../services/elasticApi';
import { mapApi } from '../services/mapApi';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    [mapApi.reducerPath]: mapApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [elasticApi.reducerPath]: elasticApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, newsApi.middleware, elasticApi.middleware, mapApi.middleware])
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);