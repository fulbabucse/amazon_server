const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/jwt", (req, res) => {
  const email = req.query.email;
  const token = jwt.sign({ email }, process.env.SECRET_TOKEN, {
    expiresIn: "1d",
  });
  res.status(200).send({ token });
});

router.post("/images", adminController.postImages);
router.get("/images", adminController.getImages);

module.exports = router;
