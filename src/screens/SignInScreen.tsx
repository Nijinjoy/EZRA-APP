import { View, Text, Image, Pressable, Alert, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { HEIGHT, WIDTH } from '../constants/Dimensions';
import { biometricIcon, eye, nextArrow, signinIntersection } from '../assets/images';
import { colors } from '../constants/Colors';
import ButtonComponent from '../components/ButtonComponent';
import TextInputComponent from '../components/TextInputComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import PasswordComponent from '../components/PasswordComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Api } from './Api';
import TextInputs from '../components/TextInputs';
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../redux/action/commonAction';

const Data = [
    {
        id: 1,
        label: "Email",
        placeholder: "Email",
        key: "email",
    },
    {
        id: 2,
        label: "Password",
        placeholder: "Password",
        key: "password",
        secureTextEntry: true
    }
]


const SignInScreen = () => {
    const [formData, setFormData] = useState({ email: "", password: "" })
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [error, setError] = useState({ email: "", password: "" });

    const handleState = (key, val) => {
        error[key] = ""
        setError(error)
        formData[key] = val;
        setFormData({ ...formData })
    }

    const onLogin = async () => {
        const { email, password } = formData;
        // let isValid = true;
        // const newError = {}
        // if (!email.trim()) {
        //     newError.email = "Email is required"
        //     isValid = false;
        // } else if (!/\S+@\S+\.\S+/.test(email)) {
        //     newError.email = "Invalid email";
        //     isValid = false;
        // }
        // if (!password.trim()) {
        //     newError.password = "Password is required";
        //     isValid = false;
        // }
        // if (!isValid) {
        //     setError(newError);
        //     return;
        // }

        try {
            const response = await fetch(`${Api}/user/login`, {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await response.json();
            if (response.status) {
                const token = data?.data?.token;
                await AsyncStorage.setItem('token', token);
                if (token) {
                    dispatch(getUserProfile(token))

                    navigation.navigate('Drawers');
                    console.log("Token not found in AsyncStorage");
                }
            } else {
                console.log("Token not found in the response:", data);
                setError("Token not found in the response");
            }
        }
        catch (error) {
            console.log("Error:", error);
            setError("An error occurred during login");
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.violet }}>
            <View style={{ backgroundColor: colors.white, height: HEIGHT * 0.92, borderBottomLeftRadius: WIDTH * 0.07, borderBottomRightRadius: WIDTH * 0.07, }}>
                <Image source={signinIntersection} style={{ width: WIDTH, height: HEIGHT * 0.294 }} resizeMode='contain' />
                <View style={{ marginHorizontal: WIDTH * 0.08 }}>
                    <Text style={{ fontSize: 24, color: colors.darkViolet }}>Sign in </Text>
                    <Text style={{ color: colors.lightGrey, fontSize: 15 }}>Sign in if you already have your account</Text>
                    <View style={{ marginHorizontal: WIDTH * 0.01, marginTop: HEIGHT * 0.03 }}>
                        <FlatList
                            data={Data}
                            renderItem={({ item }) => (
                                <>
                                    <TextInputs
                                        {...item}
                                        secureTextEntry={item?.secureTextEntry}
                                        viewStyle={{ height: HEIGHT * 0.07, borderWidth: 1, borderColor: colors.grey, justifyContent: "center", borderRadius: WIDTH * 0.015 }}
                                        errorMsg={error[item.key]}
                                        togglePasswd={item?.secureTextEntry}
                                        onChangeText={(val) => {
                                            handleState(item.key, val);
                                        }}
                                    />
                                </>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </View>
                    <View style={{ marginTop: HEIGHT * 0.03, alignItems: 'center' }}>
                        <ButtonComponent
                            containerStyle={{ backgroundColor: colors.darkViolet, width: WIDTH * 0.85, height: HEIGHT * 0.072, borderRadius: WIDTH * 0.02 }}
                            labelStyle={{ color: colors.white }}
                            icon={nextArrow}
                            label="Sign in"
                            onPress={onLogin}
                        // onPress={() => navigation.navigate('Drawers')}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: WIDTH * 0.03 }}>
                            <Text style={{ fontSize: 14, color: colors.lightGrey }}>Don't have an account.</Text>
                            <Pressable onPress={() => navigation.navigate('SignUpScreen')} >
                                <Text style={{ fontSize: 14, fontWeight: "600", color: colors.darkViolet }}>Sign Up</Text>
                            </Pressable>
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

