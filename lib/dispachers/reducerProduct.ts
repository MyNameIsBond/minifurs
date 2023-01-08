export let initialState = {
  product: [],
  error: false,
  loading: true,
  displayColour: "",
  colours: [],
  quantity: 1,
  favourite: false,
};

export const ACTION = {
  FETCH_PRODUCT_START: "FETCH_PRODUCT_START",
  FETCH_PRODUCT_SUCCESS: "FETCH_PRODUCT_SUCCESS",
  FETCH_PRODUCT_ERROR: "FETCH_PRODUCT_ERROR",
  CHANGE_DISPLAY_COLOUR: "CHANGE_DISPLAY_COLOUR",
  INCREMENT_QUANTITY: "INCREMENT_QUANTITY",
  DECREMENT_QUANTITY: "DECREMENT_QUANTITY",
  FAVOURITE_PRODUCT: "FAVOURITE_PRODUCT",
  UNFAVOURITE_PRODUCT: "UNFAVOURITE_PRODUCT",
};

export default function reducerProduct(state, action) {
  switch (action.type) {
    case ACTION.FETCH_PRODUCT_START:
      return {
        ...state,
      };
    case ACTION.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        displayColour: action.payload.colours[0],
        colours: action.payload.colours,
        loading: false,
      };
    case ACTION.FETCH_PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    case ACTION.CHANGE_DISPLAY_COLOUR:
      return {
        ...state,
        displayColour: action.payload,
      };
    case ACTION.INCREMENT_QUANTITY:
      return {
        ...state,
        quantity: state.quantity + 1,
      };
    case ACTION.DECREMENT_QUANTITY:
      return {
        ...state,
        quantity: state.quantity - 1,
      };
    case ACTION.FAVOURITE_PRODUCT:
      return {
        ...state,
        favourite: true,
      };
    case ACTION.UNFAVOURITE_PRODUCT:
      return {
        ...state,
        favourite: false,
      };
    default:
      return state;
  }
}
