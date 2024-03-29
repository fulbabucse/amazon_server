// Import
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Controller
const { sendMessage, getMessages } = require("../controllers/adminController");

// JSON Web Token
router.get("/jwt", (req, res) => {
  const email = req.query.email;
  const token = jwt.sign({ email }, process.env.SECRET_TOKEN, {
    expiresIn: "1d",
  });
  res.status(200).send({ token });
});

router.post("/contact/send-message", sendMessage);
router.get("/contact/send-message", getMessages);

// Export router
module.exports = router;
