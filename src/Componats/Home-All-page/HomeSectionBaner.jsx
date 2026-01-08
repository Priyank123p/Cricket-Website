import React from 'react';
import './HomeSectionBaner.css';
import { Link } from 'react-router-dom';

import SportsHeroImg from '../../Img/HomeSectionBaner-IMG/IMG-20250722-WA0001.jpg';
import AthleteActionImg from '../../Img/HomeSectionBaner-IMG/Athlete Action-IMG.jpg';

const HomeSectionBaner = () => {
    return (
        <>
            <div className="container">
                <section className="home-banner-section">
                    <div className="home-banner-container">
                        <div className="home-banner-content">
                            <div className="banner-badge">
                                <span className="pulse-dot"></span>
                                PREMIUM SPORTS GEAR
                            </div>

                            <h1 className="banner-title">
                                ELEVATE YOUR <br />
                                <span className="accent-text" data-text="GAME">GAME</span>
                                <span className="accent-number">RK / SPORTS</span>
                            </h1>

                            <p className="banner-description">
                                Experience the future of sports performance. Precision engineered
                                gear designed for champions. Unleash your potential with our
                                state-of-the-art collection.
                            </p>

                            <div className="banner-cta-group">
                                <Link to="/product">
                                    <button className="cta-btn primary-btn">
                                        <span>Shop Collection</span>
                                        <div className="btn-glow"></div>
                                    </button>
                                </Link>
                                <button className="cta-btn secondary-btn">
                                    <span>Watch Trailer</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                    </svg>
                                </button>
                            </div>

                            <div className="banner-stats">
                                <div className="stat-item">
                                    <h4>50k+</h4>
                                    <p>Happy Clients</p>
                                </div>
                                <div className="stat-separator"></div>
                                <div className="stat-item">
                                    <h4>120+</h4>
                                    <p>Premium Products</p>
                                </div>
                            </div>
                        </div>

                        <div className="home-banner-visuals">
                            <div className="visual-card main-card">
                                <img src={SportsHeroImg} alt="Sports Hero" className="hero-img" />
                                <div className="card-overlay"></div>
                            </div>

                            <div className="visual-card floating-card card-1">
                                <img src={AthleteActionImg} alt="Athlete Action" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default HomeSectionBaner;