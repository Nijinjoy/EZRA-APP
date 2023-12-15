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
    const [formData, setFormData] = useState({ email: '', password: '', repeatPassword: '', })
    const [validationErrors, setValidationErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        })
    }

    const validateInputs = () => {
        const errors = {};
        if (!formData.email) {
            errors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid.';
        }
        if (!formData.password) {
            errors.password = 'Password is required'
        } else if (formData.password.length !== 6) {
            errors.password = 'Password must contain 6 characters'
        }
    }

    const handleSignUp = async () => {
        if (validateInputs()) {
            try {
                await AsyncStorage.setItem('email', formData.email);
                await AsyncStorage.setItem('password', formData.password);

                const response = await fetch('https://hbkuesra.herokuapp.com/api/user/register', {
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
                    console.log('Registration successful');
                    Navigation.navigate('HomeScreen');
                } else {
                    const errorData = await response.json();
                    console.error('Registration failed:', errorData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <Image source={signinIntersection} style={{ width: WIDTH, height: HEIGHT * 0.296 }} resizeMode="contain" />
            <View style={{ marginHorizontal: WIDTH * 0.07 }}>
                <Text style={{ fontSize: 24, color: colors.darkViolet }}>Get Started</Text>
                <Text style={{ color: colors.lightGrey, fontSize: 15, marginVertical: HEIGHT * 0.007 }}>Create an account</Text>
                <View style={{ justifyContent: "center", alignItems: 'center' }}>
                    <View style={{ marginTop: HEIGHT * 0.02 }}>
                        <Text style={{ fontSize: 13, color: colors.darkViolet, marginVertical: HEIGHT * 0.01 }}>Email</Text>
                        <TextInputComponent
                            placeholder="Email"
                            background={colors.grey}
                            width={WIDTH * 0.85}
                            value={formData.email}
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
