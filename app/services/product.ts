import { api } from "./api";
import { supabase } from "../../lib/supabase";
import { favouriteProduct } from "../features/product/product";

interface Review {
  img_avatar: string;
  stars: number;
  text: string;
  user: string;
}

interface Description {
  description: string;
}

interface Images {
  [color: string]: string[];
}

export interface ProductInterface {
  id: number;
  title: string;
  description: Description;
  price: number;
  quantity: number;
  created_at: string;
  profile_pic: string;
  colours: string[];
  categories: {
    [category: string]: boolean;
  };
  images: Images;
  reviews: Review[];
}

export const product = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getProduct: builder.query<ProductInterface, string>({
      queryFn: async (id) => {
        try {
          const { data, error } = await supabase
            .from("products")
            .select("*")
            .match({ id: id });
          if (error) {
            throw error;
          }
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
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

export const { getProduct } = product.endpoints;
export const {
  useGetProductQuery,
  useGetFavProductQuery,
  useInsertFavProductMutation,
  useDeleteFavProductMutation,
} = product;
