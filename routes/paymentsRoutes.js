const express = require("express");
const router = express.Router();

const { createPaymentSession } = require("../controllers/paymentController");
const authentication = require("../middleware/authentication");

router.post("/create-checkout-session", authentication, createPaymentSession);

module.exports = router;
