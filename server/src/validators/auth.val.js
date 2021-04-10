const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("firstName").notEmpty().withMessage("firstName is required"),
  check("firstName")
    .isLength({ min: 3 })
    .withMessage("firstName must be at least 3 characters long"),
  check("firstName")
    .isLength({ max: 20 })
    .withMessage("firstName is too long, try within 20 characters"),

  check("lastName").notEmpty().withMessage("lastName is required"),
  check("lastName")
    .isLength({ min: 3 })
    .withMessage("lastName must be at least 3 characters long"),
  check("lastName")
    .isLength({ max: 20 })
    .withMessage("lastName is too long, try within 20 characters"),
  check("email").isEmail().withMessage("valid email is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
];

exports.validateSigninRequest = [
  check("email").isEmail().withMessage("valid Email is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
};
