import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppNavigator from './AppNavigator';
import colors from '../config/colors';


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