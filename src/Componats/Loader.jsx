import React from 'react';
import { motion } from 'framer-motion';
import './Loader.css';

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
                    <svg width="100" height="250" viewBox="0 0 100 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Handle */}
                        <rect x="42" y="0" width="16" height="70" rx="4" fill="#5D4037" />
                        <rect x="42" y="10" width="16" height="50" rx="4" fill="url(#handleGradient)" />

                        {/* Blade */}
                        <path d="M20 70 H80 L85 240 Q85 250 50 250 Q15 250 15 240 L20 70 Z" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="2" />

                        {/* Spine (giving it 3D look) */}
                        <path d="M50 70 L50 250" stroke="#BCAAA4" strokeWidth="1" />

                        {/* Stickers/Details */}
                        <rect x="25" y="150" width="50" height="40" fill="#ff481fff" opacity="0.9" />
                        <text x="50" y="175" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold" style={{ fontFamily: 'Arial' }}>MJ</text>

                        <defs>
                            <linearGradient id="handleGradient" x1="50" y1="10" x2="50" y2="60" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#5D4037" />
                                <stop offset="0.5" stopColor="#8D6E63" />
                                <stop offset="1" stopColor="#5D4037" />
                            </linearGradient>
                        </defs>
                    </svg>
                </motion.div>

                {/* Text Container */}
                <div className="text-container">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                        className="brand-name"
                    >
                        MJ SPORTS
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
