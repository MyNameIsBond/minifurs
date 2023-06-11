import { supabase } from "../../lib/supabase";
import { api } from "./api";
import { ProductInterface } from "./product";

export const addToBasket = api.injectEndpoints({
  endpoints: (builder) => ({
    addTobasket: builder.mutation<
      ProductInterface,
      {
        user_id: string;
        product_id: string;
        colour: string;
        quantity: number;
      }
    >({
      queryFn: async (cred, dis) => {
        try {
          const { user_id, product_id, colour, quantity } = cred;
          const { data: exist, error } = await supabase
            .from("basket")
            .select("id, quantity")
            .match({
              user_id: user_id,
              product_id: product_id,
              colour: colour,
            });
          if (error) throw error;
          if (exist?.length >= 1) {
            const { data, error } = await supabase
              .from("basket")
              .update({ quantity: quantity + exist[0].quantity })
              .match({
                user_id: user_id,
                product_id: product_id,
                colour: colour,
              });
            if (error) throw error;
            return { data };
          } else {
            const { data, error } = await supabase.from("basket").insert({
              user_id: user_id,
              product_id: product_id,
              quantity: quantity,
              colour: colour,
            });
            if (error) throw error;
            return { data };
          }
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useAddTobasketMutation } = addToBasket;
