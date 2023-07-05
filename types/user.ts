export interface myUser {
  value?: {
    username: string;
    phone_number: string;
    count: number;
    data: {
      Basket: [];
      created_at: string;
      email: string;
      favourites: [];
      id: string;
      phone_number: number;
      username: string;
    };
    error: {} | null;
    status: number;
    statusText: string;
  };
  username?: string;
  id?: string | undefined;
  email: string | undefined;
  address: UserAddress | null;
  isLoading: boolean;
  phone_number: number;
}

export interface UserDetails {
  Basket: null;
  created_at: Date;
  email: string;
  favourites: [] | null;
  id: string;
  phone_number: number;
  username: string;
}

export interface UserAddress {
  length: number;
  user_id: string | undefined;
  created_at: string;
  town: string;
  post_code: string;
  county: string;
  road: string;
}
