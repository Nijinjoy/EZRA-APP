import { View, Text, Image, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { HEIGHT, WIDTH } from '../constants/Dimensions';
import { biometricIcon, eye, nextArrow, signinIntersection } from '../assets/images';
import { colors } from '../constants/Colors';
import ButtonComponent from '../components/ButtonComponent';
import TextInputComponent from '../components/TextInputComponent';
import { useNavigation } from '@react-navigation/native';
import PasswordComponent from '../components/PasswordComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = () => {
    const Navigation = useNavigation()
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleInputChange = (field, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
    };


    const handleSignIn = async () => {
        try {
            const storedEmail = await AsyncStorage.getItem('email');
            const storedPassword = await AsyncStorage.getItem('password');

            if (formData.email === storedEmail && formData.password === storedPassword) {
                Navigation.navigate('HomeScreen');
            } else {
                console.error('Invalid credentials');
                Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
        }
    };

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('email');
                const storedPassword = await AsyncStorage.getItem('password');
                if (storedEmail && storedPassword) {
                    Navigation.navigate('HomeScreen');
                }
            } catch (error) {
                console.error('Error during user session check:', error);
            }
        };
        checkUserSession();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: colors.violet }}>
            <View style={{ backgroundColor: colors.white, height: HEIGHT * 0.92, borderBottomLeftRadius: WIDTH * 0.07, borderBottomRightRadius: WIDTH * 0.07, }}>
                <Image source={signinIntersection} style={{ width: WIDTH, height: HEIGHT * 0.294 }} resizeMode='contain' />
                <View style={{ marginHorizontal: WIDTH * 0.08 }}>
                    <Text style={{ fontSize: 24, color: colors.darkViolet }}>Sign in </Text>
                    <Text style={{ color: colors.lightGrey, fontSize: 15 }}>Sign in if you already have your account</Text>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <View style={{ marginTop: HEIGHT * 0.03 }}>
                            <Text style={{ fontSize: 13, color: colors.darkViolet }}>Email</Text>
                            <TextInputComponent
                                placeholder="Email address"
                                background={colors.grey}
                                width={WIDTH * 0.85}
                                value={formData.email}
                                onChangeText={(text) => handleInputChange('email', text)}
                            />
                            <Text style={{ fontSize: 14, textAlign: 'right', color: colors.red, marginVertical: HEIGHT * 0.01 }}>Username doesn't exists</Text>
                        </View>
                        <View style={{ marginTop: HEIGHT * 0.02 }}>
                            <Text style={{ fontSize: 13, color: colors.darkViolet }}>Password</Text>
                            <PasswordComponent
                                icon={eye}
                                variable="Show"
                                placeholder="Password"
                                passwordBackground={colors.white}
                                background={colors.grey}
                                value={formData.password}
                                onChangeText={(text) => handleInputChange('password', text)}
                            />
                            <Text style={{ fontSize: 14, textAlign: 'right', marginVertical: HEIGHT * 0.01, color: colors.darkViolet }}>Forgot password ?</Text>
                        </View>
                        <View style={{ marginTop: HEIGHT * 0.03, alignItems: 'center' }}>
                            <ButtonComponent onPress={handleSignIn} text="Sign in" nextarrow={nextArrow} background={colors.darkViolet} textColor={colors.white} />
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: WIDTH * 0.03 }}>
                                <Text style={{ fontSize: 14, color: colors.lightGrey }}>Don't have an account.</Text>
                                <Pressable onPress={() => Navigation.navigate('SignUpScreen')}>
                                    <Text style={{ fontSize: 14, fontWeight: "600", color: colors.darkViolet }}>Sign In</Text>
                                </Pressable>
                            </View >
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'row' }}>
                <Image source={biometricIcon} resizeMode='contain' style={{ width: WIDTH * 0.092, height: HEIGHT * 0.045 }} />
                <Text style={{ color: colors.grey, marginHorizontal: WIDTH * 0.03 }}>Sign in using biometrics</Text>
            </View>
        </View >
    )
}


export default SignInScreen



