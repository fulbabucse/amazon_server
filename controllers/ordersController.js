const Product = require("../models/productsModel");
const Order = require("../schemas/orderSChema");
const Billing = require("../schemas/billingSchema");

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

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({});
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

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

exports.deleteProductFromCart = async (req, res, next) => {
  try {
    const deleteOrder = await Order.deleteOne({ _id: req.params.id });
    res.status(200).send(deleteOrder);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Billing Address

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

exports.getBillingAddress = async (req, res, next) => {
  try {
    const addresses = await Billing.findOne({ email: req.params.email });
    res.status(200).send(addresses);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
