const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zip_code: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },

  address_save_date: {
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

module.exports = mongoose.model("Billing", billingSchema);
