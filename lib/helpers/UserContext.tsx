import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect } from "react";
import { useGetUserQuery } from "../../app/services/user";
import { useGetAddressQuery } from "../../app/services/getAddress";
import { supabase } from "../supabase";
export type UserContextType = {
  accessToken: string | null;
  user: User | null;
  isLoading: boolean;
};

export interface Props {
  [propName: string]: any;
  session: UserContextType;
}

export const UserContext = createContext({} as UserContextType);
export const MyUserContextProvider = (props: Props) => {
  const { session } = props;
  const { user, isLoading: isLoadingUser } = session;
  const { data: userDetails, isLoading: isLoadingUserDetails } =
    useGetUserQuery(user?.id as string);

  const {
    data: userAddress,
    isLoading: isLoadingUserAddress,
    refetch,
  } = useGetAddressQuery(user?.id as string);

  const CheckIfUserDetailsExist = () => {
    supabase
      .channel("public:address")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "address" },
        () => {
          refetch();
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "address" },
        () => {
          refetch();
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "address" },
        () => {
          refetch();
        }
      )
      .subscribe();
  };

  useEffect(() => {
    CheckIfUserDetailsExist();
  }, []);

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
