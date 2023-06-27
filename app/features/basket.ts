import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getAllFavProduct } from "../services/favourites";

import { fetchCard } from "../services/basket";
import type {
  FavouritesInterface,
  ProductsInterface,
} from "../../types/product";

interface initialStateType {
  items: string[];
  numberOfFavItems: number;
  numberOfBasketItems: number;
  price: number;
}

const initialState: initialStateType = {
  items: [],
  numberOfFavItems: 0,
  numberOfBasketItems: 0,
  price: 0,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      getAllFavProduct.matchFulfilled,
      (state, action: PayloadAction<FavouritesInterface[]>) => {
        state.numberOfFavItems = action.payload.length;
      }
    );
    builder.addMatcher(
      fetchCard.matchFulfilled,
      (state, action: PayloadAction<ProductsInterface[]>) => {
        state.numberOfBasketItems = action.payload.length;
        console.log("fetchCard", action.payload);
        state.price = action.payload?.reduce(
          (a, b) => a + b.products.price * b.quantity,
          0
        );
      }
    );
  },
});

export const {} = basketSlice.actions;
