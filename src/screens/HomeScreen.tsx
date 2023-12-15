import { View, Text, SafeAreaView, Image, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { contact, drawerIcon, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { colors } from '../constants/Colors'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import ModalComponent from '../components/ModalComponent'

const HomeScreen = () => {
    const Navigation = useNavigation()

    return (
        <View style={{ borderWidth: 0.5, borderColor: colors.lightBlue }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.143, borderWidth: 0 }}>
                <View style={{ marginTop: HEIGHT * 0.05 }}>
                    <HeaderComponent backArrow={drawerIcon} fontsize={20} Width={WIDTH * 0.087} Height={HEIGHT * 0.049} navigation={() => Navigation.dispatch(DrawerActions.toggleDrawer())} />
                </View>
            </ImageBackground>
            <Pressable style={{ marginHorizontal: WIDTH * 0.05 }}>
                <Text style={{ fontSize: 13, color: colors.lightGrey }}>Welcome</Text>
                <Text style={{ fontSize: 18, color: colors.titleColor }}>Aaliya Hammed</Text>
                <View style={{ borderWidth: 1, width: WIDTH * 0.9, height: HEIGHT * 0.190, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.darkViolet, marginVertical: HEIGHT * 0.05, borderRadius: WIDTH * 0.02 }}>
                    <Image source={contact} style={{ width: WIDTH * 0.105, height: HEIGHT * 0.049 }} resizeMode='contain' />
                    <Text style={{ fontSize: 12, color: colors.white, width: WIDTH * 0.4, textAlign: 'center', margin: HEIGHT * 0.01 }}>Let's Start by adding your child information</Text>
                </View>
            </Pressable>

        </View >
    )
}

export default HomeScreen