const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { adminRoot, clientRoot } = require("../urlConfig");

const router = express.Router();

router.get("/:token", async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    await User.findOneAndUpdate({ _id: decoded._id }, { confirmed: true });
    if (decoded.role === "user") {
      res.redirect(`${clientRoot}/signUpConfirmation`);
    } else if (decoded.role === "admin" || decoded.role === "super-admin") {
      res.redirect(`${adminRoot}/SignIn`);
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong!" });
  }
});

module.exports = router;
