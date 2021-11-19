import * as React from 'react';
import { Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { HomeScreen, AccountScreen } from '../screens';

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Add Listings page</Text>
        </View>
    );
}

const Tab = createMaterialBottomTabNavigator();

export default function App() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
                name="Home" component={HomeScreen} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                    ),
                }}
                name="Listing" component={SettingsScreen} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
                name="Account" component={AccountScreen} />
        </Tab.Navigator>
    );
}
