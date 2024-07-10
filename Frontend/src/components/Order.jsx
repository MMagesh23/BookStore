import "../styles/order.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Order = () => {
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchBooks();
    fetchOrders();
  }, []);

  const fetchBooks = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5000/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(response.data);
    } catch (error) {
      toast.error("Failed to fetch books.");
    }
  };

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5000/order", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const ordersData = response.data.map((order) => ({
        ...order,
        totalAmount: calculateOrderTotal(order.bookIds),
      }));
      setOrders(ordersData);
    } catch (error) {
      toast.error("Failed to fetch orders.");
    }
  };

  const handleBookSelect = (e) => {
    const options = e.target.options;
    let selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(JSON.parse(options[i].value));
      }
    }
    setSelectedBooks(selected);
  };

  const calculateTotal = () => {
    const total = selectedBooks.reduce((acc, book) => acc + book.price, 0);
    return total + total * 0.18;
  };

  const calculateOrderTotal = (bookIds) => {
    const total = bookIds.reduce((acc, book) => acc + book.price, 0);
    return total + total * 0.18;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/order",
        { bookIds: selectedBooks.map((book) => book._id) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Order placed successfully!");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to place order.");
    }
  };

  return (
    <div className="order-container">
      <h2>Order</h2>
      <form onSubmit={handleSubmit}>
        <select multiple onChange={handleBookSelect}>
          {books.map((book) => (
            <option key={book._id} value={JSON.stringify(book)}>
              {book.bookName} - ₹{book.price}
            </option>
          ))}
        </select>
        <div>Total Amount: ₹{calculateTotal().toFixed(2)}</div>
        <button type="submit">Place Order</button>
      </form>
      <h3>Orders</h3>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Books</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.bookIds.map((book) => book.bookName).join(", ")}</td>
              <td>
                ₹
                {order.totalAmount
                  ? order.totalAmount.toFixed(2)
                  : "Not available"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default Order;
