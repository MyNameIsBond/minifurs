import { supabase } from "../../lib/supabase";
import { api } from "./api";
import { ProductInterface } from "./product";

export const userDetails = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    setUserDetails: builder.mutation<
      ProductInterface[],
      { name: string; email: string; phone_number: number; user_id: string }
    >({
      queryFn: async (user) => {
        const { name, email, phone_number, user_id } = user;
        try {
          const { data, error } = await supabase
            .from("users")
            .select("*")
            .match({ id: user_id });
          if (error) throw error;
          if (data && data.length > 0) {
            const { data, error } = await supabase
              .from("users")
              .update({
                username: name,
                email: email,
                phone_number: phone_number,
              })
              .match({ id: user_id });
            if (error) throw error;
            return { data };
          } else {
            const { data, error } = await supabase.from("users").insert({
              id: user_id,
              username: name,
              email: email,
              phone_number: phone_number,
            });
            if (error) throw error;
            return { data };
          }
        } catch (error) {
          console.error(error);
          return { error };
        }
      },
    }),
    setUserAddress: builder.mutation<
      ProductInterface[],
      {
        user_id: string;
        road: string;
        town: string;
        county: string;
        postCode: string;
      }
    >({
      queryFn: async (cred) => {
        try {
          const { user_id, road, town, county, postCode } = cred;
          const { data, error } = await supabase
            .from("address")
            .select("*")
            .match({ id: user_id });
          if (error) throw error;
          if (data && data.length > 0) {
            const { data, error } = await supabase
              .from("address")
              .update({
                road: road,
                town: town,
                county: county,
                postCode: postCode,
              })
              .match({ id: user_id });
            if (error) throw error;
            return { data };
          } else {
            const { data, error } = await supabase.from("address").insert({
              road: road,
              town: town,
              county: county,
              postCode: postCode,
              user_id: user_id,
            });
            if (error) throw error;
            return { data };
          }
        } catch (error) {
          console.error(error);
          return { error };
        }
      },
    }),
  }),
});

export const { useSetUserDetailsMutation, useSetUserAddressMutation } =
  userDetails;
