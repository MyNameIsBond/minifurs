import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserDetails {
  edit: boolean;
  phone: number;
  username: string;
  road: string;
  town: string;
  county: string;
  postCode: string;
}

const initialState: UserDetails = {
  edit: false,
  phone: 0,
  username: "",
  road: "",
  town: "",
  county: "",
  postCode: "",
};

export const userDetails = createSlice({
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
    editToggle: (state) => {
      state.edit = !state.edit;
    },
  },
});

export const { editToggle, changeInput } = userDetails.actions;
