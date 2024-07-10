const Order = require("../models/Orders");
const Book = require("../models/Books");

const createOrder = async (req, res) => {
  try {
    const { bookIds, totalAmount } = req.body;

    for (const id of bookIds) {
      const book = await Book.findById(id);
      if (!book) {
        return res
          .status(404)
          .json({ message: `Book with id ${id} not found!` });
      }
    }

    const newOrder = new Order({
      bookIds,
      totalAmount,
    });
    await newOrder.save();
    return res.status(201).json(newOrder);
  } catch (err) {
    console.error("Error during order creation:", err);
    return res.status(500).json({ error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("bookIds");
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { createOrder, getAllOrders };
