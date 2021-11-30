// context to hold items added to cart
import React, { createContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => {
    const context = React.useContext(CartContext);
    if (context === undefined) {
        throw new Error(`useCart must be used within a CartProvider`);
    }
    return context;
};

export { CartProvider, useCart };