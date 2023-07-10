import { supabase } from "../../lib/supabase";
import { api } from "./api";

export const reviews = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getReviews: builder.query<unknown, { product_id: string }>({
      queryFn: async (cred) => {
        try {
          const { data, error } = await supabase
            .from("reviews")
            .select("*")
            .match({ product_id: cred.product_id });
          if (error) throw error;
          return { data };
        } catch (error) {
          console.error(error);
          return { error };
        }
      },
    }),
    reviewRightCheck: builder.query<
      { delivered: boolean }[] | undefined,
      { product_id: string; user_id: string | undefined; review: [] }
    >({
      queryFn: async (cred) => {
        try {
          console.log(cred.review);
          const { data, error } = await supabase
            .from("orders")
            .select("delivered")
            .match({
              user_id: cred.user_id,
              product_id: cred.product_id,
              delivered: true,
            });
          if (error) throw error;
          return { data };
        } catch (error) {
          console.error(error);
          return { error };
        }
      },
    }),
    addReview: builder.mutation({
      queryFn: async (cred) => {
        const { product_id, user_id, review, stars } = cred;
        try {
          const { data, error } = await supabase.from("reviews").insert({
            product_id,
            user_id,
            review,
            stars,
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
