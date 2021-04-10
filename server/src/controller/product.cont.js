const slugify = require("slugify");
const Product = require("../models/product.model");
const Category = require("../models/category.model");

exports.getProducts = async (req, res) => {
  const products = await Product.find({})
    .select(
      "_id name slug weight quantity price description category productPictures offer reviews"
    )
    .populate({ path: "category", select: "_id name" })
    .populate({
      path: "reviews",
      populate: {
        path: "user",
        model: "User",
        select: "_id firstName lastName",
      },
    })
    .exec();

  res.status(200).json({ products });
};

exports.searchItems = async (req, res) => {
  const { input } = req.body;
  var regEX = new RegExp("\\B" + input + "|" + input + "\\B" + "|" + input);
  Product.find({
    name: { $regex: regEX, $options: "i" },
  })
    .select("_id name slug productPictures")
    .exec((error, products) => {
      if (error)
        return res.status(400).json({ message: "Somethig went wrong!" });
      if (products) {
        res.status(200).json({ products });
      }
    });
};

exports.createProduct = (req, res) => {
  const {
    name,
    weight,
    price,
    description,
    category,
    quantity,
    offer,
  } = req.body;
  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    weight,
    price,
    description,
    category,
    quantity,
    offer,
    productPictures,
    // createdBy: req.user._id,
  });

  product.save(async (error, product) => {
    if (error)
      return res.status(400).json({ message: "Something went wrong!" });
    if (product) {
      const CAT = await Category.findById(product.category);
      const categoryObj = { _id: CAT._id, name: CAT.name };
      res.status(201).json({
        product,
        categoryObj,
        message: "New product added",
      });
    }
  });
};

exports.deleteProductById = (req, res) => {
  const productId = req.body.payload;
  if (productId) {
    Product.deleteOne({ _id: productId }).exec((error, result) => {
      if (error)
        return res.status(400).json({ message: "Something went wrong!" });
      if (result) {
        res.status(202).json({ message: "deleted successfully!" });
      }
    });
  } else {
    res.status(400).json({ error: "invalid parameters" });
  }
};

exports.productReview = (req, res) => {
  Product.findOne({ _id: req.body.data.productId }).exec((error, product) => {
    if (error)
      return res.status(400).json({ message: "Something went wrong!" });
    if (product) {
      let myObject = {
        user: req.user._id,
        review: req.body.data.reviewData.review,
        rating: req.body.data.reviewData.rating,
        posted: Date.now(),
      };
      product.reviews.push(myObject);
      product.save((error, _product) => {
        if (error)
          return res.staus(400).json({ message: "Something went wrong!" });
        if (_product)
          return res
            .status(200)
            .json({ message: "Posted Review successfylly" });
      });
    }
  });
};

exports.editReview = (req, res) => {
  Product.findOne({ _id: req.body.data.productId }).exec((error, product) => {
    if (error)
      return res.status(400).json({ message: "Something went wrong!" });
    if (product) {
      for (let item of product.reviews) {
        if (item._id == req.body.data.reviewId) {
          product.reviews.pop(item);
        }
      }
      let newItem = {
        user: req.user._id,
        review: req.body.data.reviewData.review,
        rating: req.body.data.reviewData.rating,
        posted: Date.now(),
      };
      product.reviews.push(newItem);
      product.save((error, _product) => {
        if (error)
          return res.staus(400).json({ message: "Something went wrong!" });
        if (_product)
          return res
            .status(200)
            .json({ message: "Edited Review successfully" });
      });
    }
  });
};

exports.deleteReview = (req, res) => {
  Product.findOne({ _id: req.body.data.productId }).exec((error, product) => {
    if (error)
      return res.status(400).json({ message: "Something went wrong!" });
    if (product) {
      for (let item of product.reviews) {
        if (item._id == req.body.data.reviewId) {
          product.reviews.pop(item);
        }
      }
      product.save((error, _product) => {
        if (error)
          return res.staus(400).json({ message: "Something went wrong!" });
        if (_product)
          return res
            .status(200)
            .json({ message: "Deleted Review successfully" });
      });
    }
  });
};
