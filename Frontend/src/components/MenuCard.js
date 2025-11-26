import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './MenuCard.css';

const MenuCard = ({ item }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="menu-card glass-card">
            <div className="menu-card-image">
                <img src={item.image} alt={item.name} />
                <div className="menu-card-badges">
                    {item.isVegetarian && <span className="badge badge-success">Veg</span>}
                    {item.isSpicy && <span className="badge badge-danger">Spicy</span>}
                </div>
            </div>
            <div className="menu-card-content">
                <div className="menu-card-header">
                    <h3>{item.name}</h3>
                    <div className="menu-card-rating">
                        <span className="star">★</span>
                        <span>{item.rating}</span>
                    </div>
                </div>
                <p className="menu-card-description">{item.description}</p>
                <div className="menu-card-footer">
                    <div className="menu-card-price">
                        <span className="price-label">Price</span>
                        <span className="price-value">${item.price.toFixed(2)}</span>
                    </div>
                    <button
                        className="btn btn-primary btn-add-cart"
                        onClick={() => addToCart(item)}
                        disabled={!item.isAvailable}
                    >
                        {item.isAvailable ? 'Add to Cart' : 'Unavailable'}
                    </button>
                </div>
                {item.prepTime && (
                    <div className="menu-card-prep-time">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{item.prepTime} mins</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuCard;
