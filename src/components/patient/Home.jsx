// src/components/patient/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import '../../styles/patient/Home.css'; // Correct import statement for CSS

function Home() {
  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="header">
        {/* Searchbar */}
        <div className="searchbar-container">
          <input type="text" placeholder="Search..." className="searchbar" />
        </div>
        {/* Icons */}
        <div className="icons-container">
          <FontAwesomeIcon icon={faCalendarAlt} className="icon" /> {/* Booking Icon */}
          <FontAwesomeIcon icon={faUser} className="icon" />         {/* Profile Icon */}
        </div>
      </header>

      {/* Main Section with options */}
      <div className="main-section">
        <Link to="/w" className="option-card">
          <button className="option-button">Book a new appointment</button>
        </Link>
        <Link to="/uc" className="option-card"> {/* Updated Link */}
          <button className="option-button">Upcoming consultations</button>
        </Link>
        <div className="option-card">
          <button className="option-button">My Reports</button>
        </div>
        <div className="option-card">
          <button className="option-button">Emergency consultation</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
