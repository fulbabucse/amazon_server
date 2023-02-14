const Product = require("../models/productsModel");

// products?start=${start}&end=${end}&page=${page}&size=${size}&rating=${rating}&stock=${stock}

/*
   const products = await Product.find({
    price: { $gt: start, $lt: end },
    rating: { $gt: rating },
  })
    .skip(page * size)
    .limit(size)
    .sort({ createAt: -1 });

    http://localhost:5000/products?start=10&end=50&page=1&size=5&rating=4
*/

exports.getProducts = async (req, res, next) => {
  try {
    const start = parseInt(req.query.start);
    const end = parseInt(req.query.end);
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const rating = parseInt(req.query.rating);

    const products = await Product.find({
      price: { $gt: start, $lt: end },
      rating: { $gt: rating },
    })
      .skip(page * size)
      .limit(size);
    const count = await Product.estimatedDocumentCount();
    res.status(200).send({ products, count });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
