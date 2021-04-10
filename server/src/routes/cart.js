const express = require("express");
const {
  removeCart,
  getCartItems,
  addItemToCart,
} = require("../controller/cart.cont");
const { requireSignin, userMiddleware } = require("../common-middleware");

const router = express.Router();

router.post("/user/getCartItems", requireSignin, userMiddleware, getCartItems);
router.post(
  "/user/cart/addtocart",
  requireSignin,
  userMiddleware,
  addItemToCart
);
router.post("/user/cart/removeCart", requireSignin, userMiddleware, removeCart);

module.exports = router;
