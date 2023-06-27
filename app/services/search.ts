import { supabase } from "../../lib/supabase";
import { ProductsInterface } from "../../types/product";
import { api } from "./api";

export const search = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    searchProducts: builder.query<ProductsInterface[], string>({
      queryFn: async (search) => {
        try {
          const { data, error } = await supabase
            .from("products")
            .select("*")
            .ilike("title", `%${search}%`);
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

export const { useSearchProductsQuery } = search;
