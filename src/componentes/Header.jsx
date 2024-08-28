import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="/path/to/your/logo.png" alt="Logo" />
        </Link>
      </div>
      <nav className="nav">
        <ul className="nav-links">
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#solutions">Solutions</a></li>
          <li><a href="#community">Community</a></li>
          <li><a href="#resources">Resources</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <Link to="/login">
          <button className="sign-in">Sign In</button>
        </Link>
        <Link to="/contact">
          <button className="register">Register</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
