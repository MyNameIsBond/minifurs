export const initialState = {
  user: [],
  email: "",
  password: "",
  loading: false,
  phone_number: 0,
  road: "",
  town: "",
  postcode: "",
  country: "",
  user_exist: false,
};

export const ACTION = {
  SET_USER: "SET_USER",
  CHANGE_INPUT: "CHANGE_INPUT",
  USER_EXIST: "USER_EXIST",
};

export default function reducerCheckout(state: any, action: any) {
  switch (action.type) {
    case ACTION.CHANGE_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case ACTION.SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case ACTION.USER_EXIST:
      return {
        ...state,
        user_exist: action.payload.user_exist,
      };
    default:
      return state;
  }
}
