import { orderConstants } from "../actions/constants";

const initState = {
  orderDetails: [],
  savedInfo: {
    contact: "",
    address: "",
  },
  loading: false,
  serverRes: "",
};

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    //get orders
    case orderConstants.GETORDER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orderConstants.GETORDER_SUCCESS:
      state = {
        ...state,
        loading: false,
        orderDetails: action.payload.orderData,
        serverRes: action.payload.message,
      };
      break;
    case orderConstants.GETORDER_FAILURE:
      state = {
        ...state,
        loading: false,
        serverRes: action.payload,
      };
      break;

    //place order
    case orderConstants.PLACEORDER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orderConstants.PLACEORDER_SUCCESS:
      state = {
        ...state,
        loading: false,
        orderDetails: action.payload.orderData,
        serverRes: action.payload.message,
      };
      break;
    case orderConstants.PLACEORDER_FAILURE:
      state = {
        ...state,
        loading: false,
        serverRes: action.payload,
      };
      break;

    //delivery info
    case orderConstants.SAVEINFO_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orderConstants.SAVEINFO_SUCCESS:
      state = {
        ...state,
        loading: false,
        savedInfo: action.payload.savedInfo,
        serverRes: action.payload.message,
      };
      break;
    case orderConstants.SAVEINFO_FAILURE:
      state = {
        ...state,
        loading: false,
        serverRes: action.payload,
      };
      break;

    //clear state
    case orderConstants.CLEARORDER:
      state = {
        ...initState,
      };
  }
  return state;
};

export default orderReducer;
