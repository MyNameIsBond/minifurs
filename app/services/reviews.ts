import { supabase } from "../../lib/supabase";
import { Reviews } from "../../types/review";
import { api } from "./api";

export const reviews = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getReviews: builder.query<Reviews[], { product_id: string }>({
      queryFn: async (cred) => {
        try {
          const { data, error } = await supabase
            .from("reviews")
            .select("*")
            .match({ product_id: cred.product_id });
          if (error) throw error;
          console.log("FROM REVIEWS", data);
          return { data };
        } catch (error) {
          console.error(error);
          return { error };
        }
      },
    }),
    reviewRightCheck: builder.query<
      { data: boolean },
      { product_id: string; user_id: string | undefined }
    >({
      queryFn: async (cred) => {
        try {
          const { user_id, product_id } = cred;
          const { data, error } = await supabase
            .from("orders")
            .select("*")
            .match({
              user_id: cred.user_id,
              product_id: cred.product_id,
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
    addReview: builder.mutation({
      queryFn: async (cred) => {
        const { product_id, user_id, review, stars, username } = cred;
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
