import React, { useContext, useState, useEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';
// import UserAvatar from 'react-native-user-avatar';

import firebase from '../config/firebase'
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider'
import Icon from '../components/Icon'
import ListItem from '../components/ListItem'
import ListItemSeparator from '../components/ListItemSeparator'
import Screen from '../components/Screen'
import colors from '../config/colors'
import { StatusBar } from 'expo-status-bar';
import { useCart } from '../../context/CartContext'

const menuItems = [
    {
        title: "My Listings",
        icon: {
            name: "format-list-bulleted",
            backgroundColor: colors.primary,
        },
        targetScreen: "My Listings"
    },
    {
        title: "My Cart",
        icon: {
            name: "cart",
            backgroundColor: colors.secondary,
        },
        targetScreen: "Cart",
    },
]

const auth = firebase.auth()

export default function AccountScreen({ navigation }) {
    const { user } = useContext(AuthenticatedUserContext);
    // cart count
    const [cartCount, setCartCount] = useState(0)
    const { cartItems } = useCart();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setCartCount(cartItems.length)
            }
        })
        return () => unsubscribe()
    }, [cartItems])

    const handleLogout = async () => {
        try {
            await auth.signOut()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Screen style={styles.screen}>
            <StatusBar style='dark-content' />
            <View style={styles.container}>
                <ListItem
                    title={user.displayName}
                    subTitle={user.email}
                    avatar={true}
                />
            </View>
            <View style={styles.container}>
                <FlatList
                    data={menuItems}
                    keyExtractor={menuItem => menuItem.title}
                    ItemSeparatorComponent={ListItemSeparator}
                    renderItem={({ item }) =>
                        <ListItem
                            title={item.title}
                            IconComponent={
                                <Icon name={item.icon.name} backgroundColor={item.icon.backgroundColor} />
                            }
                            onPress={() => navigation.navigate(item.targetScreen)}
                            cartCount={cartCount}
                            desciprtion={item.desciprtion}
                        />
                    }
                />
            </View>
            <ListItem
                title="log Out"
                onPress={handleLogout}
                IconComponent={
                    <Icon
                        name="logout" backgroundColor={colors.danger} />
                } />
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    screen: {
        backgroundColor: colors.light,
    }
})
