import React from 'react';
import AnimatedLottieView from 'lottie-react-native';

const ActivityIndicator = ({ visible = false }) => {
    if (!visible) return null;

    return (
        <AnimatedLottieView
            autoPlay
            loop
            source={require('../assets/animations/loading.json')}
        />
    );
}

export default ActivityIndicator;