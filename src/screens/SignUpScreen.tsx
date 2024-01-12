import { View, Text, Image, Pressable, Alert, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { eye, nextArrow, signinIntersection } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { colors } from '../constants/Colors'
import TextInputComponent from '../components/TextInputComponent'
import ButtonComponent from '../components/ButtonComponent'
import { useNavigation } from '@react-navigation/native'
import PasswordComponent from '../components/PasswordComponent'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Api } from './Api'
import TextInputs from '../components/TextInputs'

const Data = [
    {
        id: 1,
        placeholder: "Email address",
        key: "Email"
    },
    {
        id: 2,
        placeholder: "Password",
        img: eye,
        key: "Password",
        secureTextEntry: true,
        togglePassword: true
    },
    {
        id: 3,
        placeholder: "Repeat password",
        key: "repeatPassword",
        secureTextEntry: true,
        togglePassword: false
    }
]

const SignUpScreen = () => {
    const Navigation = useNavigation()
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ Email: "", Password: "" })

    const handleState = (key, val) => {
        error[key] = ""
        setError(error)
        formData[key] = val;
        setFormData({ ...formData })
    }

    const onRegister = async () => {
        const { Email, Password } = formData;
        try {
            const response = await fetch(`${Api}/user/register`, {
                method: "POST",
                body: JSON.stringify({
                    email: Email,
                    password: Password,
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.text();
            if (response.ok) {
                await AsyncStorage.setItem('email', Email);
                await AsyncStorage.setItem('password', Password);
                console.log("User registered ==>", data);
                Navigation.navigate('HomeScreen');
            } else {
                console.log("Registration failed:", data);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };


    return (
        <ScrollView style={{ flex: 1 }}>
            <Image source={signinIntersection} style={{ width: WIDTH, height: HEIGHT * 0.296 }} resizeMode="contain" />
            <View style={{ marginHorizontal: WIDTH * 0.07 }}>
                <Text style={{ fontSize: 24, color: colors.darkViolet }}>Get Started</Text>
                <Text style={{ color: colors.lightGrey, fontSize: 15, marginVertical: HEIGHT * 0.007 }}>Create an account</Text>
                <View style={{ justifyContent: "center", alignItems: 'center', marginTop: HEIGHT * 0.03 }}>
                    <FlatList
                        data={Data}
                        scrollEnabled={false}
                        renderItem={({ item }) =>
                            <TextInputs
                                {...item}
                                secureTextEntry={item?.secureTextEntry}
                                viewStyle={{ height: HEIGHT * 0.07, borderWidth: 1, borderColor: colors.grey, justifyContent: "center", borderRadius: WIDTH * 0.015 }}
                                errorMsg={error[item.key]}
                                onChangeText={val => {
                                    handleState(item.key, val);
                                }}
                            />
                        }
                        keyExtractor={item => item.id} />
                    <View style={{ marginTop: HEIGHT * 0.05 }}>
                        <ButtonComponent
                            text="Sign up"
                            borderRadius={HEIGHT * 0.01}
                            background={colors.darkViolet}
                            textColor={colors.white}
                            nextarrow={nextArrow}
                            navigate={onRegister}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: WIDTH * 0.03 }} >
                            <Text style={{ fontSize: 14, color: colors.lightGrey }}>Already have an account.</Text>
                            <Pressable onPress={() => Navigation.navigate('HomeScreen')}>
                                <Text style={{ fontSize: 14, fontWeight: "600", color: colors.darkViolet }}>Sign in</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
export default SignUpScreen
