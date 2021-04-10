import { inventoryConstants } from "../actions/constants";

const initState = {
  Categories: [],
  Products: [],
  SearchResult: [],
  loading: false,
  searching: false,
  serverRes: "",
};

const inventoryReducer = (state = initState, action) => {
  // eslint-disable-next-line
  switch (action.type) {
    //getting all categories
    case inventoryConstants.GETCAT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case inventoryConstants.GETCAT_SUCCESS:
      state = {
        ...state,
        Categories: action.payload.Categories,
        loading: false,
      };
      break;
    case inventoryConstants.GETCAT_FAILURE:
      state = {
        ...state,
        loading: false,
        serverRes: action.payload.Message,
      };
      break;

    //getting all products
    case inventoryConstants.GETPROD_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case inventoryConstants.GETPROD_SUCCESS:
      state = {
        ...state,
        loading: false,
        Products: action.payload.Products,
        serverRes: action.payload.Message,
      };
      break;
    case inventoryConstants.GETPROD_FAILURE:
      state = {
        ...state,
        loading: false,
        serverRes: action.payload.Message,
      };
      break;

    //search Items
    case inventoryConstants.SEARCH_REQUEST:
      state = {
        ...state,
        searching: true,
      };
      break;
    case inventoryConstants.SEARCH_SUCCESS:
      state = {
        ...state,
        searching: false,
        SearchResult: action.payload.Products,
        serverRes: action.payload.Message,
      };
      break;
    case inventoryConstants.SEARCH_FAILURE:
      state = {
        ...state,
        searching: false,
        serverRes: action.payload.Message,
      };
      break;
    case inventoryConstants.SEARCH_CANCEL:
      state = {
        ...state,
        SearchResult: [],
        searching: false,
      };
      break;
  }
  return state;
};

export default inventoryReducer;
