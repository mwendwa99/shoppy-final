import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';

import AppNavigator from './AppNavigator';
import colors from '../config/colors';
import { Button, IconButton } from '../components';
import Icon from '../components/Icon';

const Stack = createStackNavigator();

export default function AppStack() {
    return (
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
        </Stack.Navigator>
    );
};