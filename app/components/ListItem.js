
import React from 'react'
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler';
import colors from '../config/colors';
import AppText from './AppText';
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function ListItem({ title, image, IconComponent, subTitle, onPress, renderRightActions }) {
    return (
        <Swipeable renderRightActions={renderRightActions} >
            <TouchableHighlight
                underlayColor={colors.light}
                onPress={onPress}
            >
                <View style={styles.container}>
                    {IconComponent}
                    {image && <Image style={styles.image} source={image} />}
                    <View style={styles.detailsContainer}>
                        <AppText numberOfLines={1} style={styles.title}>{title}</AppText>
                        {subTitle && <AppText style={styles.subTitle} numberOfLines={2} >{subTitle}</AppText>}
                    </View>
                    <MaterialCommunityIcons color={colors.medium} name='chevron-right' size={25} />
                </View>
            </TouchableHighlight>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: colors.white,
        alignItems: 'center'
    },
    detailsContainer: {
        marginLeft: 10,
        justifyContent: "center",
        flex: 1,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    title: {
        fontWeight: "700",
    },
    subTitle: {
        color: colors.medium,
    },
})

