import { api } from "./api";
import { supabase } from "../../lib/supabase";

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
    getProduct: builder.query<ProductInterface[], string>({
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
  }),
});

export const { getProduct } = product.endpoints;
export const { useGetProductQuery } = product;
