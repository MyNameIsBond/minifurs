import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface AuthState {
  email: string;
  password: string;
  showPassword: boolean;
}

const initialState: AuthState = {
  email: "",
  password: "",
  showPassword: false,
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
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    },
  },
});

export const { showPasswordToggle, changeInput } = authSlice.actions;
