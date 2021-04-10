import { cartConstants } from "../actions/constants";

const initState = {
  cartItems: [],
  updatingCart: false,
  result: false,
  serverRes: "",
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    //get cartItems
    case cartConstants.GETCARTITEMS_REQUEST:
      state = {
        ...initState,
      };
      break;
    case cartConstants.GETCARTITEMS_SUCCESS:
      state = {
        ...state,
        cartItems: action.payload.cartItems,
        updatingCart: false,
        result: false,
        serverRes: "",
      };
      break;
    case cartConstants.GETCARTITEMS_FAILURE:
      state = {
        ...state,
        cartItems: [],
        updatingCart: false,
        result: false,
        serverRes: "",
      };
      break;

    //add to cart
    case cartConstants.ADDTOCART_REQUEST:
      state = {
        ...state,
        updatingCart: true,
      };
      break;
    case cartConstants.ADDTOCART_SUCCESS:
      state = {
        ...state,
        cartItems: action.payload.cartItems,
        updatingCart: false,
        result: true,
        serverRes: action.payload.Response,
      };
      break;
    case cartConstants.ADDTOCART_FAILURE:
      state = {
        ...state,
        updatingCart: false,
        result: false,
        serverRes: action.payload,
      };
      break;

    //reset cart
    case cartConstants.RESET_CART:
      state = {
        ...state,
        cartItems: [],
        updatingCart: false,
        result: true,
        serverRes: "",
      };
      break;
    case cartConstants.RESETCART_FAILURE:
      state = {
        ...state,
        updatingCart: false,
        result: false,
        serverRes: action.payload,
      };
      break;
  }
  return state;
};

export default cartReducer;
