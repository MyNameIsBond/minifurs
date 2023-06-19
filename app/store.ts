import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import { authSlice } from "./features/auth";
import { productSlice } from "./features/product";
import { basketSlice } from "./features/basket";
import { userDetails } from "./features/userDetails";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice.reducer,
    product: productSlice.reducer,
    basket: basketSlice.reducer,
    userDetails: userDetails.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
