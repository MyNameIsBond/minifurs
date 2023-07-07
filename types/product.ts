export interface Review {
  img_avatar: string;
  stars: number;
  text: string;
  user: string;
}

export interface Product {
  categories: {
    [key: string]: boolean;
  };
  colours: Array<string>;
  created_at: string;
  description: {
    description: string;
  };
  id: string;
  images: {
    [key: string]: any[];
  };
  price: number;
  profile_pic: string;
  quantity: number;
  reviews: Review[];
  title: string;
}

export interface ProductsInterface {
  colour: string;
  id: number;
  product_id: number;
  products: Product;
  quantity: number;
}

export interface FavouritesInterface {
  id: number;
  product_id: number;
  products: Product;
}
export interface OrderInterface {
  created_at: string;
  delivered: boolean;
  id: string;
  order_details: null;
  paid: boolean;
  product_colour: null;
  product_id: number;
  products: Product;
  quantity: number;
  refund: null;
  user_id: string;
  when_paid: string;
  when_refund: null;
}
