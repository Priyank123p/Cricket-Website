import React from 'react';
import './Home.css';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Trophy, Zap, ShieldCheck } from 'lucide-react';
import CricketerImg from '../Img/Cricketer-IMG/Branding.png';
import Features from './Home-All-page/Features';
import NewArivals from './Home-All-page/NewArivals';
import HomeSectionBaner from './Home-All-page/HomeSectionBaner';
import { Link } from 'react-router-dom';

const Home = () => {
  // Mouse Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const bgX = useTransform(mouseX, [-0.5, 0.5], ["10px", "-10px"]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], ["10px", "-10px"]);

  const imgX = useTransform(mouseX, [-0.5, 0.5], ["-15px", "15px"]);
  const imgY = useTransform(mouseY, [-0.5, 0.5], ["-15px", "15px"]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const xPos = (clientX / innerWidth) - 0.5;
    const yPos = (clientY / innerHeight) - 0.5;

    x.set(xPos);
    y.set(yPos);
  };

  const textVariants = {
    hidden: { opacity: 0, y: -150 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 150 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, ease: "easeOut", delay: 0.3 }
    }
  };

  const bgTextVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  return (
    <>
      <div className="home-container" onMouseMove={handleMouseMove}>

        <div className="home-content">
          <motion.div
            className="text-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >

            <motion.h1 className="main-headline" variants={textVariants}>
              UNLEASH <br />
              <span className="highlight-text">THE POWER</span>
            </motion.h1>

            <motion.p
              className="description-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Experience the next generation of cricket equipment.
              Used by legends, designed for champions. elevate your game today.
            </motion.p>

            <motion.div
              className="stats-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="stat-item">
                <span className="stat-number">5.0+</span>
                <span className="stat-label">Willow Grade</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">25%</span>
                <span className="stat-label">More Power</span>
              </div>
            </motion.div>

            <motion.div className="cta-group">
              <Link to="/product">
                <button className="cta-btn primary-btn">
                  <span>Shop Collection</span>
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="image-section-v2"
            style={{ x: imgX, y: imgY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img src={CricketerImg} alt="Rishab Pant" className="hero-model-img" />
          </motion.div>
        </div>
      </div>
      <Features />
      <NewArivals />
      <HomeSectionBaner />
    </>
  );
}

export default Home;