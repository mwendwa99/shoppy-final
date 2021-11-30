import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppNavigator from './AppNavigator';
import { ListingDetailsScreen, CartScreen, UserListings } from '../screens';
import colors from '../config/colors';
import { ImageProvider } from '../../context/ImageContext';
import { CartProvider } from '../../context/CartContext';
import Icon from '../components/Icon';


const Stack = createStackNavigator();

export default function AppStack() {
    return (
        <CartProvider>
            <ImageProvider>
                <Stack.Navigator screenOptions={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.primary,
                    },
                    headerTitleAlign: 'center',
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}>
                    <Stack.Screen name='Shoppy' component={AppNavigator} />
                    <Stack.Screen
                        options={{
                            headerRight: () => (
                                <Icon name={'bookmark'} backgroundColor={colors.primary} />
                            ),
                            headerTitle: 'Item'
                        }}
                        name='Listings' component={ListingDetailsScreen} />
                    <Stack.Screen
                        options={{
                            headerTitle: 'My Lists',
                            headerRight: () => (
                                <Icon name={'format-list-bulleted'} backgroundColor={colors.primary} />
                            ),
                        }}
                        name='My Listings' component={UserListings} />
                    <Stack.Screen
                        options={{
                            headerTitle: 'Shopping Cart',
                            headerRight: () => (
                                <Icon name={'cart'} backgroundColor={colors.primary} />
                            ),
                        }}

                        name='Cart' component={CartScreen} />
                </Stack.Navigator>
            </ImageProvider>
        </CartProvider>
    );
};