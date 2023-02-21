const Product = require("../models/productsModel");
const Order = require("../schemas/orderSChema");

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
