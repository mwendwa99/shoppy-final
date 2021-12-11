import React from 'react';

import Routes from './app/navigation'
import { ListingsProvider } from './app/api/listings';
import { CartProvider } from './context/CartContext';


export default function App() {
  return (
    <ListingsProvider>
      <CartProvider>
        <Routes />
      </CartProvider>
    </ListingsProvider>
  );
}