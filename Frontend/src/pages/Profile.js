import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { orderAPI, reservationAPI } from '../services/api';
import './Profile.css';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('orders');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ordersRes, reservationsRes] = await Promise.all([
                    orderAPI.getMyOrders(),
                    reservationAPI.getMyReservations()
                ]);
                setOrders(ordersRes.data);
                setReservations(reservationsRes.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getStatusColor = (status) => {
        const colors = {
            pending: 'warning',
            confirmed: 'success',
            preparing: 'primary',
            'out-for-delivery': 'primary',
            delivered: 'success',
            completed: 'success',
            cancelled: 'danger'
        };
        return colors[status] || 'primary';
    };

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="container">
                    <h1>My Profile</h1>
                    <p>Welcome back, {user?.name}!</p>
                </div>
            </div>

            <div className="profile-content section">
                <div className="container">
                    <div className="profile-grid">
                        <div className="profile-sidebar glass-card">
                            <div className="profile-info">
                                <div className="profile-avatar">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <h2>{user?.name}</h2>
                                <p>{user?.email}</p>
                            </div>
                            <div className="profile-stats">
                                <div className="stat">
                                    <span className="stat-value">{orders.length}</span>
                                    <span className="stat-label">Orders</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-value">{reservations.length}</span>
                                    <span className="stat-label">Reservations</span>
                                </div>
                            </div>
                        </div>

                        <div className="profile-main">
                            <div className="profile-tabs">
                                <button
                                    className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('orders')}
                                >
                                    Order History
                                </button>
                                <button
                                    className={`tab-btn ${activeTab === 'reservations' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('reservations')}
                                >
                                    Reservations
                                </button>
                            </div>

                            {loading ? (
                                <div className="loading">
                                    <div className="spinner"></div>
                                </div>
                            ) : (
                                <div className="tab-content">
                                    {activeTab === 'orders' && (
                                        <div className="orders-list">
                                            {orders.length > 0 ? (
                                                orders.map(order => (
                                                    <div key={order._id} className="order-card glass-card">
                                                        <div className="order-header">
                                                            <div>
                                                                <h3>Order #{order._id.slice(-6)}</h3>
                                                                <p className="order-date">
                                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                            <span className={`badge badge-${getStatusColor(order.status)}`}>
                                                                {order.status}
                                                            </span>
                                                        </div>
                                                        <div className="order-items">
                                                            {order.items.map((item, idx) => (
                                                                <div key={idx} className="order-item">
                                                                    <span>{item.name} x{item.quantity}</span>
                                                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="order-total">
                                                            <strong>Total:</strong>
                                                            <strong>${order.totalAmount.toFixed(2)}</strong>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="empty-state">
                                                    <p>No orders yet</p>
                                                    <a href="/menu" className="btn btn-primary">Browse Menu</a>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {activeTab === 'reservations' && (
                                        <div className="reservations-list">
                                            {reservations.length > 0 ? (
                                                reservations.map(reservation => (
                                                    <div key={reservation._id} className="reservation-card glass-card">
                                                        <div className="reservation-header">
                                                            <div>
                                                                <h3>{reservation.name}</h3>
                                                                <p>{reservation.email}</p>
                                                            </div>
                                                            <span className={`badge badge-${getStatusColor(reservation.status)}`}>
                                                                {reservation.status}
                                                            </span>
                                                        </div>
                                                        <div className="reservation-details">
                                                            <div className="detail-row">
                                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                                    <line x1="16" y1="2" x2="16" y2="6" />
                                                                    <line x1="8" y1="2" x2="8" y2="6" />
                                                                    <line x1="3" y1="10" x2="21" y2="10" />
                                                                </svg>
                                                                <span>{new Date(reservation.date).toLocaleDateString()}</span>
                                                            </div>
                                                            <div className="detail-row">
                                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                    <circle cx="12" cy="12" r="10" />
                                                                    <polyline points="12 6 12 12 16 14" />
                                                                </svg>
                                                                <span>{reservation.time}</span>
                                                            </div>
                                                            <div className="detail-row">
                                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                                    <circle cx="9" cy="7" r="4" />
                                                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                                                </svg>
                                                                <span>{reservation.guests} Guests</span>
                                                            </div>
                                                        </div>
                                                        {reservation.specialRequests && (
                                                            <div className="reservation-notes">
                                                                <strong>Special Requests:</strong>
                                                                <p>{reservation.specialRequests}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="empty-state">
                                                    <p>No reservations yet</p>
                                                    <a href="/reservations" className="btn btn-primary">Make a Reservation</a>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
