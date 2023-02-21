const express = require("express");

const router = express.Router();

const {
  getSingleUser,
  getUser,
  postUser,
} = require("../controllers/userController");

router.put("/:email", postUser);
router.get("/", getUser);
router.get("/single/:email", getSingleUser);

module.exports = router;
