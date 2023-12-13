import { View, Text, Image, Pressable, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { eye, nextArrow, signinIntersection } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { colors } from '../constants/Colors'
import TextInputComponent from '../components/TextInputComponent'
import ButtonComponent from '../components/ButtonComponent'
import { useNavigation } from '@react-navigation/native'
import PasswordComponent from '../components/PasswordComponent'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SignUpScreen = () => {
    const Navigation = useNavigation()
    const [formData, setFormData] = useState({ email: '', password: '', repeatPassword: '' });


    const handleInputChange = (field, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
    };

    const handleSignUp = async () => {
        try {
            const access_token = await AsyncStorage.getItem('token');
            console.log("access_token=>", access_token);

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                Alert.alert('Validation Error', 'Please enter a valid email address.');
                return;
            }
            if (formData.password.length < 6) {
                Alert.alert('Validation Error', 'Password must be at least 6 characters long.');
                return;
            }
            if (formData.password !== formData.repeatPassword) {
                Alert.alert('Validation Error', 'Password must match.');
                return;
            }
            const response = await fetch('https://hbkuesra.herokuapp.com/api/user/register', {
                method: 'POST',
                headers: {
                    // Accept: 'application/json',
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${access_token}`
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });
            if (response.ok) {
                await AsyncStorage.setItem('userEmail', formData.email);
                await AsyncStorage.setItem('userPassword', formData.password);
                Navigation.navigate('AddChildScreen');
            } else {
                const errorResponse = await response.json();
                console.log('Error Response:', errorResponse);
                Alert.alert('Registration Failed', errorResponse.errorMsg || 'Please try again later.');
                Alert.alert('registration failed')
            }
        } catch (error) {
            console.error('Error during registration:', error);
            Alert.alert('Registration Error', 'An error occurred. Please try again.');
        }
    };

    return (
        <ScrollView style={{ flex: 1, }}>
            <Image source={signinIntersection} style={{ width: WIDTH, height: HEIGHT * 0.296 }} resizeMode="contain" />
            <View style={{ marginHorizontal: WIDTH * 0.07 }}>
                <Text style={{ fontSize: 24, color: colors.darkViolet }}>Get Started</Text>
                <Text style={{ color: colors.lightGrey, fontSize: 15, marginVertical: HEIGHT * 0.007 }}>Create an account</Text>
                <View style={{ justifyContent: "center", alignItems: 'center' }}>
                    <View style={{ marginTop: HEIGHT * 0.0 }}>
                        <Text style={{ fontSize: 13, color: colors.darkViolet, marginVertical: HEIGHT * 0.01 }}>Email</Text>
                        <TextInputComponent
                            placeholder="Email"
                            background={colors.grey}
                            value={formData.email}
                            width={WIDTH * 0.85}
                            onChangeText={(text) => handleInputChange('email', text)}
                        />
                    </View>
                    <View style={{ marginTop: HEIGHT * 0.02 }}>
                        <Text style={{ fontSize: 13, color: colors.darkViolet, marginVertical: HEIGHT * 0.01 }}>Password</Text>
                        <PasswordComponent
                            placeholder="Password"
                            variable="show"
                            secureTextEntry
                            icon={eye}
                            passwordBackground={colors.white}
                            background={colors.grey}
                            value={formData.password}
                            onChangeText={(text) => handleInputChange('password', text)}
                        />
                    </View>
                    <View style={{ marginTop: HEIGHT * 0.02 }}>
                        <Text style={{ fontSize: 13, color: colors.darkViolet, marginVertical: HEIGHT * 0.01 }}>Repeat Password</Text>
                        <PasswordComponent
                            secureTextEntry
                            placeholder="Repeat password"
                            background={colors.grey}
                            value={formData.repeatPassword}
                            onChangeText={(text) => handleInputChange('repeatPassword', text)}
                        />
                    </View>
                    <View style={{ marginTop: HEIGHT * 0.05 }}>
                        <ButtonComponent
                            text="Sign in"
                            borderRadius={HEIGHT * 0.05}
                            background={colors.darkViolet}
                            textColor={colors.white}
                            nextarrow={nextArrow}
                            navigate={handleSignUp}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: WIDTH * 0.03 }}>
                            <Text style={{ fontSize: 14, color: colors.lightGrey }}>Already have an account.</Text>
                            <Pressable onPress={() => Navigation.navigate('AddChildScreen')}>
                                <Text style={{ fontSize: 14, fontWeight: "600", color: colors.darkViolet }}>Sign Up</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default SignUpScreen