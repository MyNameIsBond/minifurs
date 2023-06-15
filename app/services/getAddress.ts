import { supabase } from "../../lib/supabase";
import { api } from "./api";

interface AddressInterface {
  user_id: string;
  created_at: string;
  town: string;
  post_code: string;
  county: string;
  road: string;
}

export const address = api.injectEndpoints({
  endpoints: (builder) => ({
    getAddress: builder.query<AddressInterface[], { user_id: string }>({
      queryFn: async (user_id, dis) => {
        try {
          const { data, error } = await supabase
            .from("address")
            .select("road, post_code, town, county")
            .eq("user_id", user_id);
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
