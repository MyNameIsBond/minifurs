import { supabase } from "../../lib/supabase";
import { Reviews } from "../../types/review";
import { api } from "./api";

export const reviews = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getReviews: builder.query<Reviews[], { product_id: string }>({
      queryFn: async (arg) => {
        try {
          const { data, error } = await supabase
            .from("reviews")
            .select("*")
            .match({ product_id: arg.product_id });
          if (error) throw error;
          return { data };
        } catch (error) {
          console.error(error);
          return { error };
        }
      },
    }),
    reviewRightCheck: builder.query<
      { data: boolean } | unknown,
      { user_id: string | undefined; product_id: string }
    >({
      queryFn: async (arg) => {
        try {
          const { user_id, product_id } = arg;
          const { data, error } = await supabase
            .from("orders")
            .select("*")
            .match({
              user_id: user_id,
              product_id: product_id,
              delivered: true,
            });

          if (error) throw error;

          if (data.length > 0) {
            const { data: isReviewd } = await supabase
              .from("reviews")
              .select("*")
              .match({ user_id, product_id });
            return { data: isReviewd?.length ?? 0 > 0 ? false : true };
          }
          return { data: false };
        } catch (error) {
          console.error(error);
          return { error };
        }
      },
    }),
    addReview: builder.mutation<
      null,
      {
        product_id: string;
        user_id: string | undefined;
        review: string;
        stars: number;
        username: string | undefined;
      }
    >({
      queryFn: async (arg) => {
        const { product_id, user_id, review, stars, username } = arg;
        try {
          const { data, error } = await supabase.from("reviews").insert({
            product_id,
            user_id,
            review,
            stars,
            username,
          });
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
export const {
  useGetReviewsQuery,
  useReviewRightCheckQuery,
  useAddReviewMutation,
} = reviews;
