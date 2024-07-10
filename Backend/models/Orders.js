const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  bookIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
      required: true,
    },
  ],
  totalAmount: {
    type: Number,
  },
});

module.exports = mongoose.model("Order", orderSchema);
