export interface User {
  status: string;
  value: {
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
}
