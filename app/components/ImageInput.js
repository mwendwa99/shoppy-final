import React, { useEffect } from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import colors from '../config/colors';
// import { useImage } from '../../context/ImageContext';

const ImageInput = ({ imageUri, onChangeImage }) => {
    // const { setImageBase64 } = useImage();


    useEffect(() => {
        requestPermission();
    }, []);

    const requestPermission = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (!granted) alert('You need to enable permissions to access the library')
    }

    const handlePress = () => {
        if (!imageUri) {
            selectImage();
        } else Alert.alert('Delete', 'Are you sure you want to delete?', [
            { text: 'Yes', onPress: () => onChangeImage(null) },
            { text: 'No' }
        ])
    }
    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5,
                base64: true
            });
            if (!result.cancelled) {
                // setImageBase64(result.base64);
                onChangeImage(result.uri)
                // console.log("BASE64", result)
                // add result.base64 to the image

            }
        } catch (error) {
            console.log('error reading image' + error)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.container}>
                {!imageUri && <MaterialCommunityIcons size={40} color={colors.medium} name="camera" />}
                {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.light,
        borderRadius: 15,
        justifyContent: 'center',
        overflow: 'hidden',
        height: 100,
        width: 100,
    },
    image: {
        height: "100%",
        width: "100%"
    }
});

export default ImageInput;