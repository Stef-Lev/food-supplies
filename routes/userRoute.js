const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");

exports.add = catchAsync(async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});
