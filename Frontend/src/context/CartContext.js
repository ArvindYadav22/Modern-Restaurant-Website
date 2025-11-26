import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i._id === item._id);

            if (existingItem) {
                return prevItems.map(i =>
                    i._id === item._id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }

            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
    };

    const updateQuantity = (itemId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(itemId);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item._id === itemId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