//updated
import { View, Text, Image, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { HEIGHT, WIDTH } from '../constants/Dimensions';
import { biometricIcon, eye, nextArrow, signinIntersection } from '../assets/images';
import { colors } from '../constants/Colors';
import ButtonComponent from '../components/ButtonComponent';
import TextInputComponent from '../components/TextInputComponent';
import { useNavigation } from '@react-navigation/native';
import PasswordComponent from '../components/PasswordComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = () => {
    const Navigation = useNavigation()
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleInputChange = (field, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
    };

    const handleSignIn = async () => {
        try {
            const response = await fetch('https://hbkuesra.herokuapp.com/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });
            if (response.ok) {
                const responseData = await response.json();
                await AsyncStorage.setItem('email', formData.email);
                await AsyncStorage.setItem('password', formData.password);
                await AsyncStorage.setItem('userId', responseData._id);
                console.log('asyncStorage==>', await AsyncStorage.getAllKeys());
                Navigation.navigate('HomeScreen');
            } else {
                console.error('Login failed:', response.status, response.statusText);
                Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
        }
    };

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('email');
                const storedPassword = await AsyncStorage.getItem('password');
                const storedUserId = await AsyncStorage.getItem('userId');
                if (storedEmail && storedPassword && storedUserId) {
                    Navigation.navigate('HomeScreen');
                } else {
                    setFormData({ email: '', password: '' });
                }
            } catch (error) {
                console.error('Error during user session check:', error);
            }
        };
        checkUserSession();
    }, []);

    // useEffect(() => {
    //     const checkUserSession = async () => {
    //         try {
    //             const storedEmail = await AsyncStorage.getItem('email');
    //             const storedPassword = await AsyncStorage.getItem('password');
    //             const storedUserId = await AsyncStorage.getItem('userId');

    //             if (storedEmail && storedPassword && storedUserId) {
    //                 const clearCredentials = Navigation.getParam('clearCredentials', true);
    //                 if (clearCredentials) {
    //                     await AsyncStorage.removeItem('email');
    //                     await AsyncStorage.removeItem('password');
    //                     await AsyncStorage.removeItem('userId');
    //                 }
    //                 Navigation.navigate('HomeScreen');
    //             } else {
    //                 setFormData({ email: '', password: '' });
    //             }
    //         } catch (error) {
    //             console.error('Error during user session check:', error);
    //         }
    //     };
    //     checkUserSession();
    // }, []);

    return (
        <View style={{ flex: 1, backgroundColor: colors.violet }}>
            <View style={{ backgroundColor: colors.white, height: HEIGHT * 0.92, borderBottomLeftRadius: WIDTH * 0.07, borderBottomRightRadius: WIDTH * 0.07, }}>
                <Image source={signinIntersection} style={{ width: WIDTH, height: HEIGHT * 0.294 }} resizeMode='contain' />
                <View style={{ marginHorizontal: WIDTH * 0.08 }}>
                    <Text style={{ fontSize: 24, color: colors.darkViolet }}>Sign in </Text>
                    <Text style={{ color: colors.lightGrey, fontSize: 15 }}>Sign in if you already have your account</Text>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <View style={{ marginTop: HEIGHT * 0.03 }}>
                            <Text style={{ fontSize: 13, color: colors.darkViolet }}>Email</Text>
                            <TextInputComponent
                                placeholder="Email address"
                                background={colors.grey}
                                width={WIDTH * 0.85}
                                value={formData.email}
                                onChangeText={(text) => handleInputChange('email', text)}
                            />
                            <Text style={{ fontSize: 14, textAlign: 'right', color: colors.red, marginVertical: HEIGHT * 0.01 }}>Username doesn't exists</Text>
                        </View>
                        <View style={{ marginTop: HEIGHT * 0.02 }}>
                            <Text style={{ fontSize: 13, color: colors.darkViolet }}>Password</Text>
                            <PasswordComponent
                                icon={eye}
                                variable="Show"
                                placeholder="Password"
                                passwordBackground={colors.white}
                                background={colors.grey}
                                value={formData.password}
                                onChangeText={(text) => handleInputChange('password', text)}
                            />
                            <Text style={{ fontSize: 14, textAlign: 'right', marginVertical: HEIGHT * 0.01, color: colors.darkViolet }}>Forgot password ?</Text>
                        </View>
                        <View style={{ marginTop: HEIGHT * 0.03, alignItems: 'center' }}>
                            <ButtonComponent onPress={handleSignIn} text="Sign in" nextarrow={nextArrow} background={colors.darkViolet} textColor={colors.white} />
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: WIDTH * 0.03 }}>
                                <Text style={{ fontSize: 14, color: colors.lightGrey }}>Don't have an account.</Text>
                                <Pressable onPress={() => Navigation.navigate('SignUpScreen')}>
                                    <Text style={{ fontSize: 14, fontWeight: "600", color: colors.darkViolet }}>Sign In</Text>
                                </Pressable>
                            </View >
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'row' }}>
                <Image source={biometricIcon} resizeMode='contain' style={{ width: WIDTH * 0.092, height: HEIGHT * 0.045 }} />
                <Text style={{ color: colors.grey, marginHorizontal: WIDTH * 0.03 }}>Sign in using biometrics</Text>
            </View>
        </View >
    )
}


export default SignInScreen

