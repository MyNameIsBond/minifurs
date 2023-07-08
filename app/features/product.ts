import { PayloadAction, SerializedError, createSlice } from "@reduxjs/toolkit";
import { getProduct } from "../services/product";
import type { Product } from "../../types/product";

interface initialStateType {
  product: Product;
  error: SerializedError;
  loading: boolean;
  displayColour: string;
  colours: string[];
  quantity: number;
  favourite: boolean;
}

const initialState: initialStateType = {
  product: {} as Product,
  error: "" as SerializedError,
  loading: false,
  displayColour: "",
  colours: [],
  quantity: 1,
  favourite: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    increment: (state) => {
      state.quantity++;
    },
    decrement: (state) => {
      state.quantity--;
    },
    changeDisplayColour: (state, action: PayloadAction<string>) => {
      state.displayColour = action.payload;
    },
    favouriteProduct: (state, action: PayloadAction<boolean>) => {
      state.favourite = action.payload;
    },
    setProduct: (state, action: PayloadAction<Product[] | undefined>) => {
      if (action.payload !== undefined) {
        const [{ colours }] = action.payload;
        state.product = action.payload[0];
        state.colours = colours;
        state.loading = false;
        state.displayColour = colours[0];
        state.quantity = 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(getProduct.matchPending, (state) => {
      state.loading = true;
    });
    builder.addMatcher(
      getProduct.matchFulfilled,
      (state, action: PayloadAction<Product[], string>) => {
        const [{ colours }] = action.payload;
        state.product = action.payload[0];
        state.colours = colours;
        state.loading = false;
        state.displayColour = colours[0];
      }
    );
    builder.addMatcher(getProduct.matchRejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const {
  increment,
  decrement,
  changeDisplayColour,
  favouriteProduct,
  setProduct,
  setLoading,
} = productSlice.actions;
