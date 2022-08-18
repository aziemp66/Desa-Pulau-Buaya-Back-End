const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  products: {
    type: Array,
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
