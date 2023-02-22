const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  trans_id: {
    type: String,
    required: true,
  },
  payment_date: {
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

module.exports = mongoose.model("Payment", paymentSchema);
