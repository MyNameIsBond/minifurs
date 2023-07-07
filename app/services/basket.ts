import { supabase } from "../../lib/supabase";
import type { ProductsInterface } from "../../types/product";
import { api } from "./api";

export const card = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    fetchCard: builder.query<
      ProductsInterface[],
      {
        user_id: string | undefined;
      }
    >({
      queryFn: async (cred) => {
        try {
          const { user_id } = cred;
          const { data, error } = await supabase
            .from("basket")
            .select(
              `
            id,
          product_id,
          quantity,
          colour,
          products (
            *
          )
        `
            )
            .match({ user_id: user_id });

          if (error) throw error;
          return { data: data as unknown as ProductsInterface[] };
        } catch (error) {
          console.error(error);
          return { error };
        }
      },
    }),
    deleteCardFromBasket: builder.mutation<
      null,
      {
        user_id: string | undefined;
        basket_id: number | undefined;
      }
    >({
      queryFn: async (cred) => {
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
