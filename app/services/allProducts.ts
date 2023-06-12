import { supabase } from "../../lib/supabase";
import { api } from "./api";
import { ProductInterface } from "./product";

export const allProducts = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductInterface[], void>({
      queryFn: async () => {
        try {
          const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });
          if (error) throw error;
          return { data };
        } catch (error) {
          console.error(error);
          return { error };
        }
      },
    }),
    getProductsByLimit: builder.query<ProductInterface[], number>({
      queryFn: async (limit) => {
        try {
          const { data, error } = await supabase
            .from("products")
            .select("*")
            .limit(limit);
          if (error) throw error;
          return { data };
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductsByLimitQuery } =
  allProducts;
