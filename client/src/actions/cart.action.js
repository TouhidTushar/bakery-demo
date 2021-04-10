import store from "../store";
import axios from "../helpers/axios";
import { cartConstants } from "./constants";

//get user cart
const getCartItems = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.GETCARTITEMS_REQUEST });
      const res = await axios.post(`/user/getCartItems`);
      if (res.status === 200) {
        const { cartItems } = res.data;
        if (cartItems) {
          const message = "Items retrieved";
          dispatch({
            type: cartConstants.GETCARTITEMS_SUCCESS,
            payload: { cartItems: cartItems, Response: message },
          });
        }
      }
    } catch (error) {
      const message = "Empty cart!";
      dispatch({
        type: cartConstants.GETCARTITEMS_FAILURE,
        payload: message,
      });
    }
  };
};

//add items to cart
export const addToCart = (Product) => {
  return async (dispatch) => {
    const { cart, auth } = store.getState();
    var incremented = false;

    const increaseQty = (PROD) => {
      PROD.quantity = PROD.quantity + 1;
      incremented = true;
    };

    const createCartData = async (cartItemsArray, flag) => {
      if (cartItemsArray.length > 0) {
        cartItemsArray.map((Item) =>
          Item.product._id === Product._id ? increaseQty(Item) : null
        );
        if (incremented === false) {
          const item = {
            product: Product,
            quantity: 1,
          };
          cartItemsArray.push(item);
        }
        incremented = false;
      } else {
        const item = {
          product: Product,
          quantity: 1,
        };
        cartItemsArray.push(item);
      }

      if (flag) {
        let payload = cartItemsArray;
        dispatch({ type: cartConstants.ADDTOCART_REQUEST });
        try {
          const res = await axios.post("/user/cart/addtocart", {
            data: payload,
          });
          if (res.status === 200) {
            const message = "Item added successfully";
            const { cartItems } = res.data;
            if (cartItems) {
              dispatch({
                type: cartConstants.ADDTOCART_SUCCESS,
                payload: { cartItems: cartItems, Response: message },
              });
            }
          }
        } catch (error) {
          const message = "Something went wrong!";
          dispatch({
            type: cartConstants.ADDTOCART_FAILURE,
            payload: message,
          });
        }
      } else {
        dispatch({ type: cartConstants.ADDTOCART_REQUEST });
        try {
          const message = "Item added successfully";
          localStorage.setItem("Cart", JSON.stringify(cart));
          dispatch({
            type: cartConstants.ADDTOCART_SUCCESS,
            payload: { cartItems: cart.cartItems, Response: message },
          });
        } catch (error) {
          const message = "Something went wrong!";
          dispatch({
            type: cartConstants.ADDTOCART_FAILURE,
            payload: message,
          });
        }
      }
    };

    if (!auth.authenticate) {
      var localData = localStorage.getItem("Cart");
      if (localData) {
        const localCart = JSON.parse(localData);
        cart.cartItems = localCart.cartItems;
      }
      const User = false;
      createCartData(cart.cartItems, User);
    } else {
      const User = true;
      createCartData(cart.cartItems, User);
    }
  };
};

//remove items from cart
export const removeFromCart = (Product) => {
  return async (dispatch) => {
    const { cart, auth } = store.getState();

    const decreaseQty = (PROD) => {
      PROD.quantity = PROD.quantity - 1;
    };

    const createCartData = async (cartItemsArray, flag) => {
      if (cartItemsArray.length > 0) {
        cartItemsArray.map((Item) =>
          Item.product._id === Product._id
            ? Item.quantity > 1
              ? decreaseQty(Item)
              : cartItemsArray.pop(Item)
            : null
        );
      } else {
        cartItemsArray = [];
      }

      if (flag) {
        let payload = cartItemsArray;
        dispatch({ type: cartConstants.ADDTOCART_REQUEST });
        try {
          const res = await axios.post("/user/cart/addtocart", {
            data: payload,
          });
          if (res.status === 200) {
            const message = "Item reduced successfully";
            const { cartItems } = res.data;
            if (cartItems) {
              dispatch({
                type: cartConstants.ADDTOCART_SUCCESS,
                payload: { cartItems: cartItems, Response: message },
              });
            }
          }
        } catch (error) {
          const message = "Something went wrong!";
          dispatch({
            type: cartConstants.ADDTOCART_FAILURE,
            payload: message,
          });
        }
      } else {
        dispatch({ type: cartConstants.ADDTOCART_REQUEST });
        try {
          const message = "Item reduced successfully";
          localStorage.setItem("Cart", JSON.stringify(cart));
          dispatch({
            type: cartConstants.ADDTOCART_SUCCESS,
            payload: { cartItems: cart.cartItems, Response: message },
          });
        } catch (error) {
          const message = "Something went wrong!";
          dispatch({
            type: cartConstants.ADDTOCART_FAILURE,
            payload: message,
          });
        }
      }
    };

    if (!auth.authenticate) {
      var localData = localStorage.getItem("Cart");
      if (localData) {
        const localCart = JSON.parse(localData);
        cart.cartItems = localCart.cartItems;
      }
      const User = false;
      createCartData(cart.cartItems, User);
    } else {
      const User = true;
      createCartData(cart.cartItems, User);
    }
  };
};

//clear cart
export const clearCart = () => {
  return async (dispatch) => {
    const { auth } = store.getState();

    if (!auth.authenticate) {
      try {
        const message = "Cart cleared!";
        localStorage.removeItem("Cart");
        dispatch({
          type: cartConstants.RESET_CART,
          payload: message,
        });
      } catch (error) {
        const message = "Something went wrong!";
        dispatch({
          type: cartConstants.RESETCART_FAILURE,
          payload: message,
        });
      }
    } else {
      try {
        dispatch({ type: cartConstants.ADDTOCART_REQUEST });
        const res = await axios.post("/user/cart/removeCart");
        if (res.status === 200) {
          const message = "Cart cleared!";
          dispatch({
            type: cartConstants.RESET_CART,
            payload: message,
          });
        }
      } catch (error) {
        const message = "Something went wrong!";
        dispatch({
          type: cartConstants.RESETCART_FAILURE,
          payload: message,
        });
      }
    }
  };
};

export { getCartItems };
