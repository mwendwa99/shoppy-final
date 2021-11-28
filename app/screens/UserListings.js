// profile screen component
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { getFirestore, updateDoc, getDoc, collection } from 'firebase/firestore';

import firebase from '../config/firebase';

const UserListings = () => {
    return (
        <View>
            <Text>UserListings</Text>
        </View>
    )
}

export default UserListings

const styles = StyleSheet.create({})
