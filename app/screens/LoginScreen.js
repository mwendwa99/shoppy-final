import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
import * as Yup from 'yup';

import { Button, InputField, ErrorMessage } from '../components';
import firebase from '../config/firebase';
import colors from '../config/colors';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import { AppForm, AppFormField, AppButton, SubmitButton } from '../components';

const auth = firebase.auth();
const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
})

export default function LoginScreen({ navigation }) {
    const [isloading, setIsloading] = useState(false);
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
        setIsloading(true);
        try {
            if (email !== '' && password !== '') {
                await auth.signInWithEmailAndPassword(email, password);
            }
        } catch (error) {
            setLoginError(error.message);
        }
        setIsloading(false);
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
            <ActivityIndicator animating={isloading} color={colors.primary} size='large' />
            <InputField
                inputStyle={{
                    flex: 1,
                }}
                containerStyle={{
                    width: '100%',
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
                    flex: 1,
                }}
                containerStyle={{
                    width: '100%',
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
                title={
                    isloading ? 'Logging in...' : 'Login'
                }
                tileColor='#fff'
            />
            <Button
                onPress={() => navigation.navigate('Signup')}
                title='Signup'
                backgroundColor={colors.secondary}
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
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'stretch',
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: colors.white,
        alignSelf: 'center',
        paddingBottom: 20
    }
});