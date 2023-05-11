import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../lib/supabase";

interface User {
  status: string;
  value: {
    count: number;
    data: {
      Basket: [];
      created_at: string;
      email: string;
      favourites: [];
      id: string;
      phone_number: number;
      username: string;
    };
    error: {} | null;
    status: number;
    statusText: string;
  };
}

export const userApi = createApi({
  baseQuery: fakeBaseQuery<string>(),
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      queryFn: async (id) => {
        try {
          const { data } = await supabase
            .from("users")
            .select("*")
            .match({ id: id })
            .single();
          console.log("ELA RE:", data);
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetUserQuery } = userApi;
