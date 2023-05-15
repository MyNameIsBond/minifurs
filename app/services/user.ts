import { api } from "./api";
import { supabase } from "../../lib/supabase";
import { User } from "@supabase/supabase-js";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      queryFn: async (id) => {
        try {
          const { data } = await supabase
            .from("users")
            .select("*")
            .match({ id: id })
            .single();
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetUserQuery } = userApi;
