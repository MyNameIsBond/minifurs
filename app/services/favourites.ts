import { api } from "./api";
import { supabase } from "../../lib/supabase";
import { favouriteProduct } from "../features/product/product";
import { ProductInterface } from "./product";

export const product = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getFavProduct: builder.query<
      ProductInterface[],
      { product_id: string; user_id: string }
    >({
      queryFn: async (cred, dis) => {
        try {
          const { data, error } = await supabase
            .from("favourites")
            .select("*")
            .match({
              user_id: cred.user_id,
              product_id: cred.product_id,
            });
          if (error) {
            throw error;
          }

          if (data && data.length > 0) {
            dis.dispatch(favouriteProduct(true));
          } else {
            dis.dispatch(favouriteProduct(false));
          }

          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
    deleteFavProduct: builder.mutation<
      ProductInterface,
      { product_id: string; user_id: string }
    >({
      queryFn: async (cred, dis) => {
        try {
          const { data, error } = await supabase
            .from("favourites")
            .delete()
            .match({
              user_id: cred.user_id,
              product_id: cred.product_id,
            });
          if (error) {
            throw error;
          } else {
            dis.dispatch(favouriteProduct(false));
          }
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
    insertFavProduct: builder.mutation<
      ProductInterface,
      { product_id: string; user_id: string }
    >({
      queryFn: async (cred, dis) => {
        try {
          const { data, error } = await supabase.from("favourites").insert({
            user_id: cred.user_id,
            product_id: cred.product_id,
          });
          if (error) {
            throw error;
          } else {
            dis.dispatch(favouriteProduct(true));
            return { data };
          }
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const {
  useGetFavProductQuery,
  useInsertFavProductMutation,
  useDeleteFavProductMutation,
} = product;
