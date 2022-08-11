const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  products: {
    type: Array,
    required: true,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Cart", CartSchema);
