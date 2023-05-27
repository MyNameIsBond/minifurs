import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getProduct } from "../../services/product";
import type { ProductInterface } from "../../services/product";

interface initialStateType {
  product: ProductInterface | [];
  error: string;
  loading: boolean;
  displayColour: string;
  colours: string[];
  quantity: number;
  favourite: boolean;
}

const initialState: initialStateType = {
  product: [],
  error: "",
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
    increment: (state) => {
      state.quantity++;
    },
    decrement: (state) => {
      state.quantity--;
    },
    changeDisplayColour: (state, action: PayloadAction<string>) => {
      state.displayColour = action.payload;
    },
    favouriteProduct: (state) => {
      state.favourite = true;
    },
    unFavouriteProduct: (state) => {
      state.favourite = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(getProduct.matchPending, (state) => {
      console.log("still!");
      state.loading = true;
    });
    builder.addMatcher(
      getProduct.matchFulfilled,
      (state, action: PayloadAction<ProductInterface>) => {
        state.product = action.payload;
        state.colours = action.payload.colours;
        state.loading = false;
        // if (!state.displayColour) {
        //   state.displayColour = action.payload.colours[0];
        // }
      }
    );
    builder.addMatcher(getProduct.matchRejected, (state, action) => {
      console.log("rejected!");
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const { increment, decrement, changeDisplayColour, favouriteProduct } =
  productSlice.actions;
