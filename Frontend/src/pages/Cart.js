import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useContext(CartContext);
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: '/cart' } });
            return;
        }
        navigate('/checkout');
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-page">
                <div className="container">
                    <div className="empty-cart">
                        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        <h2>Your cart is empty</h2>
                        <p>Add some delicious items to get started</p>
                        <a href="/menu" className="btn btn-primary">Browse Menu</a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <div className="cart-header">
                    <h1>Shopping Cart</h1>
                    <button onClick={clearCart} className="btn-clear">Clear Cart</button>
                </div>

                <div className="cart-content">
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item._id} className="cart-item glass-card">
                                <img src={item.image} alt={item.name} />
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <div className="cart-item-price">${item.price.toFixed(2)}</div>
                                </div>
                                <div className="cart-item-actions">
                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                                    </div>
                                    <div className="cart-item-total">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                    <button
                                        className="btn-remove"
                                        onClick={() => removeFromCart(item._id)}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary glass-card">
                        <h2>Order Summary</h2>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${getCartTotal().toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Delivery Fee</span>
                            <span>$5.00</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax (10%)</span>
                            <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
                        </div>
                        <div className="summary-divider"></div>
                        <div className="summary-row summary-total">
                            <span>Total</span>
                            <span>${(getCartTotal() + 5 + getCartTotal() * 0.1).toFixed(2)}</span>
                        </div>
                        <button className="btn btn-primary btn-checkout" onClick={handleCheckout}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
