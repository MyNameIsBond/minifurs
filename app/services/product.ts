import { api } from "./api";
import { supabase } from "../../lib/supabase";
import { Product } from "../../types/product";

export const product = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getProduct: builder.query<Product[], string>({
      queryFn: async (id) => {
        try {
          const { data, error } = await supabase
            .from("products")
            .select("*")
            .match({ id: id });
          if (error) {
            throw error;
          }
          return { data: data ?? [] };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
  }),
});

export const { getProduct } = product.endpoints;
export const { useGetProductQuery } = product;
