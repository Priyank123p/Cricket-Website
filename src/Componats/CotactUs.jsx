import React from 'react';
import './ContactUs.css';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactUs = () => {
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
            <p>316, 317 Shivalik Satyamev, Ambli - Bopal Rd, Crossroad, Bopal, Ahmedabad, Gujarat 380058</p>
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
            <p>Mon – Sat : 10:00 AM – 8:00 PM</p>
          </div>
        </div>

        {/* 3. Contact Form Section */}
        <div className="contact-form-section">
          <div className="form-header">
            <h2>Get In Touch</h2>
            <p>Have a question about our products or need help choosing the right cricket bat?
              Fill out the form and our team will get back to you shortly.</p>
          </div>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input type="text" id="fullname" placeholder="Enter your full name" />
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
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="4" placeholder="How can we help you?"></textarea>
            </div>

            <button type="submit" className="submit-btn">Send Message</button>
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
    </div>
  );
};

export default ContactUs;