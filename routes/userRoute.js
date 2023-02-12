const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

router.put("/:email", userController.postUser);
router.get("/", userController.getUser);

module.exports = router;
