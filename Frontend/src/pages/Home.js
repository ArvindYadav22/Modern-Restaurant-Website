import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import MenuCard from '../components/MenuCard';
import { menuAPI } from '../services/api';
import './Home.css';

const Home = () => {
    const [featuredItems, setFeaturedItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedItems = async () => {
            try {
                const { data } = await menuAPI.getAllItems({ category: 'specials' });
                setFeaturedItems(data.slice(0, 3));
            } catch (error) {
                console.error('Error fetching featured items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedItems();
    }, []);

    return (
        <div className="home">
            <Hero />

            <section className="section about-section">
                <div className="container">
                    <div className="about-content">
                        <div className="about-text">
                            <h2>Welcome to Gourmet Haven</h2>
                            <p>
                                Indulge in an unforgettable dining experience where culinary artistry meets exceptional service.
                                Our master chefs craft each dish with passion, using only the finest locally-sourced ingredients
                                to create flavors that will tantalize your taste buds.
                            </p>
                            <p>
                                From intimate dinners to grand celebrations, Gourmet Haven provides the perfect ambiance
                                for every occasion. Join us and discover why we're the city's premier destination for fine dining.
                            </p>
                        </div>
                        <div className="about-stats">
                            <div className="stat-card glass-card">
                                <h3>15+</h3>
                                <p>Years of Excellence</p>
                            </div>
                            <div className="stat-card glass-card">
                                <h3>50+</h3>
                                <p>Signature Dishes</p>
                            </div>
                            <div className="stat-card glass-card">
                                <h3>10k+</h3>
                                <p>Happy Customers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section featured-section">
                <div className="container">
                    <div className="section-title">
                        <h2>Chef's Specials</h2>
                        <p>Discover our handpicked selection of extraordinary dishes</p>
                    </div>

                    {loading ? (
                        <div className="loading">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <div className="grid grid-3">
                            {featuredItems.length > 0 ? (
                                featuredItems.map(item => (
                                    <MenuCard key={item._id} item={item} />
                                ))
                            ) : (
                                <p className="no-items">No featured items available at the moment.</p>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <section className="section cta-section">
                <div className="container">
                    <div className="cta-content glass-card">
                        <h2>Ready to Experience Excellence?</h2>
                        <p>Reserve your table today and embark on a culinary journey like no other</p>
                        <a href="/reservations" className="btn btn-primary">Make a Reservation</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
