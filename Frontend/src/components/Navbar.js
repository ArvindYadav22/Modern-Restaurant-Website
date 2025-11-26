import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const { getCartCount } = useContext(CartContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo">
                    <h1>Gourmet Haven</h1>
                </Link>

                <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
                    <Link to="/" className="navbar-link" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/menu" className="navbar-link" onClick={() => setIsOpen(false)}>Menu</Link>
                    <Link to="/reservations" className="navbar-link" onClick={() => setIsOpen(false)}>Reservations</Link>

                    {user ? (
                        <>
                            <Link to="/profile" className="navbar-link" onClick={() => setIsOpen(false)}>Profile</Link>
                            <button onClick={handleLogout} className="navbar-link navbar-btn">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="navbar-link" onClick={() => setIsOpen(false)}>Login</Link>
                            <Link to="/register" className="navbar-link" onClick={() => setIsOpen(false)}>Register</Link>
                        </>
                    )}

                    <Link to="/cart" className="navbar-cart" onClick={() => setIsOpen(false)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        {getCartCount() > 0 && <span className="cart-badge">{getCartCount()}</span>}
                    </Link>
                </div>

                <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
