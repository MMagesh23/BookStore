import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/login.css";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://book-store-sever.vercel.app/login",
        form
      );
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!");
      navigate("/books");
    } catch (error) {
      toast.error("Login failed.");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <label>Username</label>

          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleInputChange}
            required
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            required
          />

          <input type="submit" value="Submit" />
        </form>
        <p>
          I don't have a account? <NavLink to="/register">Register</NavLink>
        </p>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
