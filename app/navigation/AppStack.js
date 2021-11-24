import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppNavigator from './AppNavigator';
import { MessagesScreen, ListingDetailsScreen } from '../screens';
import colors from '../config/colors';
import { ImageProvider } from '../../context/ImageContext';


const Stack = createStackNavigator();

export default function AppStack() {
    return (
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
                <Stack.Screen name='Messages' component={MessagesScreen} />
                <Stack.Screen name='Listings' component={ListingDetailsScreen} />
            </Stack.Navigator>
        </ImageProvider>
    );
};