const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  products: {
    type: Array,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  totalQuantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Cart", CartSchema);
