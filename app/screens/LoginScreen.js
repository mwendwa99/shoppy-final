import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, Image } from 'react-native';

import { Button, InputField, ErrorMessage } from '../components';
import firebase from '../config/firebase';
import colors from '../config/colors';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';

const auth = firebase.auth();

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [loginError, setLoginError] = useState('');

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    const onLogin = async () => {
        try {
            if (email !== '' && password !== '') {
                await auth.signInWithEmailAndPassword(email, password);
            }
        } catch (error) {
            setLoginError(error.message);
        }
    };

    return (
        <ImageBackground
            style={styles.background}
            imageStyle={{ opacity: 0.5 }}
            source={require('../../assets/background.jpg')}
        >
            <StatusBar style='dark-content' />
            <Image style={styles.logo} source={require('../../assets/logo.png')} />
            <Text style={styles.title}>Shoppy</Text>
            <InputField
                inputStyle={{
                    fontSize: 14
                }}
                containerStyle={{
                    backgroundColor: colors.light,
                    marginBottom: 20,
                    borderRadius: 20,
                }}
                leftIcon='email'
                placeholder='Enter email'
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                autoFocus={false}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <InputField
                inputStyle={{
                    fontSize: 14
                }}
                containerStyle={{
                    backgroundColor: colors.light,
                    marginBottom: 20,
                    borderRadius: 20,
                }}
                leftIcon='lock'
                placeholder='Enter password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
                textContentType='password'
                rightIcon={rightIcon}
                value={password}
                onChangeText={text => setPassword(text)}
                handlePasswordVisibility={handlePasswordVisibility}
            />
            {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
            <Button
                onPress={onLogin}
                backgroundColor={colors.primary}
                title='Login'
                tileColor='#fff'
                titleSize={20}
                containerStyle={{
                    marginBottom: 15,
                    borderRadius: 20,
                }}
            />
            <Button
                onPress={() => navigation.navigate('Signup')}
                title='Signup'
                titleSize={20}
                backgroundColor={colors.secondary}
                containerStyle={{
                    marginBottom: 24,
                    borderRadius: 20,
                }}
            />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,9)',
        paddingHorizontal: 20,
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: colors.light,
        alignSelf: 'center',
        paddingBottom: 24
    }
});