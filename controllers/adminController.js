const User = require("../models/userModel");
const Image = require("../models/ImageModel");

exports.getAdmin = async (req, res, next) => {
  try {
    const adminRole = await User.findOne({ email: req.query.email });
    res.status(200).send({ isAdmin: adminRole.role === "admin" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.postImages = async (req, res, next) => {
  try {
    if (req.body.length > 0) {
      const images = new Image({ image: req.body });
      const result = await images.save();
      res.status(200).send({ success: true, image: result });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getImages = async (req, res, next) => {
  try {
    const image = await Image.find({});
    res.status(200).send({ success: true, image });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
