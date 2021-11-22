import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AccountScreen, ListingEditScreen, ListingsScreen } from '../screens';
import colors from '../config/colors';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
    return (
        <Tab.Navigator
            barStyle={{ backgroundColor: colors.primary }}
            activeColor={colors.white}
            inactiveColor={colors.medium}
        >
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
                name="Home" component={ListingsScreen} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                    ),
                }}
                name="Listing" component={ListingEditScreen} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
                name="Account" component={AccountScreen} />
        </Tab.Navigator>
    );
}
