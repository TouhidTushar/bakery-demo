const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
// const ipfilter = require("express-ipfilter").IpFilter;
const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");
const { serverRoot } = require("../../urlConfig");
require("dotenv").config();

//email config
const adminEmailToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const auth = {
  auth: {
    api_key: process.env.MAIL_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};

let transporter = nodemailer.createTransport(mailGun(auth));

//admin signup
exports.signup = (req, res) => {
  // whitelist IP
  var trustedIps = [process.env.adminIP];
  var requestIP = req.connection.remoteAddress;
  if (trustedIps.indexOf(requestIP) >= 0) {
    User.findOne({ email: req.body.email }).exec((error, user) => {
      if (user)
        return res.status(400).json({
          message: "Admin already registered",
        });
      User.estimatedDocumentCount(async (err, count) => {
        if (err) return res.status(400).json({ error });
        let role = "admin";
        if (count === 0) {
          role = "super-admin";
        }
        const { firstName, lastName, email, password } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const _user = new User({
          firstName,
          lastName,
          email,
          hash_password,
          username: shortid.generate(),
          role,
        });
        _user.save((error, user) => {
          if (error) {
            return res.status(400).json({
              message: "Something went wrong",
            });
          }
          if (user) {
            const emailToken = adminEmailToken(user._id);

            //mailing for confirmation
            // const url = `http://localhost:5000/confirmation/${emailToken}`;
            const url = `${serverRoot}/confirmation/${emailToken}`;

            const mailOptions = {
              from: "no-reply@verifymail.com",
              to: `${req.body.email}`,
              subject: "Confirm Your Email",
              html: `Please click this link to confirm your email: <a href="${url}">CONFIRMATION LINK</a>`,
            };

            transporter.sendMail(mailOptions, function (error) {
              if (error) {
                console.log(error);
              } else {
                console.log("confirmation mail sent to");
                console.log(req.body.email);
              }
            });

            return res.status(201).json({
              message:
                "Admin account creation successful! Please confirm your email to continue.",
            });
          }
        });
      });
    });
  } else {
    return res.status(401).json({
      message: "Access denied",
    });
  }
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (
        isPassword &&
        (user.role === "admin" || user.role === "super-admin")
      ) {
        if (!user.confirmed) {
          res.status(400).json({
            message:
              "Your email is not confirmed! Please confirm your email to continue.",
          });
        } else {
          const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );
          const { _id, firstName, lastName, email } = user;
          res.cookie("token", token, { expiresIn: "1d" });
          res.status(200).json({
            message: "Login successful!",
            token,
            user: { _id, firstName, lastName, email },
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

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successful!",
  });
};

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
