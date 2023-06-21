import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@env";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
  endpoints: (build) => ({
    getPaymentSheetParams: build.mutation<{}, { price: number }>({
      query: (price) => ({
        url: "/payment-sheet",
        method: "POST",
        body: price,
      }),
    }),
  }),
});

export const { useGetPaymentSheetParamsMutation } = paymentApi;
