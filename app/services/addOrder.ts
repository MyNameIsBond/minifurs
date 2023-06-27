import { supabase } from "../../lib/supabase";
import { ProductsInterface } from "../../types/product";
import { api } from "./api";

export const orders = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getOrders: builder.query<ProductsInterface[], string>({
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
      ProductsInterface[],
      { data: ProductsInterface[]; user_id: string }
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
          return { data: data ?? [] };
        } catch (error) {
          console.error(error);
          return { error };
        }
      },
    }),
    deleteBasketItems: builder.mutation<
      ProductsInterface[],
      { data: ProductsInterface[]; user_id: string }
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
          return { data: data ?? [] };
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
