const shortid = require("shortid");
const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const UserOrder = require("../models/userOrder.model");
const GuestOrder = require("../models/guestOrder.model");

//get user orders
exports.getUserOrders = (req, res) => {
  const _user = req.user;
  if (_user) {
    UserOrder.find({ user: _user._id })
      .sort({ createdAt: -1 })
      .populate("items.product")
      .exec((error, _userOrders) => {
        if (error)
          return res.status(400).json({ message: "Something went wrong!" });
        if (_userOrders) {
          res.status(200).json({ _userOrders });
        }
      });
  } else {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};

//get order by Id
exports.getOrder = (req, res) => {
  const orderID = req.body.data;
  GuestOrder.findOne({ orderSerial: orderID })
    .populate("items.product")
    .exec((error, _guestOrder) => {
      if (error)
        return res.status(400).json({ message: "Something went wrong!" });
      if (_guestOrder) {
        res.status(200).json({ _guestOrder });
      } else {
        res
          .status(400)
          .json({ message: "No matching order found in database" });
      }
    });
};

//guest general order
exports.placeOrder = (req, res) => {
  const {
    fullName,
    contact,
    address,
    note,
    totalAmount,
    paymentType,
    items,
  } = req.body.data;

  const _guestOrder = new GuestOrder({
    orderSerial: shortid.generate(),
    fullName,
    contact,
    address,
    note,
    totalAmount,
    paymentType,
    items,
    orderStatus: [
      {
        type: "ordered",
        date: new Date(),
        isCompleted: true,
      },
      {
        type: "confirmed",
        isCompleted: false,
      },
      {
        type: "packed",
        isCompleted: false,
      },
      {
        type: "shipped",
        isCompleted: false,
      },
      {
        type: "delivered",
        isCompleted: false,
      },
    ],
  });

  _guestOrder.save((error, _guestOrder) => {
    if (error)
      return res.status(400).json({ message: "Something went wrong!" });
    if (_guestOrder) {
      res.status(201).json({ _guestOrder });
    }
  });
};

//guest custom order
exports.placeCustomOrder = (req, res) => {
  const { orderType, fullName, contact, address, note, paymentType } = req.body;
  let userFiles = [];

  if (req.files.length > 0) {
    userFiles = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const _guestOrder = new GuestOrder({
    orderSerial: shortid.generate(),
    orderType,
    fullName,
    contact,
    address,
    note,
    paymentType,
    userFiles,
    orderStatus: [
      {
        type: "ordered",
        date: new Date(),
        isCompleted: true,
      },
      {
        type: "confirmed",
        isCompleted: false,
      },
      {
        type: "packed",
        isCompleted: false,
      },
      {
        type: "shipped",
        isCompleted: false,
      },
      {
        type: "delivered",
        isCompleted: false,
      },
    ],
  });

  _guestOrder.save((error, _guestOrder) => {
    if (error)
      return res.status(400).json({ message: "Something went wrong!" });
    if (_guestOrder) {
      res.status(201).json({ _guestOrder });
    }
  });
};

//user general order
exports.placeUserOrder = (req, res) => {
  const _user = req.user;
  if (_user) {
    const {
      fullName,
      contact,
      address,
      note,
      totalAmount,
      paymentType,
      items,
    } = req.body.data;

    const _userOrder = new UserOrder({
      user: _user._id,
      orderSerial: shortid.generate(),
      fullName,
      contact,
      address,
      note,
      totalAmount,
      paymentType,
      items,
      orderStatus: [
        {
          type: "ordered",
          date: new Date(),
          isCompleted: true,
        },
        {
          type: "confirmed",
          isCompleted: false,
        },
        {
          type: "packed",
          isCompleted: false,
        },
        {
          type: "shipped",
          isCompleted: false,
        },
        {
          type: "delivered",
          isCompleted: false,
        },
      ],
    });

    _userOrder.save((error, _userOrder) => {
      if (error)
        return res.status(400).json({ message: "Something went wrong!" });
      if (_userOrder) {
        res.status(201).json({ _userOrder });
      }
    });
  } else {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};

//user custom order
exports.placeUserCustomOrder = (req, res) => {
  const _user = req.user;
  if (_user) {
    const {
      orderType,
      fullName,
      contact,
      address,
      note,
      paymentType,
    } = req.body;

    let userFiles = [];

    if (req.files.length > 0) {
      userFiles = req.files.map((file) => {
        return { img: file.filename };
      });
    }

    const _userOrder = new UserOrder({
      user: _user._id,
      orderSerial: shortid.generate(),
      orderType,
      fullName,
      contact,
      address,
      note,
      paymentType,
      userFiles,
      orderStatus: [
        {
          type: "ordered",
          date: new Date(),
          isCompleted: true,
        },
        {
          type: "confirmed",
          isCompleted: false,
        },
        {
          type: "packed",
          isCompleted: false,
        },
        {
          type: "shipped",
          isCompleted: false,
        },
        {
          type: "delivered",
          isCompleted: false,
        },
      ],
    });

    _userOrder.save((error, _userOrder) => {
      if (error)
        return res.status(400).json({ message: "Something went wrong!" });
      if (_userOrder) {
        res.status(201).json({ _userOrder });
      }
    });
  } else {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};
