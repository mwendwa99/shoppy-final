import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import defaultStyles from '../config/styles';

const InputField = ({
    leftIcon,
    iconColor = '#000',
    rightIcon,
    inputStyle,
    containerStyle,
    placeholderTextColor = '#444',
    handlePasswordVisibility,
    ...rest
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {leftIcon ? (
                <MaterialCommunityIcons
                    name={leftIcon}
                    size={20}
                    color={iconColor}
                    style={styles.leftIcon}
                />
            ) : null}
            <TextInput
                {...rest}
                placeholderTextColor={placeholderTextColor}
                style={[styles.input, inputStyle]}
            />
            {rightIcon ? (
                <TouchableOpacity onPress={handlePasswordVisibility}>
                    <MaterialCommunityIcons
                        name={rightIcon}
                        size={20}
                        color={iconColor}
                        style={styles.rightIcon}
                    />
                </TouchableOpacity>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 25,
        flexDirection: 'row',
        padding: 15,
        marginVertical: 10,
        alignItems: 'center'
    },
    leftIcon: {
        marginRight: 10,
        color: defaultStyles.colors.medium,
    },
    rightIcon: {
        marginRight: 10,
        color: defaultStyles.colors.medium,
    },
});

export default InputField;