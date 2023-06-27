import { api } from "./api";
import { supabase } from "../../lib/supabase";
import { ProductsInterface } from "../../types/product";

export const product = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getProduct: builder.query<ProductsInterface[], string>({
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
