import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserDetails {
  phone: number;
  username: string;
}

const initialState: UserDetails = {
  phone: 0,
  username: "",
};

export const counterSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    changeInput: (
      state,
      action: PayloadAction<{ name: string; text: string }>
    ) => {
      return {
        ...state,
        [action.payload.name]: action.payload.text,
      };
    },
  },
});
