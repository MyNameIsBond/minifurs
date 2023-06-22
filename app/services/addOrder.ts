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
              `*,
              products (
              profile_pic,
              price,
              title
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
    addOrders: builder.mutation<
      ProductInterface[],
      { data: ProductInterface[]; user_id: string }
    >({
      queryFn: async (cred) => {
        try {
          const { data: myData, user_id } = cred;
          const newCred = myData.map((c) => ({
            user_id: user_id,
            product_id: c.product_id,
            paid: true,
            when_paid: new Date(),
            quantity: c.quantity,
          }));
          const { data, error } = await supabase.from("orders").insert(newCred);
          if (error) throw error;
          return { data };
        } catch (error) {
          console.error(error);
          return { error };
        }
      },
    }),
    deleteBasketItems: builder.mutation<
      ProductInterface[],
      { data: ProductInterface[]; user_id: string }
    >({
      queryFn: async (cred) => {
        try {
          const { data: myData, user_id } = cred;
          const productIds = myData.map((c) => c.product_id);
          const { data, error } = await supabase
            .from("basket")
            .delete()
            .eq("user_id", user_id)
            .in("product_id", productIds);

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

export const {
  useGetOrdersQuery,
  useAddOrdersMutation,
  useDeleteBasketItemsMutation,
} = orders;
