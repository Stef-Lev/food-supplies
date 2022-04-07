const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createUserToken = async (user, code, req, res) => {
  const token = signToken(user._id);

  let d = new Date();
  d.setDate(d.getDate() + 30);

  res.cookie("jwt_food_supplies_token", token, {
    expires: d,
    httpOnly: true,
  });

  user.password = undefined;
  res.status(code).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signupUser = async (req, res, next) => {
  try {
    let { username, password, passwordCheck, fullname } = req.body;
    if (!username || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    if (!fullname) fullname = username;

    const newUser = await User.create({
      fullname: fullname,
      username: username,
      password: password,
      passwordCheck: passwordCheck,
    });
    createUserToken(newUser, 201, req, res);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.loginUser = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ msg: "Please provide a username and password!" });
  }

  const user = await User.findOne({ username }).select("+password");
  let correctPassword;
  if (user) {
    correctPassword = await user.correctPassword(password, user.password);
  }
  if (!user || !correctPassword) {
    return res.status(401).send({ msg: "Incorrect username or password" });
  }
  createUserToken(user, 200, req, res);
});

exports.checkUser = catchAsync(async (req, res, next) => {
  let currentUser;
  if (req.cookies.jwt_food_supplies_token) {
    const token = req.cookies.jwt_food_supplies_token;
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    currentUser = await User.findById(decoded.id).populate("list.product");
  } else {
    currentUser = null;
  }
  res.status(200).send({ currentUser });
});

//log user out
exports.logoutUser = catchAsync(async (req, res) => {
  res.cookie("jwt_food_supplies_token", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).send("user is logged out");
});
