// Import
const User = require("../models/userModel");
const Contact = require("../schemas/contactSchema");

// Example Route: http://localhost:5000/users?email=${email}
exports.getAdmin = async (req, res, next) => {
  try {
    const adminRole = await User.findOne({ email: req.query.email });
    res.status(200).send({ isAdmin: adminRole.role === "admin" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Post Image Controller for Testing
exports.sendMessage = async (req, res, next) => {
  try {
    const body = req.body;
    const message_date = new Date().toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const data = { ...body, message_date };
    const contact = new Contact(data);
    const result = await contact.save();
    res.status(200).send({ success: true, result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Contact.find({}, { __v: 0 }).sort({ createAt: -1 });
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
