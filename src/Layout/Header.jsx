import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import './Header.css';
import logo from '../Img/Main-Logo.PNG';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Left: Logo */}
        <div className="logo-container">
          <NavLink to="/">
            <img src={logo} alt="Cricket Logo" className="logo-img" />
          </NavLink>
        </div>

        {/* Center: Navigation Links */}
        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/product" className="nav-link" onClick={() => setIsMenuOpen(false)}>Product</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact Us</NavLink>
            </li>
          </ul>
        </nav>

        {/* Right: Search & Cart */}
        <div className="header-right">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <Search className="search-icon" size={20} />
          </div>

          <NavLink to="/cart" className="cart-icon-container">
            <ShoppingCart size={24} />
          </NavLink>

          {/* Mobile Menu Toggle */}
          <div className="mobile-menu-icon" onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;