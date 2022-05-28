const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userData: {
    type: Object,
    required: true,
  },
  productData: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
