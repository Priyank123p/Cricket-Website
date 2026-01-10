import React, { useState, useEffect } from 'react';
import './ContactUs.css';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import OrderSuccess from './OrderSuccess';

import { useNavigate } from 'react-router-dom';
import { useCart } from './Context/CartContext';

const ContactUs = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (cartItems.length > 0) {
      const itemsList = cartItems.map(item => `• ${item.name} (Qty: ${item.quantity || 1})`).join('\n');
      setProductName(itemsList);
    }
  }, [cartItems]);

  const handleSuccessClose = () => {
    setShowSuccess(false);
    clearCart();
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length > 0) {
      setShowSuccess(true);
      // Alert removed, modal handles it
    } else {
      alert("Message Sent! We will get back to you shortly.");
      navigate('/');
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We’re here to help you choose the right gear.</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <div className="icon-box">
              <MapPin size={24} />
            </div>
            <h3>Address</h3>
            <p>318 Shivalik Satyamev, Ambli - Bopal Rd, Crossroad, Bopal, Ahmedabad, Gujarat 380058</p>
          </div>

          <div className="info-card">
            <div className="icon-box">
              <Phone size={24} />
            </div>
            <h3>Phone</h3>
            <p>+91 81404 00109</p>
          </div>

          <div className="info-card">
            <div className="icon-box">
              <Mail size={24} />
            </div>
            <h3>Email</h3>
            <p>support@rksports.com</p>
          </div>

          <div className="info-card">
            <div className="icon-box">
              <Clock size={24} />
            </div>
            <h3>Working Hours</h3>
            <p>Mon – Fri : 09:00 AM – 07:00 PM</p>
          </div>
        </div>

        {/* 3. Contact Form Section */}
        <div className="contact-form-section">
          <div className="form-header">
            <h2>Get In Touch</h2>
            <p>Have a question about our products or need help choosing the right cricket bat?
              Fill out the form and our team will get back to you shortly.</p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input type="text" id="fullname" placeholder="Enter your full name" />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" placeholder="Enter your full address" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile Number</label>
              <input type="tel" id="mobile" placeholder="Enter your mobile number" />
            </div>

            <div className="form-group">
              <label htmlFor="productName">Product Details</label>
              <textarea
                id="productName"
                placeholder="Product details will appear here..."
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                rows="4"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="4" placeholder="How can we help you?"></textarea>
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </div>

      {/* 4. Google Map Section */}
      <div className="map-section">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1864.0330610898131!2d72.4761554981418!3d23.02635388768557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9bfcf0e77423%3A0xddfa4b92626472c4!2sNewstar%20Infotech!5e1!3m2!1sen!2sin!4v1767953763907!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      <OrderSuccess
        isOpen={showSuccess}
        onClose={handleSuccessClose}
      />
    </div>
  );
};

export default ContactUs;