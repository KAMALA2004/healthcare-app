// src/components/common/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Optional: For styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/doctor/dashboard">Doctor Dashboard</Link></li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default NavBar;
