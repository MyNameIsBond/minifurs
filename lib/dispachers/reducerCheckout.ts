export const initialState = {
  user: [],
};

export const ACTION = {
  FETCH_PRODUCT_START: "FETCH_PRODUCT_START",
};

export default function reducerProduct(state: any, action: { type: string }) {
  switch (action.type) {
    case ACTION.FETCH_PRODUCT_START:
      return {
        ...state,
      };
    default:
      return state;
  }
}
