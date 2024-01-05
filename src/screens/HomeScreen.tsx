import { View, Text, SafeAreaView, Image, ImageBackground, Pressable, ScrollView } from 'react-native'
import React, { Children, useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { contact, drawerIcon, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { colors } from '../constants/Colors'
import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native'
import LanguagComponent from '../components/LanguagComponent'
import ModalComponent from '../components/ModalComponent'
import LogoutModalComponent from '../components/LogoutModalComponent'

const HomeScreen = ({ }) => {
    const route = useRoute()
    const Navigation = useNavigation()
    const { childInfo } = route.params || {};


    return (
        <View style={{ borderWidth: 0.5, borderColor: colors.lightBlue }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.143, borderWidth: 0 }}>
                <View style={{ marginTop: HEIGHT * 0.05 }}>
                    <HeaderComponent backArrow={drawerIcon} fontsize={20} Width={WIDTH * 0.087} Height={HEIGHT * 0.049} navigation={() => Navigation.dispatch(DrawerActions.toggleDrawer())} />
                </View>
            </ImageBackground>
            <Pressable style={{ marginHorizontal: WIDTH * 0.05 }}>
                <Text style={{ fontSize: 13, color: colors.lightGrey, fontWeight: "600" }}>Children's profiles </Text>

                <LogoutModalComponent />

                <View style={{ borderWidth: 0, width: WIDTH * 0.9, height: HEIGHT * 0.190, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.grey, marginVertical: HEIGHT * 0.05, borderRadius: WIDTH * 0.02 }}>
                    <Text style={{
                        fontSize: 12, color: colors.darkViolet, width: WIDTH * 0.4, textAlign: 'center', margin: HEIGHT * 0.01
                    }}>Please select a child to view more details.</Text>
                </View>
            </Pressable>
        </View>
    )
}


export default HomeScreen
