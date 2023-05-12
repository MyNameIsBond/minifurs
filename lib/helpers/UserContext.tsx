import { User } from "@supabase/supabase-js";
import { createContext, useContext } from "react";
import { useGetUserQuery } from "../../app/services/user";
type UserContextType = {
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
  const { user, accessToken, isLoading: isLoadingUser } = session;
  const { data: userDetails, isLoading: isLoadingUserDetails } =
    useGetUserQuery(user?.id as string);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingUserDetails,
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
