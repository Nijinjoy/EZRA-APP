import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { HEIGHT, WIDTH } from '../constants/Dimensions';
import { biometricIcon, eye, nextArrow, signinIntersection } from '../assets/images';
import { colors } from '../constants/Colors';
import ButtonComponent from '../components/ButtonComponent';
import TextInputComponent from '../components/TextInputComponent';
import { useNavigation } from '@react-navigation/native';
import PasswordComponent from '../components/PasswordComponent';

const SignInScreen = () => {
    const Navigation = useNavigation()
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
                            />
                            <Text style={{ fontSize: 14, textAlign: 'right', marginVertical: HEIGHT * 0.01, color: colors.darkViolet }}>Forgot password ?</Text>
                        </View>
                        <View style={{ marginTop: HEIGHT * 0.03, alignItems: 'center' }}>
                            <ButtonComponent text="Sign in" nextarrow={nextArrow} background={colors.darkViolet} textColor={colors.white} />
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