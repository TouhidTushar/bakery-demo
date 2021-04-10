import { authConstants, inventoryConstants } from "./constants";
import axios from "../helpers/axios";
import { getInitialData } from "./initialData.action";
import {
  asuccessNotification,
  aerrorNotification,
  awarningNotification,
} from "./notification.action";

//login action
export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    try {
      const res = await axios.post("/admin/signin", {
        ...user,
      });

      if (res.status === 200) {
        const { token, user, message } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            message,
            token,
            user,
          },
        });
        dispatch(asuccessNotification);
      }
    } catch (error) {
      if (error.response.data == undefined) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { message: "Failed to connect with server!" },
        });
        dispatch(aerrorNotification);
      } else {
        const Message = error.response.data.message;
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { message: Message },
        });
        dispatch(aerrorNotification);
      }
    }
    dispatch(getInitialData());
  };
};

//logged in check (default)
// export const isUserLoggedIn = () => {
//   return async (dispatch) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const user = JSON.parse(localStorage.getItem("user"));
//       dispatch({
//         type: authConstants.LOGIN_SUCCESS,
//         payload: {
//           token,
//           user,
//         },
//       });
//     } else {
//       dispatch({
//         type: authConstants.LOGIN_FAILURE,
//         payload: { message: "Failed to login" },
//       });
//     }
//   };
// };

//logged in check (customized)
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const Token = { token: token };
      try {
        const res = await axios.post("/admin/session", Token);
        if (res.status === 200) {
          const user = JSON.parse(localStorage.getItem("user"));
          dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: {
              token,
              user,
            },
          });
        }
      } catch (error) {
        dispatch(signout());
        dispatch(awarningNotification);
      }
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { message: "Failed to login" },
      });
    }
  };
};

//logout action
export const signout = () => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGOUT_REQUEST,
    });
    try {
      const res = await axios.post("/admin/signout");

      if (res.status === 200) {
        localStorage.clear();
        dispatch({
          type: authConstants.LOGOUT_SUCCESS,
        });
        dispatch({
          type: inventoryConstants.CLEAR_STATE,
        });
      }
    } catch (error) {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: {
          error: "Oops! Something went wrong!",
        },
      });
      dispatch(aerrorNotification);
    }
  };
};

//signup action
export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.SIGNUP_REQUEST });
    try {
      const res = await axios.post("/admin/signup", {
        ...user,
      });

      if (res.status === 201) {
        const { message } = res.data;
        dispatch({
          type: authConstants.SIGNUP_SUCCESS,
          payload: {
            message,
          },
        });
        // dispatch((window.location.href = "http://localhost:4000/SignIn"));
        dispatch(asuccessNotification);
      }
    } catch (error) {
      const message = error.response.data;
      dispatch({
        type: authConstants.SIGNUP_FAILURE,
        payload: message,
      });
      dispatch(aerrorNotification);
    }
  };
};
