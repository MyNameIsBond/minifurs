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
    favouriteProduct: (state, action: PayloadAction<boolean>) => {
      state.favourite = action.payload;
    },
    setProduct: (state, action: PayloadAction<ProductInterface[]>) => {
      if (action.payload !== undefined) {
        const [{ colours }] = action.payload;
        state.product = action.payload[0];
        state.colours = colours;
        state.loading = false;
        state.displayColour = colours[0];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(getProduct.matchPending, (state) => {
      console.log("still!");
      state.loading = true;
    });
    builder.addMatcher(
      getProduct.matchFulfilled,
      (state, action: PayloadAction<ProductInterface[]>) => {
        const [{ colours }] = action.payload;
        console.log("to mounak ", colours);
        state.product = action.payload[0];
        state.colours = colours;
        state.loading = false;
        state.displayColour = colours[0];
      }
    );
    builder.addMatcher(getProduct.matchRejected, (state, action) => {
      console.log("rejected!");
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
} = productSlice.actions;
