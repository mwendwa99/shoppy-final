import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../screens';
import AppNavigator from './AppNavigator'

const Stack = createStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            {/* <Stack.Screen name='Home' component={HomeScreen} /> */}
            <Stack.Screen name='App' component={AppNavigator} />
        </Stack.Navigator>
    );
};