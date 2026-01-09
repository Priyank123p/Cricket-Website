import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send } from 'lucide-react';
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
            <h2>RK Sports</h2>
          </div>
          <p className="brand-desc">
            Elevating your game with premium cricket gear. Designed for champions, crafted for perfection. Experience the difference with RK Sports.
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
            {['Home', 'Product', 'About Us', 'Contact Us'].map((item) => (
              <li key={item} className="footer-link-item">
                <a href="#" className="footer-link">{item}</a>
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
            <div className="adress-icon-wrapper">
              <MapPin size={20} />
            </div>
            <span>317 Shivalik Satymev,Ambli-Bopal Rd,Crossroad,Bopal,Ahmedabad,Gujarat 380058</span>
          </div>
          <div className="contact-item">
            <div className="contact-icon-wrapper">
              <Phone size={20} />
            </div>
            <span>+91 81404 00109</span>
          </div>
          <div className="contact-item">
            <div className="contact-icon-wrapper">
              <Mail size={20} />
            </div>
            <span>support@rksports.com</span>
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
          &copy; {new Date().getFullYear()} RK Sports. All rights reserved.
        </p>
        <div className="social-links">
          {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
            <a key={index} href="#" className="social-icon">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;