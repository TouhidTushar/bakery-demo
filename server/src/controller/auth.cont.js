const bcrypt = require("bcrypt");
const shortid = require("shortid");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/user.model");
const { serverRoot } = require("../urlConfig");
const mailGun = require("nodemailer-mailgun-transport");

require("dotenv").config();

//jwt token
const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

//email config
const generateEmailToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
const auth = {
  auth: {
    api_key: process.env.MAIL_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};
let transporter = nodemailer.createTransport(mailGun(auth));

//signup
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        message: "Email already registered!",
      });

    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: shortid.generate(),
    });

    _user.save((error, user) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong!",
        });
      }

      if (user) {
        const emailToken = generateEmailToken(user._id, user.role);

        //mailing for confirmation
        // const url = `http://localhost:5000/confirmation/${emailToken}`;
        const url = `${serverRoot}/confirmation/${emailToken}`;

        const mailOptions = {
          from: "email-verification@test-domain.com",
          to: `${req.body.email}`,
          subject: "Confirm Your Email",
          html: `Please click this link to confirm your email: <a href="${url}">CONFIRMATION LINK</a>`,
        };

        transporter.sendMail(mailOptions, function (error) {
          if (error) {
            return res.status(400).json({
              message: "Something went wrong!",
            });
          } else {
            return res.status(201).json({
              message: "Successful! Please confirm your email.",
              tempUser: {
                id: user._id,
                email: user.email,
                confirmed: user.confirmed,
              },
            });
          }
        });
      }
    });
  });
};

//resend confirmation mail
exports.resendEmail = (req, res) => {
  const { id, email } = req.body;
  User.findOne({ _id: id }).exec(async (error, user) => {
    if (error)
      return res.status(400).json({ message: "Something went wrong!" });
    if (user) {
      const emailToken = generateEmailToken(user._id, user.role);

      //resending mail for confirmation
      const url = `${serverRoot}/confirmation/${emailToken}`;

      const mailOptions = {
        from: "email-verification@test-domain.com",
        to: `${email}`,
        subject: "Confirm Your Email",
        html: `Please click this link to confirm your email: <a href="${url}">CONFIRMATION LINK</a>`,
      };

      transporter.sendMail(mailOptions, function (error) {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong!",
          });
        } else {
          return res.status(200).json({
            message: "Email was resend.",
          });
        }
      });
    }
  });
};

//user confirmed check
exports.checkUser = (req, res) => {
  const { id } = req.body;
  User.findOne({ _id: id }).exec(async (error, user) => {
    if (error)
      return res.status(400).json({ message: "Something went wrong!" });
    if (user) {
      return res.status(200).json({
        tempUser: {
          id: user._id,
          email: user.email,
          confirmed: user.confirmed,
        },
      });
    }
  });
};

//signin
exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error)
      return res.status(400).json({ message: "Something went wrong!" });
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword && user.role === "user") {
        if (!user.confirmed) {
          res.status(400).json({
            message: "Please confirm your email.",
          });
        } else {
          const token = generateJwtToken(user._id, user.role);
          const {
            _id,
            firstName,
            lastName,
            username,
            email,
            gender,
            birthday,
            contactNumber,
            firstPurchase,
            coupon,
          } = user;
          res.cookie("token", token, { expiresIn: "1d" });
          res.status(200).json({
            message: "Login successful!",
            token,
            user: {
              _id,
              firstName,
              lastName,
              username,
              email,
              gender,
              birthday,
              contactNumber,
              firstPurchase,
              coupon,
            },
          });
        }
      } else {
        return res.status(400).json({
          message: "incorrect email or password",
        });
      }
    } else {
      return res.status(400).json({ message: "incorrect email or password" });
    }
  });
};

//signout
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successful!",
  });
};

//session check
exports.session = (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (user) {
      res.status(200).json({ message: "token is valid" });
    }
  } catch (error) {
    res.status(400).json({ message: "invalid token" });
  }
};

