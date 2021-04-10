const express = require("express");
const multer = require("multer");
const router = express.Router();
// const shortid = require("shortid");
// const path = require("path");
//const {  } = require('../controller/category');
const {
  requireSignin,
  adminMiddleware,
  upload,
  userMiddleware,
} = require("../common-middleware");
const {
  createProduct,
  // getProductsBySlug,
  // getProductDetailsById,
  deleteProductById,
  getProducts,
  searchItems,
  productReview,
  editReview,
  deleteReview,
} = require("../controller/product.cont");

//new product
router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPicture"),
  createProduct
);

router.delete(
  "/product/deleteProductById",
  requireSignin,
  adminMiddleware,
  deleteProductById
);
router.post("/product/getProducts", getProducts);
router.post("/product/search", searchItems);

router.post("/user/postReview", requireSignin, userMiddleware, productReview);
router.post("/user/editReview", requireSignin, userMiddleware, editReview);
router.post("/user/deleteReview", requireSignin, userMiddleware, deleteReview);

module.exports = router;

// router.get("/products/:slug", getProductsBySlug);
//router.get('/category/getcategory', getCategories);
// router.get("/product/:productId", getProductDetailsById);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(path.dirname(__dirname), "uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, shortid.generate() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });
