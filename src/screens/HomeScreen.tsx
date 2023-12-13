import { View, Text, SafeAreaView, Image, ImageBackground } from 'react-native'
import React from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { contact, drawerIcon, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { colors } from '../constants/Colors'
import { DrawerActions, useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const Navigation = useNavigation()
    return (
        <SafeAreaView>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.143, borderWidth: 0 }}>
                <HeaderComponent backArrow={drawerIcon} navigation={() => Navigation.dispatch(DrawerActions.toggleDrawer())} />
            </ImageBackground>
            <View style={{ marginHorizontal: WIDTH * 0.05 }}>
                <Text style={{ fontSize: 13, color: colors.lightGrey }}>Welcome</Text>
                <Text style={{ fontSize: 18, color: colors.titleColor }}>Aaliya Hammed</Text>
                <View style={{ borderWidth: 1, width: WIDTH * 0.9, height: HEIGHT * 0.190, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.darkViolet, marginVertical: HEIGHT * 0.05, borderRadius: WIDTH * 0.02 }}>
                    <Image source={contact} style={{ width: WIDTH * 0.105, height: HEIGHT * 0.049 }} resizeMode='contain' />
                    <Text style={{ fontSize: 12, color: colors.white, width: WIDTH * 0.4, textAlign: 'center', margin: HEIGHT * 0.01 }}>Let's Start by adding your child information</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen