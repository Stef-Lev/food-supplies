const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");

exports.add = catchAsync(async (req, res) => {
  const player = new User(req.body);
  await player.save();
  res.json(player);
});
