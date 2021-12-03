import React from 'react';
import { StyleSheet, View } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
