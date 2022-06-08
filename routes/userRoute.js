const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const Product = require("../models/product");

exports.addListProduct = catchAsync(async (req, res) => {
  const { barcode, expires } = req.body;
  const user = await User.findById(req.params.uid).populate({
    path: "lists.items.product",
    model: "Product",
  });
  const product = await Product.findOne({ barcode: barcode });
  if (product) {
    const productList = user.lists.find(
      (item) => item._id.toJSON() === req.params.listid
    );
    productList.items.push({ product: product, expires: expires });
    await user.save();
    res.status(200).json({ product, user });
  } else {
    res.status(404).json({ status: "Product not found" });
  }
});

exports.addList = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.uid).populate({
    path: "lists.items.product",
    model: "Product",
  });
  user.lists.push(req.body);
  await user.save();
  res.status(200).json({ list: req.body });
});

exports.removeListProduct = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.uid).populate({
    path: "lists.items.product",
    model: "Product",
  });
  const foundList = user.lists.find((item) => item._id == req.params.listid);

  const filteredProducts = foundList.items.filter(
    (prod) => prod._id != req.params.pid
  );
  foundList.items = filteredProducts;
  await user.save();
  res.status(200).json({ status: `Product ${req.params.pid} deleted!` });
});

exports.removeList = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.uid).populate({
    path: "lists.items.product",
    model: "Product",
  });
  const filteredList = user.lists.filter(
    (list) => list._id != req.params.listid
  );
  user.lists = filteredList;
  await user.save();
  res.status(200).json({ status: `List ${req.params.listid} deleted!` });
});

exports.getPlayerData = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.uid).populate({
    path: "lists.items.product",
    model: "Product",
  });
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(401).json({ error: 401, status: "User not found" });
  }
});

exports.getListData = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.uid).populate({
    path: "lists.items.product",
    model: "Product",
  });
  const obj = {};
  const foundList = user.lists.find((list) => list._id == req.params.listid);
  foundList.items.forEach((item) => {
    const id = item.product._id.toJSON();
    if (obj[id]) {
      obj[id] += 1;
    } else {
      obj[id] = 1;
    }
  });
  let data = [];
  const entries = Object.entries(obj);

  for (let entry of entries) {
    const product = await Product.findById(entry[0]);
    data.push({ product, quantity: entry[1] });
  }
  if (foundList) {
    res.status(200).json({ list: foundList, quantities: data });
  } else {
    res.status(404).json({ error: 404, status: "List not found" });
  }
});

exports.updateList = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.uid).populate({
    path: "lists.items.product",
    model: "Product",
  });
  const foundList = user.lists.find((list) => list._id == req.params.listid);
  foundList.listName = req.body.listName;
  await user.save();

  if (foundList) {
    res.status(200).json({ list: foundList });
  } else {
    res.status(404).json({ error: 404, status: "List not found" });
  }
});

exports.getUserLists = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.uid).populate({
    path: "lists.items.product",
    model: "Product",
  });
  if (user) {
    res.status(200).json({ lists: user.lists });
  } else {
    res.status(404).json({ error: 404, status: "Lists not found" });
  }
});
