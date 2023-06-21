import { supabase } from "../../lib/supabase";
import { api } from "./api";
import { ProductInterface } from "./product";

export const orders = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getOrders: builder.query<ProductInterface[], string>({
      queryFn: async (user_id) => {
        try {
          const { data, error } = await supabase
            .from("orders")
            .select(
              `*, products (
              profile_pic
            )`
            )
            .order("created_at", { ascending: false })
            .match({ user_id: user_id });
          if (error) throw error;
          return { data };
        } catch (error) {
          console.error(error);
          return { error };
        }
      },
    }),
    addOrders: builder.mutation<ProductInterface[], void>({
      queryFn: async (cred) => {
        try {
          const { data, error } = await supabase.from("orders").insert([]);
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

export const { useGetOrdersQuery } = orders;
