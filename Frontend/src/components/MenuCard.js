import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './MenuCard.css';

const MenuCard = React.memo(({ item }) => {
    const { addToCart } = useContext(CartContext);
    const [selectedSize, setSelectedSize] = React.useState(item.sizes && item.sizes.length > 0 ? item.sizes[0] : null);
    const [currentPrice, setCurrentPrice] = React.useState(item.price);

    React.useEffect(() => {
        if (selectedSize) {
            setCurrentPrice(selectedSize.price);
        } else {
            setCurrentPrice(item.price);
        }
    }, [selectedSize, item.price]);

    const handleAddToCart = () => {
        const itemToAdd = {
            ...item,
            price: currentPrice,
            selectedSize: selectedSize ? selectedSize.name : item.servingSize
        };
        addToCart(itemToAdd);
    };

    return (
        <div className="menu-card glass-card">
            <div className="menu-card-image">
                <img src={item.image} alt={item.name} loading="lazy" />
                <div className="veg-indicator">
                    {item.isVegetarian ? (
                        <div className="veg-dot-container"><div className="veg-dot green"></div></div>
                    ) : (
                        <div className="veg-dot-container"><div className="veg-dot red"></div></div>
                    )}
                </div>
                <div className="menu-card-badges">
                    {item.isSpicy && <span className="badge badge-danger">🌶️ Spicy</span>}
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

                {/* Size Selection */}
                {item.sizes && item.sizes.length > 0 ? (
                    <div className="menu-card-sizes">
                        {item.sizes.map((size, index) => (
                            <button
                                key={index}
                                className={`size-btn ${selectedSize && selectedSize.name === size.name ? 'active' : ''}`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size.name}
                            </button>
                        ))}
                    </div>
                ) : (
                    item.servingSize && (
                        <div className="menu-card-serving">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 3h18v18H3z" />
                                <path d="M9 9h6v6H9z" />
                            </svg>
                            <span>{item.servingSize}</span>
                        </div>
                    )
                )}

                <div className="menu-card-footer">
                    <div className="menu-card-price">
                        <span className="price-value">₹{currentPrice}</span>
                        {item.prepTime && (
                            <span className="prep-time-small">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                {item.prepTime} mins
                            </span>
                        )}
                    </div>
                    <button
                        className="btn btn-primary btn-add-cart"
                        onClick={handleAddToCart}
                        disabled={!item.isAvailable}
                    >
                        {item.isAvailable ? 'Add to Cart' : 'Unavailable'}
                    </button>
                </div>
            </div>
        </div>
    );
});

MenuCard.displayName = 'MenuCard';

export default MenuCard;
