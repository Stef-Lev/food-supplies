const catchAsync = require("../utils/catchAsync");
const Product = require("../models/product");

exports.add = catchAsync(async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(500).json({ error: 500, status: "Could not create product" });
  }
});
