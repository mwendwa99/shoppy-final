import React from 'react'
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import ListingsScreen from './ListingsScreen';

const HomeScreen = () => {

    return (
        <View style={styles.container}>
            <StatusBar style='dark-content' />
            <ListingsScreen />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
export default HomeScreen

