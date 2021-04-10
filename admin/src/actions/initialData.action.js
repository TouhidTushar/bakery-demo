import axios from "../helpers/axios";
import { inventoryConstants } from "./constants";

export const getInitialData = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: inventoryConstants.GETCAT_REQUEST });
      dispatch({ type: inventoryConstants.GETPROD_REQUEST });
      const res = await axios.post("/initialdata");

      if (res.status === 200) {
        const { categories, products } = res.data;
        dispatch({
          type: inventoryConstants.GETCAT_SUCCESS,
          payload: {
            Categories: categories,
          },
        });
        dispatch({
          type: inventoryConstants.GETPROD_SUCCESS,
          payload: {
            Products: products,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: inventoryConstants.GETCAT_FAILURE,
        payload: {
          Message: error,
        },
      });
      dispatch({
        type: inventoryConstants.GETPROD_FAILURE,
        payload: {
          Message: error,
        },
      });
    }
  };
};
