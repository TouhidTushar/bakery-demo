const express = require("express");
const multer = require("multer");
const upload = multer();
const { requireSignin, superAdminMiddleware } = require("../common-middleware");
const {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category.cont");

const router = express.Router();

//retrieve categories
router.get("/category/getcategory", getCategory);

//new category
router.post(
  "/category/create",
  requireSignin,
  superAdminMiddleware,
  addCategory
);

//update category
router.post(
  "/category/update",
  requireSignin,
  superAdminMiddleware,
  upload.none(),
  updateCategory
);

//delete category
router.post(
  "/category/delete",
  requireSignin,
  superAdminMiddleware,
  deleteCategory
);

module.exports = router;
