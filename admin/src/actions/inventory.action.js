import axios from "../helpers/axios";
import { signout } from "./auth.action";
import { inventoryConstants } from "./constants";
import {
  isuccessNotification,
  ierrorNotification,
  iwarningNotification,
} from "./notification.action";

// get current categories
const getCat = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: inventoryConstants.GETCAT_REQUEST });
      const res = await axios.get("/category/getcategory");

      if (res.status === 200) {
        const { categoryList } = res.data;
        dispatch({
          type: inventoryConstants.GETCAT_SUCCESS,
          payload: { Categories: categoryList },
        });
      }
    } catch (error) {
      dispatch({
        type: inventoryConstants.GETCAT_FAILURE,
        payload: {
          Message: "Failed to fetch inventory data!",
        },
      });
      dispatch(ierrorNotification);
    }
  };
};

//create new category
export const addCategory = (CAT) => {
  return async (dispatch) => {
    try {
      dispatch({ type: inventoryConstants.ADDCAT_REQUEST });
      const res = await axios.post("category/create", {
        ...CAT,
      });
      if (res.status === 201) {
        const { category, message } = res.data;
        dispatch({
          type: inventoryConstants.ADDCAT_SUCCESS,
          payload: { category, Message: message },
        });
        dispatch(isuccessNotification);
      }
    } catch (error) {
      dispatch({
        type: inventoryConstants.ADDCAT_FAILURE,
        payload: {
          Message: "Oops! Something went wrong!",
        },
      });
      dispatch(ierrorNotification);
      if (error.response.status === 500) {
        dispatch(signout());
        dispatch(iwarningNotification);
      }
    }
  };
};

//update categories
export const updateCategories = (formData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: inventoryConstants.UPDCAT_REQUEST });
      const res = await axios.post("category/update", formData);
      if (res.status === 201) {
        dispatch({
          type: inventoryConstants.UPDCAT_SUCCESS,
          payload: { Message: "Updated successfully" },
        });
        dispatch(getCat());
        dispatch(isuccessNotification);
      }
    } catch (error) {
      dispatch({
        type: inventoryConstants.UPDCAT_FAILURE,
        payload: { Message: "Oops! Something went wrong!" },
      });
      dispatch(ierrorNotification);
      if (error.response.status === 500) {
        dispatch(signout());
        dispatch(iwarningNotification);
      }
    }
  };
};

//delete categories
export const deleteCategories = (ids) => {
  return async (dispatch) => {
    try {
      dispatch({ type: inventoryConstants.DELCAT_REQUEST });
      const res = await axios.post("category/delete", {
        payload: {
          ids,
        },
      });
      if (res.status === 201) {
        dispatch({
          type: inventoryConstants.DELCAT_SUCCESS,
          payload: { Message: "Deleted successfully" },
        });
        dispatch(getCat());
        dispatch(isuccessNotification);
      }
    } catch (error) {
      dispatch({
        type: inventoryConstants.DELCAT_FAILURE,
        payload: { Message: "Oops! Something went wrong!" },
      });
      dispatch(ierrorNotification);
      if (error.response.status === 500) {
        dispatch(signout());
        dispatch(iwarningNotification);
      }
    }
  };
};

//get current products
const getProd = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: inventoryConstants.GETPROD_REQUEST });
      const res = await axios.post(`product/getProducts`);
      if (res.status === 200) {
        const { products } = res.data;
        console.log(products);
        dispatch({
          type: inventoryConstants.GETPROD_SUCCESS,
          payload: { Products: products },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: inventoryConstants.GETPROD_FAILURE,
        payload: {
          Message: error,
        },
      });
    }
  };
};

//add new product
export const addProduct = (PROD) => {
  return async (dispatch) => {
    try {
      dispatch({ type: inventoryConstants.ADDPROD_REQUEST });
      const res = await axios.post("product/create", PROD);
      if (res.status === 201) {
        const { product, categoryObj, message } = res.data;
        dispatch({
          type: inventoryConstants.ADDPROD_SUCCESS,
          payload: { Product: product, Cat: categoryObj, Message: message },
        });
        dispatch(isuccessNotification);
      }
    } catch (error) {
      dispatch({
        type: inventoryConstants.ADDPROD_FAILURE,
        payload: {
          Message: "Oops! Something went wrong!",
        },
      });
      dispatch(ierrorNotification);
      if (error.response.status === 500) {
        dispatch(signout());
        dispatch(iwarningNotification);
      }
    }
  };
};

//delete product by Id
export const deleteProductById = (payload) => {
  return async (dispatch) => {
    const res = await axios.delete(`product/deleteProductById`, {
      data: { payload },
    });
    try {
      dispatch({ type: inventoryConstants.DELPROD_REQUEST });
      console.log("executed delete");
      if (res.status === 202) {
        const { result } = res.data;
        dispatch({
          type: inventoryConstants.DELPROD_SUCCESS,
          payload: { Message: result },
        });
        dispatch(getProd());
      }
    } catch (error) {
      dispatch({
        type: inventoryConstants.DELPROD_FAILURE,
        payload: {
          Message: error,
        },
      });
      if (error.response.status === 500) {
        dispatch(signout());
      }
    }
  };
};

export { getCat };
export { getProd };
