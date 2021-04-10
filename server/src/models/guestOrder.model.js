const mongoose = require("mongoose");

const guestOrderSchema = new mongoose.Schema(
  {
    orderSerial: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    orderType: {
      type: String,
      enum: ["general", "custom"],
      default: "general",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    totalAmount: {
      type: Number,
      default: 0,
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    userFiles: [{ img: { type: String } }],
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "cancelled", "refund"],
      default: "pending",
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["COD", "PRE"],
      required: true,
    },
    orderStatus: [
      {
        type: {
          type: String,
          enum: ["ordered", "confirmed", "packed", "shipped", "delivered"],
          default: "ordered",
        },
        date: {
          type: Date,
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("GuestOrder", guestOrderSchema);
