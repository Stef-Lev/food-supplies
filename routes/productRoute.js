const catchAsync = require("../utils/catchAsync");
const Product = require("../models/product");

exports.add = catchAsync(async (req, res) => {
  const player = new Product(req.body);
  await player.save();
  res.json(player);
});
