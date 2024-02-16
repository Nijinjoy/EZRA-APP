import { View, Text, SafeAreaView, ImageBackground, Pressable, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { addIcon, backArrow, contact, plusIcon, profile, profileIcon, shadedIcon } from '../assets/images'
import { useNavigation } from '@react-navigation/native'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { colors } from '../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'

const ChildrenScreen = () => {
    const Navigation = useNavigation()
    const { getUser } = useSelector((state) => state?.commonReducer);

    return (
        <View style={{ margin: HEIGHT * 0.01, flex: 1 }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.1 }}>
                <SafeAreaView style={{ marginTop: HEIGHT * 0.04 }}>
                    <HeaderComponent title="Children" backArrow={backArrow} Width={WIDTH * 0.045} Height={HEIGHT * 0.022} navigation={() => Navigation.goBack()} fontsize={18} />
                </SafeAreaView>
            </ImageBackground>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: HEIGHT * 0.2 }}>
                <FlatList
                    data={getUser}
                    numColumns={4}
                    contentContainerStyle={{ marginTop: HEIGHT * 0.01 }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ marginRight: WIDTH * 0.05 }}>
                            <View style={{ borderWidth: 0, width: WIDTH * 0.19, height: HEIGHT * 0.108, borderRadius: WIDTH * 0.02, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.lightGrey }}>
                                <Image source={profile} resizeMode='contain' style={{ width: WIDTH * 0.06, height: HEIGHT * 0.05 }} />
                                <Text style={{ fontSize: 16, color: colors.white }}>{item.name}</Text>
                            </View>
                        </View>
                    )}
                />

            </View>
        </View>
    )
}


export default ChildrenScreen