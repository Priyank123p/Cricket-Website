import React from 'react';
import './HomeSectionBaner.css';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import SportsHeroImg from '../../Img/HomeSectionBaner-IMG/Sports Hero-IMG.jpg';
import AthleteActionImg from '../../Img/HomeSectionBaner-IMG/Athlete Action-IMG.jpg';
import CricketBallImg from '../../Img/Courser/pngimg.com - cricket_PNG95.png';

const HomeSectionBaner = () => {
    return (
        <div className="home-banner-section">
            <div className="container">
                <div className="home-banner-container">
                    <div className="home-banner-content">
                        <div className="banner-badge">
                            <img src={CricketBallImg} alt="Cricket Ball" className="rotating-ball" />
                            PREMIUM SPORTS GEAR
                        </div>

                        <h1 className="banner-title">
                            ELEVATE YOUR <br />
                            <span className="accent-text">GAME</span>
                        </h1>
                        <span className="accent-number">JM SPORTS COLLECTION</span>

                        <p className="banner-description">
                            Experience the future of sports performance. Precision engineered
                            gear designed for champions. Unleash your potential with our
                            state-of-the-art collection.
                        </p>

                        <div className="banner-cta-group">
                            <Link to="/product">
                                <button className="cta-btn primary-btn">
                                    Shop Collection
                                </button>
                            </Link>
                        </div>

                        <div className="banner-stats">
                            <div className="stat-item">
                                <h4>120+</h4>
                                <p>Premium Products</p>
                            </div>
                            <div className="stat-item">
                                <h4>5k+</h4>
                                <p>Happy Customers</p>
                            </div>
                        </div>
                    </div>

                    <div className="home-banner-visuals">
                        <div className="visual-card main-card">
                            <img src={SportsHeroImg} alt="Sports Hero" className="hero-img" />
                        </div>

                        <div className="visual-card floating-card card-1">
                            <img src={AthleteActionImg} alt="Athlete Action" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeSectionBaner;