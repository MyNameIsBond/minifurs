import { api } from "./api";
import { supabase } from "../../lib/supabase";
import { FavouritesInterface, ProductsInterface } from "../../types/product";

export const product = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllFavProduct: builder.query<
      FavouritesInterface[],
      { user_id: string | undefined }
    >({
      queryFn: async (cred) => {
        const { user_id } = cred;
        try {
          const { data, error } = await supabase
            .from("favourites")
            .select(
              `
                id,
                product_id,
                products (
                  *
                )
              `
            )
            .match({ user_id: user_id });
          if (error) throw error;
          return { data: data as unknown as FavouritesInterface[] };
        } catch (error) {
          return { error };
        }
      },
    }),
    getFavProduct: builder.query<
      ProductsInterface[],
      { product_id: string; user_id: string | undefined }
    >({
      queryFn: async (cred) => {
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
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
    deleteFavProduct: builder.mutation<
      null,
      { product_id: string; user_id: string | undefined }
    >({
      queryFn: async (cred) => {
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
          }
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
    insertFavProduct: builder.mutation<
      null,
      { product_id: string; user_id: string | undefined }
    >({
      queryFn: async (cred) => {
        try {
          const { data, error } = await supabase.from("favourites").insert({
            user_id: cred.user_id,
            product_id: cred.product_id,
          });
          if (error) {
            throw error;
          } else {
            return { data };
          }
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { getAllFavProduct } = product.endpoints;

export const {
  useGetFavProductQuery,
  useInsertFavProductMutation,
  useDeleteFavProductMutation,
  useGetAllFavProductQuery,
} = product;
