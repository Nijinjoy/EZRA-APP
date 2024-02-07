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
        label: "Name",
        placeholder: "User name",
        key: "name"
    },
    {
        id: 2,
        label: "Email",
        placeholder: "Email address",
        key: "email"
    },
    {
        id: 3,
        label: "Password",
        placeholder: "Password",
        img: eye,
        key: "password",
        secureTextEntry: true,
        togglePassword: true
    },
    {
        id: 4,
        label: "Repeat Password",
        placeholder: "Repeat password",
        key: "repeatPassword",
        secureTextEntry: true,
        togglePassword: false
    }
]

const SignUpScreen = () => {
    const navigation = useNavigation()
    const [error, setError] = useState("");
    // const [formData, setFormData] = useState({ Email: "", Password: "", Name: "" })
    const [formData, setFormData] = useState({ email: "", password: "", name: "" })

    console.log("formdata==>", formData);

    const handleState = (key, val) => {
        error[key] = ""
        setError(error)
        formData[key] = val;
        setFormData({ ...formData })
    }

    const onRegister = async (token) => {
        const { email, password, name } = formData;
        try {
            var body = new FormData();
            body.append("email", email);
            body.append("password", password);
            body.append("name", name);
            const response = await fetch(`${Api}/user/register`, {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const data = await response.json();
            if (response.status) {
                const token = data?.data?.token;
                if (token) {
                    await AsyncStorage.setItem('token', token);
                    console.log("User registered.token===>", token);
                    navigation.navigate('Drawers', {
                        name: name,
                        email: email,
                    })
                } else {
                    console.log("Token not found in the response:", data);
                    Alert.alert('Alert', 'This email already exists')
                }
            } else {
                console.log("Registration failed:", data.message);
                setError(data.message);
            }
        } catch (error) {
            console.log("Error:", error);
            setError("An error occurred during registration");
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
                    <View style={{ marginTop: HEIGHT * 0.02 }}>
                        <ButtonComponent
                            label="Sign up"
                            containerStyle={{ borderRadius: WIDTH * 0.01, width: WIDTH * 0.84, height: HEIGHT * 0.072, backgroundColor: colors.darkViolet, }}
                            labelStyle={{ color: colors.white }}
                            icon={nextArrow}
                            onPress={onRegister}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: WIDTH * 0.03 }} >
                            <Text style={{ fontSize: 14, color: colors.lightGrey }}>Already have an account.</Text>
                            <Pressable onPress={() => navigation.navigate('SignInScreen')}>
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
