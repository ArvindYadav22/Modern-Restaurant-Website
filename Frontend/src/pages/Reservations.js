import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { reservationAPI } from '../services/api';
import './Reservations.css';

const Reservations = () => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        specialRequests: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            navigate('/login', { state: { from: '/reservations' } });
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await reservationAPI.createReservation(formData);
            setMessage({ type: 'success', text: 'Reservation created successfully!' });
            setFormData({
                ...formData,
                date: '',
                time: '',
                guests: 2,
                specialRequests: ''
            });
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to create reservation'
            });
        } finally {
            setLoading(false);
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="reservations-page">
            <div className="reservations-header">
                <div className="container">
                    <h1>Reserve Your Table</h1>
                    <p>Experience fine dining at its best</p>
                </div>
            </div>

            <div className="reservations-content section">
                <div className="container">
                    <div className="reservations-grid">
                        <div className="reservation-info">
                            <h2>Why Reserve With Us?</h2>
                            <div className="info-cards">
                                <div className="info-card glass-card">
                                    <div className="info-icon">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                                        </svg>
                                    </div>
                                    <h3>Premium Seating</h3>
                                    <p>Choose from our carefully curated seating arrangements for the perfect ambiance</p>
                                </div>
                                <div className="info-card glass-card">
                                    <div className="info-icon">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </div>
                                    <h3>Personalized Service</h3>
                                    <p>Our staff ensures every detail of your dining experience is perfect</p>
                                </div>
                                <div className="info-card glass-card">
                                    <div className="info-icon">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                    </div>
                                    <h3>Flexible Timing</h3>
                                    <p>Open 7 days a week with extended hours for your convenience</p>
                                </div>
                            </div>
                        </div>

                        <div className="reservation-form-container glass-card">
                            <h2>Make a Reservation</h2>

                            {message.text && (
                                <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
                                    {message.text}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="reservation-form">
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="date">Date</label>
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            min={today}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="time">Time</label>
                                        <input
                                            type="time"
                                            id="time"
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="guests">Number of Guests</label>
                                    <select
                                        id="guests"
                                        name="guests"
                                        value={formData.guests}
                                        onChange={handleChange}
                                        required
                                    >
                                        {[...Array(20)].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Guest' : 'Guests'}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="specialRequests">Special Requests</label>
                                    <textarea
                                        id="specialRequests"
                                        name="specialRequests"
                                        value={formData.specialRequests}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Any dietary restrictions, celebrations, or special requirements..."
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Processing...' : 'Confirm Reservation'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reservations;
