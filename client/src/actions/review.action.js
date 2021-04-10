import axios from "../helpers/axios";
import { getProd } from "./inventory.action";

//post review
export const userReview = (reviewData, productId) => {
  return async (dispatch) => {
    const postData = { reviewData, productId };
    try {
      const res = await axios.post(`/user/postReview`, {
        data: postData,
      });
      if (res.status === 200) {
        dispatch(getProd());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//edit review
export const editReview = (reviewData, productId, reviewId) => {
  return async (dispatch) => {
    const postData = { reviewData, productId, reviewId };
    try {
      const res = await axios.post(`/user/editReview`, {
        data: postData,
      });
      if (res.status === 200) {
        dispatch(getProd());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//delete review
export const deleteReview = (productId, reviewId) => {
  return async (dispatch) => {
    const postData = { productId, reviewId };
    try {
      const res = await axios.post(`/user/deleteReview`, {
        data: postData,
      });
      if (res.status === 200) {
        dispatch(getProd());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
