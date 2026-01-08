import React from 'react';
import './Home.css';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Trophy, Zap, ShieldCheck } from 'lucide-react';
import CricketerImg from '../Img/Cricketer-IMG/pngimg.com - cricket_PNG92.png';
import Features from './Home-All-page/Features';
import NewArivals from './Home-All-page/NewArivals';

const Home = () => {
  // Mouse Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for mouse movement
  const springConfig = { damping: 25, stiffness: 100 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  // Transform values for parallax effect
  // Background text moves opposite to mouse (slower)
  const bgX = useTransform(mouseX, [-0.5, 0.5], ["15px", "-15px"]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], ["15px", "-15px"]);

  // Image moves with mouse (slightly faster)
  const imgX = useTransform(mouseX, [-0.5, 0.5], ["-25px", "25px"]);
  const imgY = useTransform(mouseY, [-0.5, 0.5], ["-25px", "25px"]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const xPos = (clientX / innerWidth) - 0.5;
    const yPos = (clientY / innerHeight) - 0.5;

    x.set(xPos);
    y.set(yPos);
  };

  // Animation variants
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
      <div className="home-container container" onMouseMove={handleMouseMove}>
        <motion.div
          className="branded-text-bg"
          variants={bgTextVariants}
          initial="hidden"
          whileInView="visible"
          style={{ x: bgX, y: bgY }}
          viewport={{ once: true }}
        >
          PREMIUM <br /> CRICKET GEAR
        </motion.div>

        <div className="home-content">
          <motion.div
            className="text-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 variants={textVariants}>RK Sports</motion.h3>
            <motion.h1 variants={textVariants} transition={{ delay: 0.2 }}>COLLECTION</motion.h1>

            <motion.div
              className="usp-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <ul className="usp-list">
                <li>
                  <span className="usp-icon"><Trophy size={22} color="#ff6309ff" /></span>
                  English Willow & Kashmir Willow Bats
                </li>
                <li>
                  <span className="usp-icon"><Zap size={22} color="#ff6309ff" /></span>
                  Perfect Balance & Maximum Power
                </li>
                <li>
                  <span className="usp-icon"><ShieldCheck size={22} color="#ff6309ff" /></span>
                  Tested Quality • Trusted by Players
                </li>
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            className="image-section"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            style={{ x: imgX, y: imgY }}
            viewport={{ once: true }}
          >
            <img src={CricketerImg} alt="Cricketer" className="cricketer-img" />
          </motion.div>
        </div>
      </div>
      <Features />
      <NewArivals />
    </>
  );
}

export default Home;