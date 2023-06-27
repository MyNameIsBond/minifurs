export interface Product {
  categories: {
    [key: string]: boolean;
  };
  colours: Array<string>;
  created_at: string;
  description: {
    description: string;
  };
  id: number;
  images: {
    [key: string]: any[];
  };
  price: number;
  profile_pic: string;
  quantity: number;
  reviews: Array<any>;
  title: string;
}

export interface ProductsInterface {
  colour: string;
  id: number;
  product_id: number;
  products: Product[];
  quantity: number;
}

export interface FavouritesInterface {
  id: number;
  product_id: number;
  products: Product[];
}
