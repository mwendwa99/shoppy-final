import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen, SignupScreen } from "../screens";

const Stack = createStackNavigator();

export default function () {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    );
};