import { supabase } from "../../lib/supabase";
import { api } from "./api";
import { ProductInterface } from "./product";

export const getCategory = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getProductsByCategory: builder.query<ProductInterface[], string>({
      queryFn: async (category) => {
        try {
          const { data, error } = await supabase
            .from("products")
            .select("*")
            .contains("categories", { [category]: true });
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

export const { useGetProductsByCategoryQuery } = getCategory;
