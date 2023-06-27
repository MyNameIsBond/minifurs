import { supabase } from "../../lib/supabase";
import type { Product } from "../../types/product";
import { api } from "./api";

export const getCategory = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getProductsByCategory: builder.query<Product[], string>({
      queryFn: async (category) => {
        try {
          const { data, error } = await supabase
            .from("products")
            .select("*")
            .contains("categories", { [category]: true });
          if (error) throw error;
          console.log("ELAR E:", data);
          return { data };
        } catch (error) {
          console.error(error);
          return { error };
        }
      },
    }),
  }),
});

export const { useGetProductsByCategoryQuery } = getCategory;
