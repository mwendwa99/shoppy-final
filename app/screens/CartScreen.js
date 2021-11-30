import React, { useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

import { useCart } from '../../context/CartContext';
import AppText from '../components/AppText';
import Icon from '../components/Icon';
import ListItem from '../components/ListItem';
import ListItemSeparator from '../components/ListItemSeparator';
import colors from '../config/colors';

const CartScreen = ({ navigation }) => {
    const { cartItems, removeFromCart, getTotalPrice } = useCart();
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setCart(cartItems);
        setTotal(getTotalPrice());
    }, [cart]);

    // delete function
    const handleDelete = (item) => {
        Alert.alert(
            'Delete Item',
            'Are you sure you want to delete this item?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => removeFromCart(item) },
            ],
            { cancelable: true },
        );
        // navigate to home
    }

    // purchase function
    const purchase = () => {
        // alert item bought at price
        Alert.alert(
            'Item Bought',
            'You bought ' + cart.length + ' items for Kes ' + total,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        navigation.navigate('Home');
                    }
                },
            ],
            { cancelable: true },
        );
    }

    return cart ? (
        <View style={styles.container}>
            <FlatList
                data={cart}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={ListItemSeparator}
                renderItem={({ item }) =>
                    <ListItem
                        IconComponent={
                            <Icon name={item.category.icon} backgroundColor={item.category.backgroundColor} size={50} />
                        }
                        title={item.title}
                        // subTitle={item.category.label}
                        // subTitle={item.description}
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
