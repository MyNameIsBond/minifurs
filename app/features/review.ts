import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ReviewSlice {
  stars: number;
  reviewRating: string;
}

const initialState: ReviewSlice = {
  stars: 1,
  reviewRating: "",
};

export const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {
    changeInput: (state, action: PayloadAction<string>) => {
      state.reviewRating = action.payload;
    },
    setStars: (state, action: PayloadAction<number>) => {
      state.stars = action.payload;
    },
  },
});

export const { changeInput, setStars } = reviewSlice.actions;
