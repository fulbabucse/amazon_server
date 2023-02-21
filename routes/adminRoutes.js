const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const { getImages, postImages } = require("../controllers/adminController");

router.get("/jwt", (req, res) => {
  const email = req.query.email;
  const token = jwt.sign({ email }, process.env.SECRET_TOKEN, {
    expiresIn: "1d",
  });
  res.status(200).send({ token });
});

router.post("/images", postImages);
router.get("/images", getImages);

module.exports = router;
