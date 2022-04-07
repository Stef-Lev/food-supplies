const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const Product = require("../models/product");

exports.addListProduct = catchAsync(async (req, res) => {
  const { barcode } = req.body;
  const expires = "2023-08-03T02:00:00Z";
  const user = await User.findById(req.params.id);
  const product = await Product.findOne({ barcode: barcode });
  console.log("user", user);
  user.list.push({ product: product, expires: expires });
  await user.save();
  res.status(200).json({ user });
});

exports.getPlayerData = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id).populate("list.product");
  res.status(200).json({ user });
});

// exports.addListProduct = catchAsync(async (req, res) => {
//   const { barcode } = req.body;
//   // const product = await Product.findOne({ barcode: `${barcode}` });
//   const product = await Product.findOne({ barcode: barcode });
//   res.status(200).json({ product });
// });
