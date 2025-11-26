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
            const existingItem = prevItems.find(i => i._id === item._id && i.selectedSize === item.selectedSize);

            if (existingItem) {
                return prevItems.map(i =>
                    (i._id === item._id && i.selectedSize === item.selectedSize)
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }

            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId, selectedSize) => {
        setCartItems(prevItems => prevItems.filter(item => !(item._id === itemId && item.selectedSize === selectedSize)));
    };

    const updateQuantity = (itemId, selectedSize, quantity) => {
        if (quantity <= 0) {
            removeFromCart(itemId, selectedSize);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                (item._id === itemId && item.selectedSize === selectedSize) ? { ...item, quantity } : item
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
