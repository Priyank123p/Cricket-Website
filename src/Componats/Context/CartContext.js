import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            // Check if item already exists
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                // Optionally increase quantity, for now just ignore or alert
                // We'll just return previous items if we don't want duplicates, 
                // or we could add a quantity field. Let's add quantity.
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            // Assuming price is a string like "₹12,999", remove non-numeric chars
            const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
            return total + (price * (item.quantity || 1));
        }, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
