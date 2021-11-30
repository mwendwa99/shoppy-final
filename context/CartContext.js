// context to hold items added to cart
import React, { createContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
    };

    const removeFromCart = (item) => {
        setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
        console.log("item deleted!")
    };

    // get total price of items in cart
    const getTotalPrice = () => {
        return cartItems.reduce((acc, item) => acc + item.price, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, removeFromCart, getTotalPrice, addToCart }}>
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