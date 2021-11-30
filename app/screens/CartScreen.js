import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';

import { useCart } from '../../context/CartContext'

const CartScreen = ({ navigation }) => {
    const { cartItems, removeFromCart, getTotalPrice } = useCart();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setCart(cartItems);
    }, [cart]);

    // delete function
    const deleteItem = (item) => {
        removeFromCart(item);
        // navigate to home
        navigation.navigate('Home');
    }

    console.log('catitem', cart);
    console.log('totalprice', getTotalPrice());

    return (
        <View style={styles.container}>
            {
                cart.map(item => (
                    <View key={item.id} style={styles.item}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.subTitle}>{item.subTitle}</Text>
                        <Text style={styles.price}>${item.price}</Text>
                        <Text style={styles.quantity}>{item.quantity}</Text>
                        <Text style={styles.total}>${item.total}</Text>
                        <Text style={styles.delete} onPress={() => deleteItem(item)}>Delete</Text>
                    </View>
                ))
            }
        </View>

    )
}

export default CartScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 40,
        paddingBottom: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    subTitle: {
        fontSize: 16,
        color: '#666',
    },
    price: {
        fontSize: 16,
        color: '#333',
    },
    quantity: {
        fontSize: 16,
        color: '#333',
    },
    total: {
        fontSize: 16,
        color: '#333',
    },
    delete: {
        fontSize: 16,
        color: '#333',
        textDecorationLine: 'underline',
    }
});
