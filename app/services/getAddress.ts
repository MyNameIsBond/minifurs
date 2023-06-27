import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { supabase } from "../../lib/supabase";
import { UserAddress } from "../../types/user";
import { api } from "./api";

export const address = api.injectEndpoints({
  endpoints: (builder) => ({
    getAddress: builder.query<UserAddress[], { user_id: string | undefined }>({
      queryFn: async (arg) => {
        try {
          const { data, error } = await supabase
            .from("address")
            .select("road, post_code, town, county")
            .eq("user_id", arg.user_id || "");
          if (error) throw error;
          return { data } as QueryReturnValue<UserAddress[]>;
        } catch (error) {
          console.error(error);
          return { error };
        }
      },
    }),
  }),
});

export const { useGetAddressQuery } = address;
