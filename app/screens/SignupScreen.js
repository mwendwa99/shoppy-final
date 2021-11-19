import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';

import { Button, InputField, ErrorMessage } from '../components';
import colors from '../config/colors';
import Firebase from '../config/Firebase';

const auth = Firebase.auth();

export default function SignupScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [signupError, setSignupError] = useState('');

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    const onHandleSignup = async () => {
        try {
            if (email !== '' && password !== '') {
                await auth.createUserWithEmailAndPassword(email, password);
                // update name in firebase
                await Firebase.auth().currentUser.updateProfile({
                    displayName: name,
                });
            }
        } catch (error) {
            setSignupError(error.message);
        }
    };


    return (
        <ImageBackground
            imageStyle={{ opacity: 0.5 }}
            source={require('../../assets/background.jpg')}
            style={styles.background}>
            <StatusBar style='dark-content' />
            <Image style={styles.logo} source={require('../../assets/logo.png')} />
            <Text style={styles.title}>Create new account</Text>
            <InputField
                inputStyle={{
                    fontSize: 14,
                }}
                containerStyle={{
                    backgroundColor: colors.light,
                    marginBottom: 20,
                    borderRadius: 20,
                }}
                leftIcon='account'
                placeholder='Enter username'
                autoCapitalize='none'
                keyboardType='default'
                textContentType='name'
                value={name}
                onChangeText={text => setName(text)}
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
                leftIcon='email'
                placeholder='Enter email'
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
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
            {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
            <Button
                onPress={onHandleSignup}
                title='Signup'
                tileColor='#fff'
                titleSize={20}
                containerStyle={{
                    marginBottom: 24,
                    backgroundColor: colors.primary,
                    borderRadius: 20,
                }}
            />
            <Button
                onPress={() => navigation.navigate('Login')}
                title='Login'
                tileColor='#fff'
                titleSize={20}
                containerStyle={{
                    backgroundColor: colors.secondary,
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
        color: colors.primary,
        alignSelf: 'center',
        paddingBottom: 24
    }
});