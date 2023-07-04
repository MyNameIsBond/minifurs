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
  products: Product[];
}
