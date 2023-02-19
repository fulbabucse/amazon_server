const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  customer_email: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: false,
  },
  department: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: false,
  },
  order_date: {
    type: String,
    default: new Date().toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  },
  createAt: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Order", orderSchema);
