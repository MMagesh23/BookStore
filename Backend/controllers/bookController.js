const Book = require("../models/Books");

const createBook = async (req, res) => {
  try {
    const { bookName, authorName, price } = req.body;

    const newBook = new Book({
      bookName,
      authorName,
      price,
    });
    await newBook.save();
    return res.status(201).json(newBook);
  } catch (err) {
    console.error("Error during book creation:", err);
    return res.status(500).json({ error: err.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found!" });
    }
    return res.status(200).json(book);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { bookName, authorName, price } = req.body;
    const updatedBook = { bookName, authorName, price };
    const response = await Book.findByIdAndUpdate(id, updatedBook, {
      new: true,
    });
    if (!response) {
      return res.status(404).json({ message: "Book not found!" });
    }
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found!" });
    }
    return res.status(200).json({ message: "Book deleted successfully!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
