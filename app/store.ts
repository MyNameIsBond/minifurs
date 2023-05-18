import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import { authSlice } from "./features/auth/auth";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
