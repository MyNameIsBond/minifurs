export const initialState = {
  email: "",
  password: "",
  loading: false,
  showPassword: true,
};

export const ACTION = {
  CHANGE_INPUT: "CHANGE_INPUT",
  LOADING: "LOADING",
  SHOWPASSWORD: "SHOWPASSWORD",
};

export default reducerSignUp = (state, action) => {
  switch (action.type) {
    case ACTION.CHANGE_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case ACTION.LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };

    case ACTION.SHOWPASSWORD:
      return {
        ...state,
        showPassword: action.payload.showPassword,
      };
    default:
      break;
  }
};
