const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  message_date: {
    type: String,
    required: true,
  },
  createAt: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = mongoose.model("contact", contactSchema);
