import { createSlice } from "@reduxjs/toolkit";
export const counterSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    password: "",
    showPassword: "",
  },
  reducers: {},
});

// TODO: make reducers for inputs and try to use those reducers for every input change.
