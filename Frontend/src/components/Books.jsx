import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/book.css";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ bookName: "", authorName: "", price: "" });
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "https://book-store-sever.vercel.app/books",
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    setBooks(response.data);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (editingBook) {
        await axios.put(
          `https://book-store-sever.vercel.app/books/${editingBook._id}`,
          form,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        toast.success("Book updated successfully!");
        setEditingBook(null);
      } else {
        await axios.post("https://book-store-sever.vercel.app/books", form, {
          headers: { authorization: `Bearer ${token}` },
        });
        toast.success("Book added successfully!");
      }
      fetchBooks();
      setForm({ bookName: "", authorName: "", price: "" });
    } catch (error) {
      toast.error("Failed to save book.");
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setForm({
      bookName: book.bookName,
      authorName: book.authorName,
      price: book.price,
    });
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://book-store-sever.vercel.app/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Book deleted successfully!");
      fetchBooks();
    } catch (error) {
      toast.error("Failed to delete book.");
    }
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
    setForm({ bookName: "", authorName: "", price: "" });
  };

  return (
    <div>
      <h2>Books</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="bookName"
          placeholder="Enter Book Name"
          value={form.bookName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="authorName"
          placeholder="Enter Author Name"
          value={form.authorName}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Enter Book Price"
          value={form.price}
          onChange={handleInputChange}
          required
        />
        <button type="submit">
          {editingBook ? "Update Book" : "Add Book"}
        </button>
        {editingBook && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </form>
      <table>
        <thead>
          <tr>
            <th>Book</th>
            <th>Author</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.bookName}</td>
              <td>{book.authorName}</td>
              <td>{book.price}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(book)}>
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default Books;
