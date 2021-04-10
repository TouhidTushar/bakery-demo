const express = require("express");
const { requireSignin, userMiddleware } = require("../common-middleware");
const { addNewInfo, getInfo } = require("../controller/deliveryInfo.cont");

const router = express.Router();

router.post(
  "/user/deliveryInfo/create",
  requireSignin,
  userMiddleware,
  addNewInfo
);
router.post("/user/getDeliveryInfo", requireSignin, userMiddleware, getInfo);

module.exports = router;
