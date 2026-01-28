import React, { useState, useEffect } from 'react';
import './ContactUs.css';
import { MapPin } from 'lucide-react';
import OrderSuccess from './OrderSuccess';
import InquirySuccess from './InquirySuccess';
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from '@emailjs/browser';

import { useNavigate } from 'react-router-dom';
import { useCart } from './Context/CartContext';

const ContactUs = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showInquirySuccess, setShowInquirySuccess] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

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

  const handleInquiryClose = () => {
    setShowInquirySuccess(false);
    navigate('/');
  };

  const onCaptchaChange = (value) => {
    console.log("Captcha value:", value);
    setCaptchaValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("Please complete the reCAPTCHA.");
      return;
    }

    // Get form values
    const form = e.target;

    // Debugging: Log what values we are getting
    console.log("Form Elements:", form.elements);

    const fullName = form.elements.fullname?.value || form.querySelector('#fullname')?.value || '';
    const address = form.elements.address?.value || form.querySelector('#address')?.value || '';
    const email = form.elements.email?.value || form.querySelector('#email')?.value || '';
    const mobile = form.elements.mobile?.value || form.querySelector('#mobile')?.value || '';
    const baseMessage = form.elements.message?.value || form.querySelector('#message')?.value || '';

    // Create a detailed message including customer info to ensure it appears even if template fields are missing
    const detailedMessage = `
Customer Details:
Name: ${fullName}
Mobile: ${mobile}
Address: ${address}
Email: ${email}

Message:
${baseMessage}
    `.trim();

    const templateParams = {
      user_name: fullName,
      user_address: address,
      user_email: email,
      user_mobile: mobile,

      // Common aliases to catch various template configurations
      to_name: "Admin",
      from_name: fullName,
      customer_name: fullName,
      customer_address: address,
      customer_email: email,
      customer_contact: mobile,
      reply_to: email,

      // "Shotgun" approach: Add simple keys in case the template uses them directly
      name: fullName,
      fullname: fullName,
      address: address,
      mobile: mobile,
      phone: mobile,
      email: email,
      contact: mobile,

      product_details: productName,
      message: detailedMessage,
    };

    console.log("Sending Email with params:", templateParams);

    let templateId = "template_efiv68d";
    let finalParams = { ...templateParams };

    if (cartItems.length > 0) {
      templateId = "template_ooxz8vh";

      const orderId = "ORD-" + Date.now();

      const orders = cartItems.map(item => {
        // CLEAN PRICE: Remove '₹', commas, and spaces to get raw number
        const rawPriceString = (item.price || "0").toString().replace(/[^0-9.]/g, "");
        const price = parseFloat(rawPriceString) || 0;

        return {
          name: item.name,
          image_url: Array.isArray(item.image) ? item.image[0] : item.image,
          units: item.quantity || 1,
          price: price.toFixed(2)
        };
      });

      const totalCost = orders.reduce((acc, item) => acc + (parseFloat(item.price) * item.units), 0);

      finalParams = {
        ...finalParams,
        order_id: orderId,
        orders: orders,
        cost: {
          shipping: "0.00",
          tax: "0.00",
          total: totalCost.toFixed(2)
        }
      };
    }

    console.log("Sending Email with params:", finalParams);

    emailjs
      .send(
        "service_45z1p3h",
        templateId,
        finalParams,
        {
          publicKey: "CBqeI2xNDjnmcLHqY",
        }
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          if (cartItems.length > 0) {
            setShowSuccess(true);
          } else {
            setShowInquirySuccess(true);
          }
        },
        (err) => {
          console.log("FAILED...", err);
          alert(`Failed to send email. Error: ${JSON.stringify(err)}`);
        }
      );
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We’re here to help you choose the right gear.</p>
      </div>

      <div className="contact-content">
        <div className="contact-form-section">
          <div className="form-header">
            <h2>Get In Touch</h2>
            <p>Have a question about our products or need help choosing the right cricket bat?
              Fill out the form and our team will get back to you shortly.</p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input type="text" id="fullname" name="fullname" placeholder="Enter your full name" required />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" placeholder="Enter your full address" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile Number</label>
              <input type="tel" id="mobile" name="mobile" placeholder="Enter your mobile number" required />
            </div>

            <div className="form-group">
              <label htmlFor="productName">Product Details</label>
              <textarea
                id="productName"
                name="productName"
                placeholder="Product details will appear here..."
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                rows="4"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="4" placeholder="How can we help you?"></textarea>
            </div>

            <div className="form-group recaptcha-wrapper">
              {/* Using Google Test Key to fix 'Invalid Domain' error on localhost/mobile IP. 
                  Replace with your real key and add your domain/IP to reCAPTCHA admin console before deploying. */}
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onCaptchaChange}
              />
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>

        <div className="contact-left-side">
          <div className="contact-info">
            <div className="info-card">
              <div className="icon-box">
                <MapPin size={24} />
              </div>
              <h3>Address</h3>
              <p>318 Shivalik Satyamev, Ambli - Bopal Rd, Crossroad, Bopal, Ahmedabad, Gujarat 380058</p>
            </div>
          </div>

          <div className="map-section">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4647.287771136115!2d72.47341387619626!3d23.02630267917125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9bab78c5abd3%3A0x3e5121e968b906de!2sJM%20Sports!5e1!3m2!1sen!2sin!4v1769493862858!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      <OrderSuccess
        isOpen={showSuccess}
        onClose={handleSuccessClose}
      />

      <InquirySuccess
        isOpen={showInquirySuccess}
        onClose={handleInquiryClose}
      />
    </div>
  );
};

export default ContactUs;
