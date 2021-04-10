const express = require("express");
const {
  signup,
  signin,
  signout,
  session,
  checkUser,
  editProfile,
  resendEmail,
  generateCode,
  resetPassword,
  changePassword,
} = require("../controller/auth.cont");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../validators/auth.val");
const { requireSignin, userMiddleware } = require("../common-middleware");

const router = express.Router();

router.post("/signout", signout);
router.post("/session", session);
router.post("/checkUser", checkUser);
router.post("/resendEmail", resendEmail);
router.post("/resetPassword", resetPassword);
router.post("/getRecoveryCode", generateCode);
router.post("/editProfile", requireSignin, userMiddleware, editProfile);
router.post("/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);
router.post("/passwordChange", requireSignin, userMiddleware, changePassword);

module.exports = router;
