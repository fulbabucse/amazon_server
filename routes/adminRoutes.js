const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/jwt", (req, res) => {
  const email = req.query.email;
  const token = jwt.sign({ email }, process.env.SECRET_TOKEN, {
    expiresIn: "1d",
  });
  res.status(200).send({ token });
});

module.exports = router;

/*
exports.getToken = (req, res) => {
  const email = req.query.email;
  const token = jwt.sign({ email }, process.env.SECRET_TOKEN, {
    expiresIn: "1d",
  });
  res.send({ accessToken: token });
};
*/
