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