//edit profile
exports.editProfile = (req, res) => {
  const _user = req.user;
  User.findOne({ _id: _user._id }).exec(async (error, user) => {
    if (error)
      return res.status(400).json({ message: "Something went wrong!" });
    if (user) {
      const {
        firstName,
        lastName,
        email,
        contactNumber,
        gender,
        birthday,
      } = req.body;

      if (email != user.email) {
        User.findOne({ email: email }).exec(async (error, user_) => {
          if (error)
            return res.status(400).json({ message: "Something went wrong!" });
          if (user_)
            return res.status(400).json({
              message: "Account with same email already exists!",
            });

          user.confirmed = false;
          user.firstName = firstName;
          user.lastName = lastName;
          user.email = email;
          user.gender = gender;
          if (contactNumber != "") {
            user.contactNumber = contactNumber;
          }
          if (contactNumber === "") {
            user.contactNumber = null;
          }
          if (birthday != "") {
            user.birthday = birthday;
          }

          user.save((error, User) => {
            if (error) {
              return res.status(400).json({
                message: "Something went wrong!",
              });
            }
            if (User) {
              const emailToken = generateEmailToken(User._id, User.role);

              //mailing for confirmation
              const url = `${serverRoot}/confirmation/${emailToken}`;

              const mailOptions = {
                from: "email-verification@test-domain.com",
                to: `${req.body.email}`,
                subject: "Confirm Your Email",
                html: `Please click this link to confirm your email: <a href="${url}">CONFIRMATION LINK</a>`,
              };

              transporter.sendMail(mailOptions, function (error) {
                if (error) {
                  return res.status(400).json({
                    message: "Something went wrong!",
                  });
                } else {
                  res.status(200).json({
                    message:
                      "Changes saved, check your mail for confirmation link.",
                    user: {
                      _id: User._id,
                      firstName: User.firstName,
                      lastName: User.lastName,
                      username: User.username,
                      email: User.email,
                      gender: User.gender,
                      birthday: User.birthday,
                      contactNumber: User.contactNumber,
                      firstPurchase: User.firstPurchase,
                      coupon: User.coupon,
                    },
                  });
                }
              });
            }
          });
        });
      } else {
        user.firstName = firstName;
        user.lastName = lastName;
        user.gender = gender;
        if (contactNumber != "") {
          user.contactNumber = contactNumber;
        }
        if (contactNumber === "") {
          user.contactNumber = null;
        }
        if (birthday != "") {
          user.birthday = birthday;
        }

        user.save((error, User) => {
          if (error) {
            return res.status(400).json({
              message: "Something went wrong!",
            });
          }
          if (User) {
            res.status(200).json({
              message: "Saved changes",
              user: {
                _id: User._id,
                firstName: User.firstName,
                lastName: User.lastName,
                username: User.username,
                email: User.email,
                gender: User.gender,
                birthday: User.birthday,
                contactNumber: User.contactNumber,
                firstPurchase: User.firstPurchase,
                coupon: User.coupon,
              },
            });
          }
        });
      }
    }
  });
};

//change password
exports.changePassword = (req, res) => {
  const _user = req.user;
  User.findOne({ _id: _user._id }).exec(async (error, user) => {
    if (error)
      return res.status(400).json({ message: "Something went wrong!" });
    if (user) {
      const { oldPassword, newPassword } = req.body;
      const isPassword = await user.authenticate(oldPassword);
      if (isPassword) {
        const new_password = await bcrypt.hash(newPassword, 10);
        user.hash_password = new_password;
        user.save((error, User) => {
          if (error)
            return res.status(400).json({ message: "Something went wrong!" });
          if (User) {
            return res.status(200).json({ message: "Password changed" });
          }
        });
      } else {
        return res
          .status(400)
          .json({ message: "Current password doesn't match!" });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong!" });
    }
  });
};

//recovery code
exports.generateCode = (req, res) => {
  const { email } = req.body;
  User.findOne({ email: email }).exec(async (error, user) => {
    if (error)
      return res.status(400).json({ message: "Something went wrong!" });
    if (user) {
      const emailToken = generateEmailToken(user._id, user.email);

      //mailing for recovery
      const url = `${serverRoot}/recover/${emailToken}`;

      const mailOptions = {
        from: "recover-account@test-domain.com",
        to: `${req.body.email}`,
        subject: "Recover Your Account",
        html: `Please click this link to reset your password: <a href="${url}">CONFIRMATION LINK</a>`,
      };

      transporter.sendMail(mailOptions, function (error) {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong!",
          });
        } else {
          return res.status(200).json({
            message: "A recovery link was sent to your email",
          });
        }
      });
    } else {
      return res.status(400).json({ message: "No matching account found!" });
    }
  });
};

//reset password
exports.resetPassword = (req, res) => {
  const { token, newPassword } = req.body;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const _email = decoded.role;
  User.findOne({ email: _email }).exec(async (error, user) => {
    if (error)
      return res.status(400).json({ message: "Something went wrong!" });
    if (user) {
      const new_password = await bcrypt.hash(newPassword, 10);
      user.hash_password = new_password;
      user.save((error, User) => {
        if (error)
          return res.status(400).json({ message: "Something went wrong!" });
        if (User) {
          return res.status(200).json({ message: "Password changed" });
        }
      });
    } else {
      return res.status(400).json({ message: "Something went wrong!" });
    }
  });
};
