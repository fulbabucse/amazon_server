const Order = require("../schemas/orderSChema");
const Billing = require("../schemas/billingSchema");
const Payment = require("../schemas/paymentSchema");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Example Route: http://localhost:5000/payments/create-checkout-session
exports.createPaymentSession = async (req, res, next) => {
  try {
    const { email } = req.body;
    const orders = await Order.find({ customer_email: email });
    const billingAddress = await Billing.findOne({ email });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: orders?.map((order) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: order?.product_name,
            },
            unit_amount: Math.ceil(order?.rate) * 100,
          },
          quantity: order?.quantity,
        };
      }),
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount:
                billingAddress?.country === "Bangladesh" ? 4 * 100 : 24 * 100,
              currency: "usd",
            },
            display_name: "Crafty Air Corporation",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 1 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      customer_email: email,
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      billing_address_collection: {},
    });

    res.status(200).send({ url: session.url });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getOrdersByEmail = async (req, res, next) => {
  try {
    const { email } = req.decoded;
    const orders = await Payment.find({ email });
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
