import { View, Text, Image, Pressable, Alert, TouchableOpacity, TouchableHighlight, FlatList } from 'react-native'
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


const Data = [
    {
        id: 1,
        placeholder: "Email",
        key: "Email"
    },
    {
        id: 2,
        placeholder: "Password",
        key: "Password",
        secureTextEntry: true
    }
]


const SignInScreen = () => {
    const [formData, setFormData] = useState({ Email: "", Password: "" })
    const Navigation = useNavigation()
    const [error, setError] = useState("");

    const handleState = (key, val) => {
        error[key] = ""
        setError(error)
        formData[key] = val;
        setFormData({ ...formData })
    }

    const onLogin = async () => {
        const { Email, Password } = formData;
        try {
            const response = await fetch(`${Api}/user/login`, {
                method: "POST",
                body: JSON.stringify({
                    email: Email,
                    password: Password,
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Login response:", data);

                if (data && data._id) {
                    await AsyncStorage.setItem('userId', data._id);
                    await AsyncStorage.setItem('email', Email);
                    await AsyncStorage.setItem('password', Password);
                    console.log("User successfully authenticated");
                    Navigation.navigate('HomeScreen');
                } else {
                    console.log("Invalid user credentials or missing _id field");
                }
            } else {
                console.log("Login failed. Status:", response.status);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.violet }}>
            <View style={{ backgroundColor: colors.white, height: HEIGHT * 0.92, borderBottomLeftRadius: WIDTH * 0.07, borderBottomRightRadius: WIDTH * 0.07, }}>
                <Image source={signinIntersection} style={{ width: WIDTH, height: HEIGHT * 0.294 }} resizeMode='contain' />
                <View style={{ marginHorizontal: WIDTH * 0.08 }}>
                    <Text style={{ fontSize: 24, color: colors.darkViolet }}>Sign in </Text>
                    <Text style={{ color: colors.lightGrey, fontSize: 15 }}>Sign in if you already have your account</Text>
                    <View>
                        <View style={{ marginHorizontal: WIDTH * 0.01, marginTop: 20 }}>
                            <FlatList
                                data={Data}
                                renderItem={({ item }) => {
                                    return <TextInputs
                                        {...item}
                                        secureTextEntry={item?.secureTextEntry}
                                        viewStyle={{ height: HEIGHT * 0.07, borderWidth: 1, borderColor: colors.grey, justifyContent: "center", borderRadius: WIDTH * 0.015 }}
                                        errorMsg={error[item.key]}
                                        togglePasswd={item?.secureTextEntry}
                                        onChangeText={val => {
                                            handleState(item.key, val);
                                        }} />
                                }}
                                keyExtractor={item => item.id}
                            />
                        </View>
                        <View style={{ marginTop: HEIGHT * 0.03, alignItems: 'center' }}>
                            <ButtonComponent onPress={onLogin} text="Sign in" nextarrow={nextArrow} background={colors.darkViolet} textColor={colors.white} />
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: WIDTH * 0.03 }}>
                                <Text style={{ fontSize: 14, color: colors.lightGrey }}>Don't have an account.</Text>
                                <Pressable onPress={() => Navigation.navigate('SignUpScreen')}>
                                    <Text style={{ fontSize: 14, fontWeight: "600", color: colors.darkViolet }}>Sign Up</Text>
                                </Pressable>
                            </View>
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