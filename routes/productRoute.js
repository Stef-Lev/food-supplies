const catchAsync = require("../utils/catchAsync");
const Product = require("../models/product");

exports.add = catchAsync(async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(200).json(product);
});
