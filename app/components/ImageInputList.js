import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ImageInput from './ImageInput';

const ImageInputList = ({ imageUris = [], onRemoveImage, onAddImage }) => {
    // reference to instance of ScrollView
    const scrollView = useRef();

    return (
        <View>
            <ScrollView
                ref={scrollView}
                horizontal
                onContentSizeChange={() => scrollView.current.scrollToEnd()}
            >
                <View style={styles.container}>
                    {imageUris.map(uri => (
                        <View style={styles.image} key={uri}>
                            <ImageInput
                                imageUri={uri}
                                onChangeImage={() => onRemoveImage(uri)}
                            />
                        </View>
                    ))}
                    <ImageInput onChangeImage={uri => onAddImage(uri)} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    image: {
        margin: 5
    }
});

export default ImageInputList;