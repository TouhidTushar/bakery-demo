import { authConstants } from "../actions/constants";

const initState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
  },
  authenticate: false,
  authenticating: false,
  serverRes: "",
  loading: false,
};

const authReducer = (state = initState, action) => {
  // eslint-disable-next-line
  switch (action.type) {
    //login
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
        loading: true,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        serverRes: action.payload.message,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
        loading: false,
      };
      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        serverRes: action.payload.message,
        authenticate: false,
        authenticating: false,
        loading: false,
      };
      break;

    //logout
    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
      };
      break;
    case authConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        serverRes: action.payload.error,
        loading: false,
      };
      break;

    //signup
    case authConstants.SIGNUP_REQUEST:
      state = {
        ...initState,
      };
      break;
    case authConstants.SIGNUP_SUCCESS:
      state = {
        ...state,
        serverRes: action.payload.message,
      };
      break;
    case authConstants.SIGNUP_FAILURE:
      state = {
        ...state,
        serverRes: action.payload.message,
      };
      break;
  }
  return state;
};

export default authReducer;
