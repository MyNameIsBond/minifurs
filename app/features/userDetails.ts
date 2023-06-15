import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserDetails {
  editAddress: boolean;
  edit: boolean;
  phone: number;
  username: string;
  road: string;
  town: string;
  county: string;
  postCode: string;
}

const initialState: UserDetails = {
  editAddress: false,
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
    editAddressToggle: (state) => {
      state.editAddress = !state.editAddress;
    },
  },
});

export const { editToggle, changeInput, editAddressToggle } =
  userDetails.actions;
