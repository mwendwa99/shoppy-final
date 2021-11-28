// profile screen component
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { getFirestore, updateDoc, getDoc, collection } from 'firebase/firestore';

import firebase from '../config/firebase';

const Profile = () => {
    return (
        <View>
            <Text>Profile</Text>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({})
