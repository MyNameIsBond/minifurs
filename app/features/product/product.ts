import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getProduct } from "../../services/product";
import type { ProductInterface } from "../../services/product";

interface initialStateType {
  product: ProductInterface | never[];
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
  loading: true,
  displayColour: "",
  colours: [],
  quantity: 1,
  favourite: false,
};

const productSlice = createSlice({
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
  extraReducers(builder) {
    builder.addCase(
      getProduct.matchFulfilled,
      (state, action: PayloadAction<ProductInterface>) => {
        state.product = action.payload;
        state.displayColour = action.payload.colours[0];
        state.colours = action.payload.colours;
        state.loading = false;
      }
    );
    builder.addCase(getProduct.matchPending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProduct.matchRejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const { increment, decrement, changeDisplayColour, favouriteProduct } =
  productSlice.actions;
