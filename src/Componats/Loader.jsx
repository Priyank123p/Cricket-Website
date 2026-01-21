import React from 'react';
import { motion } from 'framer-motion';
import './Loader.css';
import CricketerImg from '../Img/Cricketer-IMG/Loading-Bat.png';
const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader-content">
                {/* Bat Container */}
                <motion.div
                    className="bat-container"
                    initial={{ rotate: -45, x: -50, opacity: 0 }}
                    animate={{ rotate: 0, x: 0, opacity: 1 }}
                    transition={{
                        duration: 1.5,
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 50
                    }}
                >
                    {/* Simple SVG Cricket Bat */}
                        <img src={CricketerImg} alt="loading bat" />
                </motion.div>

                {/* Text Container */}
                <div className="text-container">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                        className="brand-name"
                    >
                        JM SPORTS
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                        className="tagline"
                    >
                        Crafting Performance...
                    </motion.p>
                </div>
            </div>
        </div>
    );
};

export default Loader;
