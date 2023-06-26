import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect } from "react";
import { useGetUserQuery } from "../../app/services/user";
import { useGetAddressQuery } from "../../app/services/getAddress";
import { supabase } from "../supabase";
import { myUser } from "../../types/user";
export type UserContextType = {
  accessToken: string | null;
  user: User | null;
  isLoading: boolean;
};

export interface Props {
  [propName: string]: any;
  session: UserContextType;
}

export const UserContext = createContext({} as myUser);
export const MyUserContextProvider = (props: Props) => {
  const { session } = props;
  const { user, isLoading: isLoadingUser } = session;
  const {
    data: userDetails,
    isLoading: isLoadingUserDetails,
    refetch: userRefetch,
  } = useGetUserQuery(user?.id as string);

  const {
    data: userAddress,
    isLoading: isLoadingUserAddress,
    refetch: addressRefetch,
  } = useGetAddressQuery({ user_id: user?.id });

  const getUserDetails = () => {
    supabase
      .channel("public:users")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "users",
          filter: `id=eq.${user?.id}`,
        },
        () => {
          userRefetch();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "users",
          filter: `id=eq.${user?.id}`,
        },
        () => {
          userRefetch();
        }
      )
      .subscribe();
  };

  const getUserAddress = () => {
    supabase
      .channel("public:address")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "address",
          filter: `user_id=eq.${user?.id}`,
        },
        () => {
          addressRefetch();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "address",
          filter: `user_id=eq.${user?.id}`,
        },
        () => {
          addressRefetch();
        }
      )
      .subscribe();
  };

  useEffect(() => {
    getUserDetails();
    getUserAddress();
  }, [user?.id]);
  const value = {
    ...user,
    ...userDetails,
    email: user?.email,
    isLoading: isLoadingUser || isLoadingUserDetails || isLoadingUserAddress,
    address: userAddress && userAddress.length > 0 ? userAddress[0] : null,
  };
  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
