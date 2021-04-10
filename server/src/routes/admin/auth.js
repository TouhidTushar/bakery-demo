const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  signout,
  session,
} = require("../../controller/admin/auth.cont");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../../validators/auth.val");
const { requireSignin } = require("../../common-middleware");

router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/admin/signin", validateSigninRequest, isRequestValidated, signin);
router.post("/admin/signout", signout);
router.post("/admin/session", session);
// requireSignin,

module.exports = router;
