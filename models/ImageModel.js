const mongoose = require("mongoose");

const imageSchema = require("../schemas/imageSchema");
const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
