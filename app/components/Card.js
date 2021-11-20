import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

import colors from '../config/colors';
import AppText from './AppText';


function Card({ subTitle, imageUrl, title, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.card} >
                <Image style={styles.image} source={{ uri: imageUrl }} />
                <View style={styles.detailsContainer} >
                    <AppText style={styles.title}> {title} </AppText>
                    <AppText style={styles.subTitle}> {subTitle} </AppText>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 20,
        overflow: "hidden",
    },
    detailsContainer: {
        padding: 20,
    },
    image: {
        width: "100%",
        height: 200
    },
    title: {
        // marginBottom: 5,
    },
    subTitle: {
        color: colors.secondary,
        fontWeight: "bold",
    },

})

export default Card;