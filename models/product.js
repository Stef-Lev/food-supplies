const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: {
    type: String,
  },
  barcode: {
    type: Number,
  },
  imageUrl: {
    type: String,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
