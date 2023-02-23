const express = require("express");

const router = express.Router();

const {
  getSingleUser,
  getUser,
  postUser,
} = require("../controllers/userController");
const authentication = require("../middleware/authentication");

router.put("/:email", postUser);
router.get("/", authentication, getUser);
router.get("/single/:email", authentication, getSingleUser);

module.exports = router;
