const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const Product = require("../models/product");

exports.addListProduct = catchAsync(async (req, res) => {
  const { barcode, expires } = req.body;
  const user = await User.findById(req.params.id);
  const product = await Product.findOne({ barcode: barcode });
  if (product) {
    user.list.push({ product: product, expires: expires });
    await user.save();
    res.status(200).json({ product });
  } else {
    res.status(404).json({ status: "Product not found" });
  }
});

exports.removeListProduct = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  const productList = user.list.filter((prod) => prod._id != req.params.pid);
  user.list = productList;
  await user.save();
  res.status(200).json({ status: `Product ${req.params.pid} deleted!` });
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
