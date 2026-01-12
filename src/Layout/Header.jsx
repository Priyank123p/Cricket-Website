import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Phone, Mail } from 'lucide-react';
import './Header.css';
import logo from '../Img/Logo/Main-Logo.png';
import { useCart } from '../Componats/Context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();

  const totalItems = cartItems.length;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container container">
        <div className="logo-container">
          <NavLink to="/">
            <img src={logo} alt="Cricket Logo" className="logo-img" />
          </NavLink>
        </div>

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
          <div className="contact-info-desktop">
            <div className="contact-item">
              <Phone size={16} />
              <span>+91 98765 43210</span>
            </div>
            <div className="contact-item">
              <Mail size={16} />
              <span>info@mjsports.com</span>
            </div>
          </div>


          <NavLink to="/cart" className="cart-icon-container">
            <ShoppingCart size={24} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
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