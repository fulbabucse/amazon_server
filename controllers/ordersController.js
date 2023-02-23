// Import Models
const Product = require("../models/productsModel");
const Order = require("../schemas/orderSChema");
const Billing = require("../schemas/billingSchema");
const Payment = require("../schemas/paymentSchema");
const { v4: tranSectionId } = require("uuid");

// Example Route: http://localhost:5000/orders
exports.postOrders = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const product = await Product.findById({ _id: productId });
    const checkOrders = await Order.find({ customer_email: req.body.email });

    const data = {
      product_name: product.title,
      customer_email: req.body.email,
      category: product.category,
      productId,
      image: product.thumbnail,
      price: parseFloat(req.body.price) * parseFloat(req.body.quantity),
      rate: parseFloat(req.body.price),
      brand: product.brand ? product.brand : "",
      department: product.department,
      quantity: parseInt(req.body.quantity),
      size: req.body.size ? req.body.size : "",
    };

    if (checkOrders?.length > 0) {
      const haveAlready = checkOrders?.find(
        (product) => product?.productId === productId
      );
      if (haveAlready) {
        return res
          .status(404)
          .send({ message: "This product already have your cart !!" });
      }

      const order = new Order(data);
      const result = await order.save();
      return res
        .status(200)
        .send({ message: "Successfully carted One Item !!", result });
    }

    const order = new Order(data);
    const result = await order.save();
    return res
      .status(200)
      .send({ message: "Successfully carted One Item !!", result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Example Route: http://localhost:5000/orders/${email}
exports.getOrderByUser = async (req, res, next) => {
  try {
    const orders = await Order.find(
      { customer_email: req.params.email },
      { __v: 0 }
    );
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Example Route: http://localhost:5000/orders
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({});
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Example Route: http://localhost:5000/orders/update-quantity/${data.productId}
exports.updateQuantity = async (req, res, next) => {
  try {
    const order = await Order.findById({ _id: req.body.productId });
    const product = await Order.updateOne(
      { _id: req.params.id },
      {
        $set: {
          quantity: req.body.qty,
          price: order.rate * req.body.qty,
        },
      }
    );
    res.status(200).send({ message: "success", product });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Example Route: http://localhost:5000/orders/${id}
exports.deleteProductFromCart = async (req, res, next) => {
  try {
    const deleteOrder = await Order.deleteOne({ _id: req.params.id });
    res.status(200).send(deleteOrder);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Billing Address

// Example Route: http://localhost:5000/orders/billings
exports.postBillingAddress = async (req, res, next) => {
  try {
    const {
      name,
      email,
      country,
      street,
      city,
      zip_code,
      state_province_region,
      phone_number,
    } = req.body;

    const data = {
      name,
      email,
      country,
      street,
      state: state_province_region,
      city,
      zip_code,
      phone_number,
    };
    const haveAlready = await Billing.findOne({ email: req.body.email });

    if (haveAlready?.email) {
      if (haveAlready?.email === req.body.email) {
        return res.status(404).send({
          message:
            "Your address have already Save. If you changes current address then go to profile section !!",
        });
      }
    } else {
      const address = new Billing(data);
      const result = await address.save();
      return res.status(200).send({
        message: "Save Complete",
        result,
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Example Route: http://localhost:5000/orders/billings/${email}
exports.getBillingAddress = async (req, res, next) => {
  try {
    const addresses = await Billing.findOne({ email: req.params.email });
    res.status(200).send(addresses);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Example Route: http://localhost:5000/orders/after-purchase/${email}
exports.deleteOrders = async (req, res, next) => {
  try {
    const email = req.params.email;
    const trans_id = `crafty_tranID_${
      tranSectionId()?.split("-")?.slice(-1)[0]
    }`;

    const orders = await Order.find({ customer_email: email });
    const data = await Billing.findOne({ email });

    const subTotal = orders?.reduce((total, current) => {
      return (
        parseFloat(Math.ceil(total)) + parseFloat(Math.ceil(current.price))
      );
    }, 0);

    const totalPrice = data.country === "Bangladesh" ? 3 : 17;
    const price = parseFloat((subTotal + totalPrice).toFixed(2));
    const paymentData = {
      customer_name: data.name,
      email: data.email,
      price,
      products: orders,
      trans_id,
      name: data.name,
    };

    if (orders?.length > 0) {
      const payments = new Payment(paymentData);
      const result = await payments.save();
      res.status(200).send(result);
    }

    if (req.params.email) {
      await Order.deleteMany({
        customer_email: req.params.email,
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
