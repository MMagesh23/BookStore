import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "../styles/register.css";

const Register = () => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://book-store-sever.vercel.app/register", {
        username: form.username,
        password: form.password,
      });

      navigate("/login");
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Failed to register.");
    }
  };

  return (
    <>
      <h1>Register</h1>
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <label>Username</label>

          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleInputChange}
            placeholder="sam"
            required
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            placeholder="******"
            required
          />

          <input type="submit" value="Submit" />
        </form>
        <p>
          Alraedy I have a account? <NavLink to="/login">Login</NavLink>
        </p>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
