import axios from "../helpers/axios";
import { rootDir } from "../urlConfig";
import { getCartItems } from "./index";
import { getDeliveryInfo, getOrders } from "./index";
import { authConstants, cartConstants, orderConstants } from "./constants";

//signup action
export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.SIGNUP_REQUEST });
    try {
      const res = await axios.post("/signup", {
        ...user,
      });

      if (res.status === 201) {
        const { message, tempUser } = res.data;
        localStorage.setItem("tempUser", JSON.stringify(tempUser));
        dispatch({
          type: authConstants.SIGNUP_SUCCESS,
          payload: {
            message,
          },
        });
        window.location.href = `${rootDir}/signUpConfirmation`;
      }
    } catch (error) {
      if (error.response.data.message == undefined) {
        const message = "Something went wrong!";
        dispatch({
          type: authConstants.SIGNUP_FAILURE,
          payload: message,
        });
      } else {
        const message = error.response.data.message;
        dispatch({
          type: authConstants.SIGNUP_FAILURE,
          payload: message,
        });
      }
    }
  };
};

//login action
export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    try {
      const res = await axios.post("/signin", {
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
        var Token = window.localStorage.getItem("token");
        if (Token) {
          dispatch(getCartItems());
          dispatch(getOrders());
          dispatch(getDeliveryInfo());
        }
      }
    } catch (error) {
      if (error.response.data.message == undefined) {
        const message = "Failed to connect with server!";
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: message,
        });
      } else {
        const message = error.response.data.message;
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: message,
        });
      }
    }
    // return Promise.resolve();
  };
};

//logout action
export const signout = () => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGOUT_REQUEST,
    });
    try {
      const res = await axios.post("/signout");

      if (res.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({
          type: authConstants.LOGOUT_SUCCESS,
        });
        dispatch({
          type: orderConstants.CLEARORDER,
        });
        var retrievedData = localStorage.getItem("Cart");
        if (retrievedData !== null) {
          const cartData = JSON.parse(retrievedData);
          dispatch({
            type: cartConstants.ADDTOCART_SUCCESS,
            payload: { cartItems: cartData.cartItems },
          });
        } else {
          dispatch({ type: cartConstants.RESET_CART });
        }
      }
    } catch (error) {
      const message = "Something went wrong!";
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: message,
      });
    }
  };
};

//logged in check
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const Token = { token: token };
      try {
        const res = await axios.post("/session", Token);
        if (res.status === 200) {
          const user = JSON.parse(localStorage.getItem("user"));
          const message = "";
          dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: {
              token,
              message,
              user,
            },
          });
        }
      } catch (error) {
        const message = "Session expired!";
        dispatch(signout());
        var retrievedData = localStorage.getItem("Cart");
        if (retrievedData !== null) {
          const cartData = JSON.parse(retrievedData);
          dispatch({
            type: cartConstants.ADDTOCART_SUCCESS,
            payload: { cartItems: cartData.cartItems },
          });
        } else {
          dispatch({ type: cartConstants.RESET_CART });
        }
      }
    } else {
      const message = "";
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: message,
      });
      var retrievedData = localStorage.getItem("Cart");
      if (retrievedData !== null) {
        const cartData = JSON.parse(retrievedData);
        dispatch({
          type: cartConstants.ADDTOCART_SUCCESS,
          payload: { cartItems: cartData.cartItems },
        });
      } else {
        dispatch({ type: cartConstants.RESET_CART });
      }
    }
    return Promise.resolve();
  };
};

//edit profile
export const editUser = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.EDITPROFILE_REQUEST });
    try {
      const res = await axios.post("/editProfile", {
        ...user,
      });

      if (res.status === 200) {
        const { message, user } = res.data;
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstants.EDITPROFILE_SUCCESS,
          payload: {
            message,
            user,
          },
        });
      }
    } catch (error) {
      if (error.response.data.message == undefined) {
        const message = "Couldn't save changes!";
        dispatch({
          type: authConstants.EDITPROFILE_FAILURE,
          payload: message,
        });
      } else {
        const message = error.response.data.message;
        dispatch({
          type: authConstants.EDITPROFILE_FAILURE,
          payload: message,
        });
      }
    }
  };
};

//password change
export const changePassword = (passData) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.EDITPASS_REQUEST });
    try {
      const res = await axios.post("/passwordChange", {
        ...passData,
      });

      if (res.status === 200) {
        const { message } = res.data;
        const user = JSON.parse(localStorage.getItem("user"));
        dispatch({
          type: authConstants.EDITPASS_SUCCESS,
          payload: {
            message,
            user,
          },
        });
      }
    } catch (error) {
      if (error.response.data.message == undefined) {
        const message = "Something went wrong!";
        dispatch({
          type: authConstants.EDITPASS_FAILURE,
          payload: message,
        });
      } else {
        const message = error.response.data.message;
        dispatch({
          type: authConstants.EDITPASS_FAILURE,
          payload: message,
        });
      }
    }
  };
};

//account recovery
export const sendRecoveryCode = (email) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.RESETPASS_REQUEST });
    try {
      const res = await axios.post("/getRecoveryCode", {
        email,
      });

      if (res.status === 200) {
        console.log(res.data);
        const { message } = res.data;
        dispatch({
          type: authConstants.RESETPASS_SUCCESS,
          payload: message,
        });
      }
    } catch (error) {
      if (error.response.data.message == undefined) {
        const message = "Something went wrong!";
        dispatch({
          type: authConstants.RESETPASS_FAILURE,
          payload: message,
        });
      } else {
        const message = error.response.data.message;
        dispatch({
          type: authConstants.RESETPASS_FAILURE,
          payload: message,
        });
      }
    }
  };
};

//password reset
export const resetPassword = (passData) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.RESETPASS_REQUEST });
    try {
      const res = await axios.post("/resetPassword", {
        ...passData,
      });

      if (res.status === 200) {
        const { message } = res.data;
        dispatch({
          type: authConstants.RESETPASS_SUCCESS,
          payload: message,
        });
      }
    } catch (error) {
      if (error.response.data.message == undefined) {
        const message = "Something went wrong!";
        dispatch({
          type: authConstants.RESETPASS_FAILURE,
          payload: message,
        });
      } else {
        const message = error.response.data.message;
        dispatch({
          type: authConstants.RESETPASS_FAILURE,
          payload: message,
        });
      }
    }
  };
};

//resend confirmation mail
export const emailResend = (tempData) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.SIGNUP_REQUEST });
    try {
      const res = await axios.post("/resendEmail", {
        ...tempData,
      });
      if (res.status === 200) {
        const { message } = res.data;
        dispatch({
          type: authConstants.SIGNUP_SUCCESS,
          payload: {
            message,
          },
        });
      }
    } catch (error) {
      const message = "Something went wrong!";
      dispatch({
        type: authConstants.SIGNUP_FAILURE,
        payload: message,
      });
    }
  };
};

//user confirmed check
export const checkConfirm = (tempData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/checkUser", {
        ...tempData,
      });
      if (res.status === 200) {
        const { tempUser } = res.data;
        console.log(tempUser);
        localStorage.setItem("tempUser", JSON.stringify(tempUser));
      }
    } catch (error) {
      console.log(error);
    }
    return Promise.resolve();
  };
};
