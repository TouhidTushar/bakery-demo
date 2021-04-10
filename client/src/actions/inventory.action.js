import axios from "../helpers/axios";
import { inventoryConstants } from "./constants";

// get all categories
export const getCat = () => {
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
          Message: "Failed to retrieve data from server!",
        },
      });
    }
  };
};

//get all products
export const getProd = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: inventoryConstants.GETPROD_REQUEST });
      const res = await axios.post("/product/getProducts");
      if (res.status === 200) {
        const { products } = res.data;
        dispatch({
          type: inventoryConstants.GETPROD_SUCCESS,
          payload: { Products: products },
        });
      }
    } catch (error) {
      dispatch({
        type: inventoryConstants.GETPROD_FAILURE,
        payload: {
          Message: "Failed to retrieve data from server!",
        },
      });
    }
  };
};

// search items
export const searchItems = (input) => {
  return async (dispatch) => {
    console.log(input);
    try {
      dispatch({ type: inventoryConstants.SEARCH_REQUEST });
      const res = await axios.post("/product/search", { input });
      if (res.status === 200) {
        const { products } = res.data;
        dispatch({
          type: inventoryConstants.SEARCH_SUCCESS,
          payload: { Products: products },
        });
      }
    } catch (error) {
      dispatch({
        type: inventoryConstants.SEARCH_FAILURE,
        payload: {
          Message: "Failed to retrieve data from server!",
        },
      });
    }
  };
};
