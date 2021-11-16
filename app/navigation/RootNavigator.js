/* this file persists user login state through the application */
import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "react-navigation@/native";
import { View, ActivityIndicator } from 'react-native';

import Firebase from '../config/Firebase';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

const auth = Firebase.auth();

export default function RootNavigator() {
    const { user, setUser } = useContext(AuthenticatedUserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // onAuthStateChanged is a listener that fires when the user is signed in or out
        const unsubscribeAuth = auth.onAuthStateChanged(async authenticatedUser => {
            try {
                await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        });

        // unsubscribeAuth is a function that will remove the listener when the component unmounts
        return unsubscribeAuth;
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {
                user ? <HomeStack /> : <AuthStack />
            }
        </NavigationContainer>
    );
}

