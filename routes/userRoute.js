const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const Product = require("../models/product");

exports.addListProduct = catchAsync(async (req, res) => {
  const { barcode } = req.body;
  const user = await User.findById(req.params.id);
  const product = await Product.find({ barcode: barcode });
  user.list.push({ product, expires });
  await user.save();
  res.status(200).json({ user });
});
