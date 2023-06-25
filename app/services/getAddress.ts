import { supabase } from "../../lib/supabase";
import { UserAddress } from "../../types/user";
import { api } from "./api";

export const address = api.injectEndpoints({
  endpoints: (builder) => ({
    getAddress: builder.query<UserAddress[], { user_id: string | undefined }>({
      queryFn: async (user_id, dis) => {
        try {
          const { data, error } = await supabase
            .from("address")
            .select("road, post_code, town, county")
            .eq("user_id", user_id.user_id);
          if (error) throw error;
          return { data };
        } catch (error) {
          console.error(error);
          return { error };
        }
      },
    }),
  }),
});

export const { useGetAddressQuery } = address;
