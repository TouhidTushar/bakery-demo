const DeliveryInfo = require("../models/deliveryInfo.model");

exports.getInfo = (req, res) => {
  const user = req.user;
  if (user) {
    DeliveryInfo.findOne({ user: user._id }).exec((error, deliveryInfo) => {
      if (error)
        return res.status(400).json({ message: "Something went wrong!" });
      if (deliveryInfo) {
        res.status(200).json({ deliveryInfo });
      }
    });
  } else {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};

exports.addNewInfo = (req, res) => {
  const _user = req.user;
  if (_user) {
    const { contact, address } = req.body.data;
    DeliveryInfo.findOne({ user: _user._id }).exec((error, deliveryInfo) => {
      if (error)
        return res.status(400).json({ message: "Something went wrong!" });
      if (deliveryInfo) {
        deliveryInfo.contact = contact;
        deliveryInfo.address = address;
        deliveryInfo.save((error, deliveryInfo) => {
          if (error)
            return res.status(400).json({ message: "Something went wrong!" });
          if (deliveryInfo) {
            return res.status(201).json({ deliveryInfo });
          }
        });
      } else {
        const _deliveryInfo = new DeliveryInfo({
          user: _user._id,
          contact,
          address,
        });
        _deliveryInfo.save((error, deliveryInfo) => {
          if (error)
            return res.status(400).json({ message: "Something went wrong!" });
          if (deliveryInfo) {
            return res.status(201).json({ deliveryInfo });
          }
        });
      }
    });
  }
};
