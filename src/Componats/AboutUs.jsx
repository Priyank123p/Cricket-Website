import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Hammer, Star, ShieldCheck, Zap } from 'lucide-react';
import aboutImage from '../Img/Branding-IMG/Branding-IMG2.jpeg';

import topBannerImage from '../Img/AboutUs-IMG/Top-Banar-IMG.avif';

const AboutUs = () => {
  const { scrollY } = useScroll();
  const yRange = useTransform(scrollY, [0, 500], [0, 200]);
  const navigate = useNavigate();

  return (
    <>
      {/* 1. Top Banner */}
      <div className="about-hero">
        <motion.div
          className="hero-bg"
          style={{ y: yRange, scale: 1.1 }}
        >
          {/* Placeholder for Cricket Pitch / Bat Close-up */}
          <img src={topBannerImage} alt="Cricket Pitch" />
          <div className="hero-overlay"></div>
        </motion.div>

        <div className="hero-content text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            About
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            The Perfect Balance of Power & Precision
          </motion.p>
          <motion.button
            className="hero-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/product')}
          >
            Explore Collection
            <div className="shine"></div>
          </motion.button>
        </div>
      </div>

      {/* 2. Who We Are Section */}
      <section className="section who-we-are">
        <div className="container">
          <div className="row align-items-center">
            <motion.div
              className="col-md-6"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="img-wrapper">
                <img src={aboutImage} alt="Bat Workshop" className="img-fluid rounded shadow-lg" />
              </div>
            </motion.div>
            <motion.div
              className="col-md-6 content-col"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2>Who We Are</h2>
              <p>
                We are more than just a cricket bat store — we are a trusted destination for cricketers who demand quality and performance. Rooted in the passion for the game, we bring together the finest cricket bat brands under one roof to help players choose the right weapon for their game.
              </p>
              <p>From premium English Willow bats to reliable practice options, every product we offer is carefully selected to meet professional standards. Our focus is simple: providing genuine brands, the right guidance, and bats that deliver confidence at the crease.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Our Craftsmanship (Timeline/Steps) */}
      <section className="section craftsmanship">
        <div className="container">
          <motion.h2
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Craftsmanship
          </motion.h2>

          <div className="cards-grid">
            {[
              { icon: <Star size={40} />, title: "Premium Willow", desc: "Grade 1+ English Willow sourced directly." },
              { icon: <Hammer size={40} />, title: "Handcrafted", desc: "Shaped by master artisans with decades of experience." },
              { icon: <Zap size={40} />, title: "Perfect Balance", desc: "Engineered for an ultra-light pickup and massive ping." },
              { icon: <ShieldCheck size={40} />, title: "Player Tested", desc: "Every bat is tested for durability and stroke." }
            ].map((item, index) => (
              <motion.div
                className="craft-card"
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ y: -10, boxShadow: "0px 10px 30px rgba(0,0,0,0.2)" }}
              >
                <motion.div
                  className="icon-box"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  {item.icon}
                </motion.div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="section why-choose-us">
        <div className="container">
          <motion.h2
            className="text-center section-title-white"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Choose Us?
          </motion.h2>

          <div className="features-grid">
            {[
              "Match-Ready Bats",
              "Custom Bat Options",
              "Trusted by Cricketers",
              "Affordable Pricing"
            ].map((feature, idx) => (
              <motion.div
                className="feature-item"
                key={idx}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="check-icon">✔</div>
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Mission & Vision */}
      <section className="section mission-vision">
        <div className="container-fluid p-0">
          <div className="row g-0">
            <motion.div
              className="col-md-6 mission-box"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3>Our Mission</h3>
              <p>To empower every cricketer, from the gully to the stadium, with the finest equipment that enhances their game and confidence.</p>
            </motion.div>
            <motion.div
              className="col-md-6 vision-box"
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3>Our Vision</h3>
              <p>To be the world's most trusted cricket brand, known for innovation, quality, and a deep respect for the spirit of the game.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Call To Action (CTA) */}
      <section className="section cta-section">
        <motion.div
          className="cta-content"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Dominate the Game?</h2>
          <p>Get your hands on the finest willow today.</p>
          <motion.button
            className="cta-btn"
            animate={{
              boxShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 20px rgba(255,255,255,0.5)", "0px 0px 0px rgba(255,255,255,0)"]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            whileHover={{ scale: 1.1, backgroundImage: "linear-gradient(45deg, #ff6b6b, #f06595)" }}
            onClick={() => navigate('/product')}
          >
            Explore Our Bats
          </motion.button>
        </motion.div>
      </section>
    </>
  )
}

export default AboutUs