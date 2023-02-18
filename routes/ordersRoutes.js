const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/ordersController");

router.post("/", ordersController.postOrders);

module.exports = router;
