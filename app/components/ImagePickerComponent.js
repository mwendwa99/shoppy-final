// create expo image picker component
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useFormikContext } from 'formik';

import colors from '../config/colors';

const ImagePickerComponent = ({ imageUri, onChangeImage }) => {
    const [image, setImage] = useState(imageUri);
    const { errors, setFieldValue, touched, values } = useFormikContext();

    useEffect(() => {
        setImage(imageUri);

    }, [imageUri]);

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                // allowsEditing: true,
                // aspect: [4, 3],
                quality: 1
            });

            if (!result.cancelled) {
                setImage(result.uri);
                onChangeImage(result.uri);
            }

            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={pickImage}>
            <View style={styles.container}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <MaterialCommunityIcons name="image-plus" color={colors.primary} size={30} />
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light,
        borderRadius: 15,
        width: '100%',
        height: 100,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    }
});


export default ImagePickerComponent;