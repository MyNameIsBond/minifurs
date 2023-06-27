interface Product {
  categories: object;
  colours: Array<any>;
  created_at: string;
  description: object;
  id: number;
  images: object;
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
