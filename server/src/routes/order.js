const multer = require("multer");
const shortid = require("shortid");
const {
  placeUserOrder,
  placeUserCustomOrder,
  getUserOrders,
  getOrder,
  placeOrder,
  placeCustomOrder,
} = require("../controller/order.cont");
const { requireSignin, userMiddleware } = require("../common-middleware");

const router = require("express").Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/userFiles/");
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/user/placeOrder", requireSignin, userMiddleware, placeUserOrder);
router.post(
  "/user/placeCustomOrder",
  requireSignin,
  userMiddleware,
  upload.array("userFile"),
  placeUserCustomOrder
);
router.post("/user/getOrders", requireSignin, userMiddleware, getUserOrders);

router.post("/placeOrder", placeOrder);
router.post("/placeCustomOrder", upload.array("userFile"), placeCustomOrder);
router.post("/getOrder", getOrder);

module.exports = router;
