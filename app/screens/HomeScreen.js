import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { IconButton } from '../components';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserContext';
import { async } from '@firebase/util';

// firebase authentication service
const auth = Firebase.auth();

const HomeScreen = () => {
    const { user } = useContext(AuthenticatedUserContext);

    // function to ha ndle user signout
    const handleSignOut = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style='dark-content' />
            <View style={styles.row}>
                <Text style={styles.title}>Welcome {user.email}!</Text>
                <IconButton
                    name='logout'
                    size={24}
                    color='#fff'
                    onPress={handleSignOut}
                />
            </View>
            <Text style={styles.text}>Your UID is: {user.uid} </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e93b81',
        paddingTop: 50,
        paddingHorizontal: 12
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#fff'
    },
    text: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#fff'
    }
});
export default HomeScreen
