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
    }),
  }),
});

export const { getProduct } = product.endpoints;
export const { useGetProductQuery } = product;
