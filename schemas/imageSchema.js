const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  image: {
    type: Array,
    required: true,
  },
});

module.exports = imageSchema;
