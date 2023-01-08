export let initialState = {
  product: [],
  error: false,
  loading: true,
  displayColour: "",
  colours: [],
};

export const ACTION = {
  FETCH_PRODUCT_START: "FETCH_PRODUCT_START",
  FETCH_PRODUCT_SUCCESS: "FETCH_PRODUCT_SUCCESS",
  FETCH_PRODUCT_ERROR: "FETCH_PRODUCT_ERROR",
  CHANGE_DISPLAY_COLOUR: "CHANGE_DISPLAY_COLOUR",
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
    default:
      return state;
  }
}
