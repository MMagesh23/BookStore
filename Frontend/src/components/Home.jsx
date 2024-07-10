import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <nav className="home-nav">
        <NavLink to="/login" className="home-link">
          Login
        </NavLink>
        <NavLink to="/register" className="home-link">
          Register
        </NavLink>
      </nav>
    </div>
  );
};

export default Home;
