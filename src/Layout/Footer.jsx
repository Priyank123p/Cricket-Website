import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, Phone, MapPin, Send } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="premium-footer">
      <div className="footer-gradient-border" />

      <div className="footer-content">
        {/* Brand Column */}
        <motion.div
          className="footer-col-brand"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="footer-brand">
            <h2>JM Sports</h2>
          </div>
          <p className="brand-desc">
            Elevating your game with premium cricket gear. Designed for champions, crafted for perfection. Experience the difference with JM Sports.
          </p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn">
              <Send size={18} />
            </button>
          </form>
        </motion.div>

        {/* Quick Links Column */}
        <motion.div
          className="footer-col-links"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            {[
              { name: 'Home', path: '/' },
              { name: 'Product', path: '/product' },
              { name: 'About Us', path: '/about' },
              { name: 'Contact Us', path: '/contact' }
            ].map((item) => (
              <li key={item.name} className="footer-link-item">
                <Link to={item.path} className="footer-link">{item.name}</Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Column */}
        <motion.div
          className="footer-col-contact"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="footer-heading">Get in Touch</h3>
          <div className="contact-item">
            <div className="address-icon-wrapper">
              <MapPin size={20} />
            </div>
            <span>318 Shivalik Satymev,Ambli-Bopal Rd,Crossroad,Bopal,Ahmedabad,Gujarat 380058</span>
          </div>
          <div className="contact-item">
            <div className="contact-icon-wrapper">
              <Phone size={20} />
            </div>
            <span>+91 97141 00109</span>
          </div>
          <div className="contact-item">
            <div className="contact-icon-wrapper">
              <Mail size={20} />
            </div>
            <span>jmsports196@gmail.com</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        className="footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="copyright">
          &copy; {new Date().getFullYear()} JM Sports. All rights reserved.
        </p>
        <div className="social-links">
          <a href="https://www.facebook.com/profile.php?id=61586163163701" target="_blank" rel="noopener noreferrer" className="social-icon">
            <Facebook size={18} />
          </a>
          <a href="https://www.instagram.com/jmsports196/" target="_blank" rel="noopener noreferrer" className="social-icon">
            <Instagram size={18} />
          </a>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;