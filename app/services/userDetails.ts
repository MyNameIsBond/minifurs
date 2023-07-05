import { supabase } from "../../lib/supabase";
import { api } from "./api";

export const userDetails = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    setUserDetails: builder.mutation<
      null,
      {
        name: string;
        email: string | undefined;
        phone_number: number;
        user_id: string | undefined;
      }
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
      null,
      {
        user_id: string | undefined;
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
            .match({ user_id: user_id });
          if (data && data.length > 0) {
            const { data, error } = await supabase
              .from("address")
              .update({
                road: road,
                town: town,
                county: county,
                post_code: postCode,
              })
              .match({ user_id: user_id });
            if (error) throw error;
            return { data };
          } else {
            const { data, error } = await supabase.from("address").insert({
              road: road,
              town: town,
              county: county,
              post_code: postCode,
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
