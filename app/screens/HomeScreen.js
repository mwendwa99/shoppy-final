import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { IconButton } from '../components';
import Firebase from '../config/Firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import colors from '../config/colors';
import ListingsScreen from './ListingsScreen';

// firebase authentication service
const auth = Firebase.auth();

const HomeScreen = () => {
    const { user } = useContext(AuthenticatedUserContext);

    return (
        // <View style={styles.container}>
        //     <StatusBar style='dark-content' />
        //     <View style={styles.row}>
        //         <Text style={styles.title}>{user.email}</Text>
        //     </View>
        //     <Text style={styles.text}>Your UID is: {user.uid} </Text>
        // </View>
        <ListingsScreen />
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light,
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
        color: colors.primary,
    },
    text: {
        fontSize: 16,
        fontWeight: 'normal',
        color: colors.secondary
    }
});
export default HomeScreen

