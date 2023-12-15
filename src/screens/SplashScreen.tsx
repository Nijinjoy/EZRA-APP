import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { bottomIntersection, logoIcon } from '../assets/images'
import { Dimensions } from 'react-native'
import { colors } from '../constants/Colors'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'


const SplashScreen = () => {
    const Navigation = useNavigation()

    // useEffect(() => {
    //     const checkIfSignedUp = async () => {
    //         try {
    //             const userEmail = await AsyncStorage.getItem('email');
    //             if (userEmail) {
    //                 const isNewUser = await AsyncStorage.getItem('isNewUser');

    //                 if (isNewUser) {
    //                     Navigation.replace('GetStartedScreen');
    //                 } else {
    //                     Navigation.replace('HomeScreen');
    //                 }
    //             } else {
    //                 Navigation.replace('SignUpScreen');
    //             }
    //         } catch (error) {
    //             console.error('Error checking signup status:', error);
    //         }
    //     };
    //     checkIfSignedUp();
    // }, []);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
            if (isLoggedIn !== 'true') {
                Navigation.reset({
                    index: 0,
                    routes: [{ name: 'SignInScreen' }],
                });
            }
        };
        checkLoginStatus();
    }, [Navigation]);

    return (
        <View style={{ flex: 1, backgroundColor: colors.lightwhite, justifyContent: "center", alignItems: "center" }}>
            <View style={{ width: WIDTH * 0.432, height: HEIGHT * 0.242, backgroundColor: colors.shadowWhite, borderRadius: WIDTH * 0.087, justifyContent: "center", alignItems: "center" }}>
                <Image source={logoIcon} style={{ width: WIDTH * 0.267, height: HEIGHT * 0.15 }} resizeMode='contain' />
            </View>
            <Text style={{ color: colors.darkViolet, fontSize: 25, fontWeight: '500', margin: HEIGHT * 0.03 }}>E   S   R   A</Text>
            <View style={{ alignItems: 'center', paddingTop: HEIGHT * 0.2 }}>
                <Text style={{ fontSize: 12, color: colors.lightGrey }}>Version 2.0</Text>
                <Text style={{ color: colors.lightBlack, fontSize: 12, marginTop: HEIGHT * 0.01 }}>Hamad Bin Khalifa University</Text>
            </View>
            <View style={{ bottom: HEIGHT * -0.048, position: "absolute" }}>
                <Image source={bottomIntersection} style={{ width: WIDTH, height: HEIGHT * 0.128 }} />
            </View>
        </View>
    )
}


export default SplashScreen
