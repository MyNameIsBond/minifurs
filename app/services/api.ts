import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
});
