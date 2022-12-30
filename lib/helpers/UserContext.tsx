import { useUser as useSupaUser, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  isLoading: boolean;
};

export interface Props {
  supabaseClient: typeof supabase;
  [propName: string]: any;
}

export const UserContext = createContext({} as UserContextType);
export const MyUserContextProvider = (props: Props) => {
  const { supabaseClient: supabase } = props;
  const { user, accessToken, isLoading: isLoadingUser } = useSupaUser();
  const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const getUserDetails = () =>
    supabase.from<UserDetails>("users").select("*").single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails) {
      setIsloadingData(true);
      Promise.allSettled([getUserDetails()]).then((results) => {
        const userDetailsPromise = results[0];

        if (userDetailsPromise.status === "fulfilled")
          setUserDetails(userDetailsPromise.value.data);

        setIsloadingData(false);
      });
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
    }
  }, [user, isLoadingUser]);
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
