const Cart = require("../models/cart.model");

exports.getCartItems = (req, res) => {
  const user = req.user;
  if (user) {
    Cart.findOne({ user: user._id })
      .populate("cartItems.product")
      .exec((error, cart) => {
        if (error) return res.status(400).json({ message: "Empty cart!" });
        if (cart) {
          let cartItemsArray = cart.cartItems;
          res.status(200).json({ cartItems: cartItemsArray });
        }
      });
  } else {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};

exports.addItemToCart = (req, res) => {
  const user = req.user;
  if (user) {
    Cart.findOne({ user: user._id }).exec((error, cart) => {
      if (error)
        return res.status(400).json({ message: "Something went wrong!" });
      if (cart) {
        cart.cartItems = req.body.data;
        cart.save((error, cart) => {
          if (error)
            return res.status(400).json({ message: "Something went wrong!" });
          if (cart) {
            Cart.findOne({ user: user._id })
              .populate("cartItems.product")
              .exec((error, cart) => {
                if (error)
                  return res
                    .status(400)
                    .json({ message: "Something went wrong!" });
                if (cart) {
                  let cartItemsArray = cart.cartItems;
                  res.status(200).json({ cartItems: cartItemsArray });
                }
              });
          }
        });
      } else {
        const cart = new Cart({
          user: user._id,
          cartItems: req.body.data,
        });
        cart.save((error, cart) => {
          if (error)
            return res.status(400).json({ message: "Something went wrong!" });
          if (cart) {
            Cart.findOne({ user: user._id })
              .populate("cartItems.product")
              .exec((error, cart) => {
                if (error)
                  return res
                    .status(400)
                    .json({ message: "Something went wrong!" });
                if (cart) {
                  let cartItemsArray = cart.cartItems;
                  res.status(200).json({ cartItems: cartItemsArray });
                }
              });
          }
        });
      }
    });
  } else {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};

exports.removeCart = (req, res) => {
  const user = req.user;
  if (user) {
    Cart.findOne({ user: user._id }).exec((error, cart) => {
      if (error)
        return res.status(400).json({ message: "Something went wrong!" });
      if (cart) {
        cart.delete((error, result) => {
          if (error)
            return res.status(400).json({ message: "Something went wrong!" });
          if (result) {
            res.status(200).json({ message: "Cart cleared" });
          }
        });
      }
    });
  } else {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};
