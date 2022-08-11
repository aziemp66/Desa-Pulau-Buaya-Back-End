const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: false,
  },
  tags: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
