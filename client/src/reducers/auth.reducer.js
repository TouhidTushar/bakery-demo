import { authConstants } from "../actions/constants";

const initState = {
  token: null,
  user: {},
  authenticate: false,
  authenticating: false,
  serverRes: "",
  tempRes: "",
  loading: false,
  result: false,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    //signup
    case authConstants.SIGNUP_REQUEST:
      state = {
        ...initState,
        loading: true,
      };
      break;
    case authConstants.SIGNUP_SUCCESS:
      state = {
        ...state,
        result: true,
        loading: false,
        serverRes: action.payload.message,
      };
      break;
    case authConstants.SIGNUP_FAILURE:
      state = {
        ...state,
        result: false,
        loading: false,
        serverRes: action.payload,
      };
      break;

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
        result: true,
      };
      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        serverRes: action.payload,
        authenticate: false,
        authenticating: false,
        loading: false,
        result: false,
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
        serverRes: action.payload,
        loading: false,
        result: false,
      };
      break;

    //edit profile
    case authConstants.EDITPROFILE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.EDITPROFILE_SUCCESS:
      state = {
        ...state,
        loading: false,
        result: true,
        serverRes: action.payload.message,
        user: action.payload.user,
      };
      break;
    case authConstants.EDITPROFILE_FAILURE:
      state = {
        ...state,
        loading: false,
        result: false,
        serverRes: action.payload,
      };
      break;

    //edit password
    case authConstants.EDITPASS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.EDITPASS_SUCCESS:
      state = {
        ...state,
        loading: false,
        result: true,
        serverRes: action.payload.message,
        user: action.payload.user,
      };
      break;
    case authConstants.EDITPASS_FAILURE:
      state = {
        ...state,
        loading: false,
        result: false,
        serverRes: action.payload,
      };
      break;

    //reset password
    case authConstants.RESETPASS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.RESETPASS_SUCCESS:
      state = {
        ...state,
        loading: false,
        result: true,
        tempRes: action.payload,
      };
      break;
    case authConstants.RESETPASS_FAILURE:
      state = {
        ...state,
        loading: false,
        result: false,
        tempRes: action.payload,
      };
      break;
  }
  return state;
};

export default authReducer;
