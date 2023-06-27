import { supabase } from "../../lib/supabase";
import { ProductsInterface } from "../../types/product";
import { api } from "./api";

export const allProducts = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductsInterface[], void>({
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
    getProductsByLimit: builder.query<ProductsInterface[], { limit: number }>({
      queryFn: async (cred) => {
        try {
          const { data, error } = await supabase
            .from("products")
            .select("*")
            .limit(cred.limit);
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

export const { useGetAllProductsQuery, useGetProductsByLimitQuery } =
  allProducts;
