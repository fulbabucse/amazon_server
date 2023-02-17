const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  join_date: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = userSchema;
