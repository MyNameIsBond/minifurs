import { supabase } from "../../lib/supabase";
import { api } from "./api";
import { ProductInterface } from "./product";

export const card = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    fetchCard: builder.query<
      ProductInterface,
      {
        user_id: string;
      }
    >({
      queryFn: async (cred, dis) => {
        try {
          const { user_id } = cred;
          const { data, error } = await supabase
            .from("basket")
            .select(
              `
            id,
          product_id,
          quantity,
          products (
            *
          )
        `
            )
            .match({ user_id: user_id });

          if (error) throw error;
          return { data };
        } catch (error) {
          console.error(error);
          return { error };
        }
      },
    }),
    deleteCardFromBasket: builder.mutation<
      ProductInterface,
      {
        user_id: string;
        basket_id: string;
      }
    >({
      queryFn: async (cred, dis) => {
        try {
          const { user_id, basket_id } = cred;
          const { data, error } = await supabase
            .from("basket")
            .delete()
            .match({ id: basket_id, user_id: user_id });

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

export const { fetchCard } = card.endpoints;

export const { useFetchCardQuery, useDeleteCardFromBasketMutation } = card;
