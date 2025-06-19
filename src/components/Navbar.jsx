// src/components/Navbar.jsx
import React from 'react';
import './Hero.css';

function Navbar() {
  return (
    <header className="navbar">
      <nav>
        <ul className="nav-links">
          <li>Home</li>
          <li>About</li>
          <li><img src="/images/logo.png" alt="Logo" className="nav-logo" /></li>
          <li>Menu</li>
          <li>Support</li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
