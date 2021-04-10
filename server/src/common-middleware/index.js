const path = require("path");
const aws = require("aws-sdk");
const multer = require("multer");
const shortid = require("shortid");
const jwt = require("jsonwebtoken");
const multerS3 = require("multer-s3");

//file storage config (using curently)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/");
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
exports.upload = multer({ storage });

//aws-s3 config(not using currently)
const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKey;

const s3 = new aws.S3({
  accessKeyId,
  secretAccessKey,
});

exports.uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: "flipkart-clone-app",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  }),
});
//aws-s3 config(not using currently) ^

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
    } catch (error) {
      res.status(500).json({ message: "invalid token" });
    }
  } else {
    return res.status(500).json({ message: "You are not signed in" });
  }
  next();
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "Access denied" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    if (req.user.role !== "super-admin") {
      return res.status(400).json({ message: "Access denied" });
    }
  }
  next();
};

exports.superAdminMiddleware = (req, res, next) => {
  if (req.user.role !== "super-admin") {
    return res.status(200).json({
      message: "Only Super Admin is authorized to perform this action!",
    });
  }
  next();
};
