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
};

export const ACTION = {
  SET_USER: "SET_USER",
  CHANGE_INPUT: "CHANGE_INPUT",
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
    default:
      return state;
  }
}
