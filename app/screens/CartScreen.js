import React, { useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet, View, RefreshControl } from 'react-native';
import { Button } from 'react-native-elements';

import { useCart } from '../../context/CartContext';
import AppText from '../components/AppText';
import Icon from '../components/Icon';
import ListItem from '../components/ListItem';
import ListItemSeparator from '../components/ListItemSeparator';
import colors from '../config/colors';

const CartScreen = ({ navigation }) => {
    const { cartItems, setCartItems, removeFromCart, getTotalPrice } = useCart();
    const [total, setTotal] = useState(0);
    const [refreshing, setRefreshing] = useState(false);


    // refresh the cart
    const refreshCart = () => {
        setRefreshing(true);
        setCartItems(cartItems);
        setTotal(getTotalPrice());
        setRefreshing(false);
    }

    useEffect(() => {
        setCartItems(cartItems);
        setTotal(getTotalPrice());
    }, []);

    // delete function
    const handleDelete = (item) => {
        Alert.alert(
            'Are you sure?',
            'Do you really want to remove the item from the cart?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Remove',
                    onPress: () => {
                        removeFromCart(item.id);
                    },
                },
            ],
            { cancelable: true },
        );
        // refresh after delete
        refreshCart();
    };

    // purchase function
    const purchase = () => {
        // alert item bought at price
        Alert.alert(
            'Item Bought',
            'You bought ' + cartItems.length + ' items for Kes ' + total,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        setCartItems([]);
                        // navigation.navigate('Home');
                    }
                },
            ],
            { cancelable: true },
        );
    }

    return cartItems.length > 0 ? (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={ListItemSeparator}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refreshCart} />
                }
                renderItem={({ item }) =>
                    <ListItem
                        IconComponent={
                            <Icon name={item.category.icon} backgroundColor={item.category.backgroundColor} size={50} />
                        }
                        title={item.title}
                        price={item.price}
                        onPress={() => handleDelete(item)}
                        deleteItem
                        description={item.description}
                    />
                }
            />
            <View style={styles.buttonContainer}>
                <AppText style={styles.totalText}>Total: {total}</AppText>
                <Button
                    title="Checkout"
                    onPress={() => Alert.alert('Checkout', 'Are you sure you want to checkout?', [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => purchase() },
                    ], { cancelable: true })}
                    buttonStyle={styles.button}
                />
            </View>
        </View>
    ) : (
        <View style={styles.emptyContainer}>
            <AppText style={styles.empty}>Your cart is empty</AppText>
        </View>
    );
}

export default CartScreen

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    empty: {
        fontSize: 24,
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.light,
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
        textAlign: 'center',
        padding: 10,
        marginTop: 10,
    },
    button: {
        backgroundColor: colors.primary,
        margin: 10,
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
