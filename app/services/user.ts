import { api } from "./api";
import { supabase } from "../../lib/supabase";
import { Session, User } from "@supabase/supabase-js";

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
    loginUser: builder.mutation<
      {
        user: User | null;
        session: Session | null;
      },
      { email: string; password: string }
    >({
      queryFn: async ({ email, password }) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });
          if (error) {
            throw error.message;
          }
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetUserQuery, useLoginUserMutation } = userApi;
