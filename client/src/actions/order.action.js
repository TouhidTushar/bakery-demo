import axios from "../helpers/axios";
import { rootDir } from "../urlConfig";
import { orderConstants } from "./constants";

//get user orders
export const getOrders = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderConstants.GETORDER_REQUEST });
      const res = await axios.post(`/user/getOrders`);
      if (res.status === 200) {
        const { _userOrders } = res.data;
        if (_userOrders) {
          dispatch({
            type: orderConstants.GETORDER_SUCCESS,
            payload: { orderData: _userOrders, message: "Orders retrieved" },
          });
        }
      }
    } catch (error) {
      const message = "Something went wrong!";
      dispatch({
        type: orderConstants.GETORDER_FAILURE,
        payload: message,
      });
    }
  };
};

//track order by ID
export const getOrderById = (orderID) => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderConstants.GETORDER_REQUEST });
      const res = await axios.post(`/getOrder`, {
        data: orderID,
      });
      if (res.status === 200) {
        const { _guestOrder } = res.data;
        const retData = [_guestOrder];
        if (_guestOrder) {
          dispatch({
            type: orderConstants.GETORDER_SUCCESS,
            payload: { orderData: retData, message: "Order retrieved" },
          });
        }
      }
    } catch (error) {
      if (error.response.data == undefined) {
        const message = "Something went wrong!";
        dispatch({
          type: orderConstants.GETORDER_FAILURE,
          payload: message,
        });
      } else {
        const message = error.response.data;
        dispatch({
          type: orderConstants.PLACEORDER_FAILURE,
          payload: message,
        });
      }
    }
  };
};

//place guest order (general)
export const placeOrder = (orderData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderConstants.PLACEORDER_REQUEST });
      const res = await axios.post("/placeOrder", {
        data: orderData,
      });
      if (res.status === 201) {
        const { _guestOrder } = res.data;
        const guestOrd = [_guestOrder];
        localStorage.setItem("GuestOrder", JSON.stringify(guestOrd));
        dispatch({
          type: orderConstants.PLACEORDER_SUCCESS,
          payload: { orderData: guestOrd, message: "Order placed" },
        });
        if (_guestOrder.paymentType === "PRE") {
          window.location.href = `${rootDir}/paymentGateway`;
        } else {
          window.location.href = `${rootDir}/orderConfirmation`;
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message == undefined) {
        const message = "Something went wrong!";
        dispatch({
          type: orderConstants.PLACEORDER_FAILURE,
          payload: message,
        });
      } else {
        const message = error.response.data.message;
        dispatch({
          type: orderConstants.PLACEORDER_FAILURE,
          payload: message,
        });
      }
    }
    return Promise.resolve();
  };
};

//place guest order (custom)
export const placeCustomOrder = (orderData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderConstants.PLACEORDER_REQUEST });
      const res = await axios.post("/placeCustomOrder", orderData);
      if (res.status === 201) {
        const { _guestOrder } = res.data;
        const guestOrd = [_guestOrder];
        localStorage.setItem("GuestOrder", JSON.stringify(guestOrd));
        dispatch({
          type: orderConstants.PLACEORDER_SUCCESS,
          payload: { orderData: guestOrd, message: "Order placed" },
        });
        if (_guestOrder.paymentType === "PRE") {
          window.location.href = `${rootDir}/paymentGateway`;
        } else {
          window.location.href = `${rootDir}/orderConfirmation`;
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message == undefined) {
        const message = "Something went wrong!";
        dispatch({
          type: orderConstants.PLACEORDER_FAILURE,
          payload: message,
        });
      } else {
        const message = error.response.data.message;
        dispatch({
          type: orderConstants.PLACEORDER_FAILURE,
          payload: message,
        });
      }
    }
  };
};

//place user order (general)
export const placeUserOrder = (orderData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderConstants.PLACEORDER_REQUEST });
      const res = await axios.post("/user/placeOrder", {
        data: orderData,
      });
      if (res.status === 201) {
        const { _userOrder } = res.data;
        if (_userOrder.paymentType === "PRE") {
          window.location.href = `${rootDir}/paymentGateway`;
        } else {
          window.location.href = `${rootDir}/orderConfirmation`;
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.data == undefined) {
        const message = "Something went wrong!";
        dispatch({
          type: orderConstants.PLACEORDER_FAILURE,
          payload: message,
        });
      } else {
        const message = error.response.data;
        dispatch({
          type: orderConstants.PLACEORDER_FAILURE,
          payload: message,
        });
      }
    }
    return Promise.resolve();
  };
};

//place user order (custom)
export const placeUserCustomOrder = (orderData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderConstants.PLACEORDER_REQUEST });
      const res = await axios.post("/user/placeCustomOrder", orderData);
      if (res.status === 201) {
        const { _userOrder } = res.data;
        if (_userOrder.paymentType === "PRE") {
          window.location.href = `${rootDir}/paymentGateway`;
        } else {
          window.location.href = `${rootDir}/orderConfirmation`;
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.data == undefined) {
        const message = "Something went wrong!";
        dispatch({
          type: orderConstants.PLACEORDER_FAILURE,
          payload: message,
        });
      } else {
        const message = error.response.data;
        dispatch({
          type: orderConstants.PLACEORDER_FAILURE,
          payload: message,
        });
      }
    }
    return Promise.resolve();
  };
};

//save delivery info
export const saveDeliveryInfo = (info) => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderConstants.SAVEINFO_REQUEST });
      const res = await axios.post("/user/deliveryInfo/create", {
        data: info,
      });
      if (res.status === 201) {
        const { deliveryInfo } = res.data;
        dispatch({
          type: orderConstants.SAVEINFO_SUCCESS,
          payload: { savedInfo: deliveryInfo, message: "Information Saved" },
        });
      }
    } catch (error) {
      if (error.response.data == undefined) {
        const message = "Something went wrong!";
        dispatch({
          type: orderConstants.SAVEINFO_FAILURE,
          payload: message,
        });
      } else {
        const message = error.response.data;
        dispatch({
          type: orderConstants.SAVEINFO_FAILURE,
          payload: message,
        });
      }
    }
  };
};

//get user delivery info
export const getDeliveryInfo = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderConstants.SAVEINFO_REQUEST });
      const res = await axios.post(`/user/getDeliveryInfo`);
      if (res.status === 200) {
        const { deliveryInfo } = res.data;
        if (deliveryInfo) {
          const message = "Saved information retrieved";
          dispatch({
            type: orderConstants.SAVEINFO_SUCCESS,
            payload: { savedInfo: deliveryInfo, message },
          });
        }
      }
    } catch (error) {
      const message = "Something went wrong!";
      dispatch({
        type: orderConstants.SAVEINFO_FAILURE,
        payload: message,
      });
    }
  };
};
