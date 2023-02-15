const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

router.put("/:email", userController.postUser);
router.get("/", userController.getUser);
router.get("/single/:email", userController.getSingleUser);

module.exports = router;
