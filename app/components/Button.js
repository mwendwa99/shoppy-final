import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import colors from '../config/colors';

const Button = ({
    title,
    backgroundColor = '#000',
    titleColor = '#fff',
    titleSize = 12,
    onPress,
    width = '100%',
    containerStyle
}) => {
    return (
        <Pressable
            onPress={onPress}
            style={args => {
                if (args.pressed) {
                    return [
                        styles.base,
                        {
                            opacity: 0.5,
                            backgroundColor,
                            width
                        },
                        containerStyle
                    ];
                }

                return [
                    styles.base,
                    {
                        opacity: 1,
                        backgroundColor,
                        width
                    },
                    containerStyle
                ];
            }}
        >
            <Text style={[styles.text, { color: titleColor, fontSize: titleSize }]}>
                {title}
            </Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    text: {
        color: colors.light,
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold",
    },
    base: {
        backgroundColor: colors.secondary,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        width: "100%",
        marginVertical: 10,
        elevation: 1.5,
    },
    // base: {
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     minHeight: 42,
    //     borderRadius: 4,
    //     paddingHorizontal: 12
    // }
})

export default Button

