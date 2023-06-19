import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface AuthState {
  email: string;
  password: string;
  showPassword: boolean;
}

const initialState: AuthState = {
  email: "",
  password: "",
  showPassword: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    showPasswordToggle: (state) => {
      state.showPassword = !state.showPassword;
    },
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

export const { showPasswordToggle, changeInput } = authSlice.actions;
