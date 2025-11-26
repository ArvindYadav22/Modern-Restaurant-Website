import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-overlay"></div>
            <div className="hero-content container">
                <h1 className="hero-title fade-in">Experience Culinary Excellence</h1>
                <p className="hero-subtitle slide-in">Where every dish tells a story of passion and perfection</p>
                <div className="hero-buttons">
                    <Link to="/menu" className="btn btn-primary">Explore Menu</Link>
                    <Link to="/reservations" className="btn btn-secondary">Reserve Table</Link>
                </div>
            </div>
            <div className="hero-scroll">
                <span>Scroll</span>
                <div className="scroll-line"></div>
            </div>
        </section>
    );
};

export default Hero;
