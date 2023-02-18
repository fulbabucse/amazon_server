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
        price: parseFloat(req.body.price) * parseInt(req.body.quantity),
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
