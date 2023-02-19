const Product = require("../models/productsModel");
const Order = require("../schemas/orderSChema");

exports.postOrders = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const product = await Product.findById({ _id: productId });
    const checkOrder = await Order.findOne({ productId });

    if (!checkOrder?.productId) {
      const order = new Order({
        product_name: product.title,
        customer_email: req.body.email,
        category: product.category,
        productId: product._id,
        image: product.thumbnail,
        price: parseFloat(req.body.price) * parseFloat(req.body.quantity),
        rate: parseFloat(req.body.price),
        brand: product.brand ? product.brand : "",
        department: product.department,
        quantity: parseInt(req.body.quantity),
        size: req.body.size ? req.body.size : "",
      });
      const saveOrder = await order.save();
      res.status(200).send({
        message: "Successful carted this product !!",
        order: saveOrder,
      });
    } else {
      res
        .status(200)
        .send({ message: "This product already have your cart !!" });
    }
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
