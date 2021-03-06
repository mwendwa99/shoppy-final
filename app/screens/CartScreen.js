import React, { useEffect, useState, useRef } from 'react'
import { Alert, FlatList, StyleSheet, View, RefreshControl } from 'react-native';
import { Button } from 'react-native-elements';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import { useCart } from '../../context/CartContext';
import AppText from '../components/AppText';
import Icon from '../components/Icon';
import ListItem from '../components/ListItem';
import ListItemSeparator from '../components/ListItemSeparator';
import colors from '../config/colors';

import { firebase } from '../config/firebase';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

const db = getFirestore(firebase);
// notification params
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const CartScreen = () => {
    const { cartItems, setCartItems, removeFromCart, getTotalPrice } = useCart();
    const [total, setTotal] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    // notification variables
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        setCartItems(cartItems);
        setTotal(getTotalPrice());

        // notification handler
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    // refresh the cart
    const refreshCart = () => {
        setRefreshing(true);
        setCartItems(cartItems);
        setTotal(getTotalPrice());
        setRefreshing(false);
    }

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
                        // delete item from firebase
                        cartItems.forEach(async item => {
                            await deleteDoc(doc(db, 'listings', item.id));
                        });
                        setCartItems([]);
                        // navigation.navigate('Home');
                    }
                },
            ],
            { cancelable: true },
        );
    }

    // handle checkout
    const handleCheckout = () => Alert.alert('Checkout', 'Are you sure you want to checkout?', [
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        { text: 'OK', onPress: () => purchase() },
    ], { cancelable: true })

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
                    onPress={async () => {
                        handleCheckout();
                        await sendPushNotification(expoPushToken, cartItems.title, cartItems.price);
                    }}
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


// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken, title, price) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Item purchased!',
        body: 'You bought ' + title + ' for ' + price,
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}