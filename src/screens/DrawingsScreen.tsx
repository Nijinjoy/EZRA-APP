import { View, Text, ImageBackground, SafeAreaView, ScrollView, SectionList, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/Colors'
import { artwork, backArrow, draw1, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import HeaderComponent from '../components/HeaderComponent'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Api } from './Api'
import ToggleComponent from '../components/ToggleComponent'


const Drawings1 = [
    {
        id: 1,
        icon: artwork,
        name: 'Dave',
        percentage: "80% ",
        status: 'Positive',
        date: "12 September 2023"
    },
    {
        id: 2,
        icon: draw1,
        name: 'Maya',
        percentage: "80% ",
        status: 'Negative',
        date: "12 September 2023"
    },
]

const Drawings2 = [
    {
        id: 1,
        icon: draw1,
        name: 'Dave',
        percentage: "80%",
        status: 'Positive',
        date: "12 September 2023"
    },
    {
        id: 2,
        icon: artwork,
        name: 'Maya',
        percentage: "80%",
        status: 'Negative',
        date: "12 September 2023"
    },
    {
        id: 3,
        icon: draw1,
        name: 'Dave',
        percentage: "80%",
        status: 'Negative',
        date: "12 September 2023"
    },
]


const OrderHistory = [
    {
        title: '',
        data: Drawings1
    },
    {
        title: "January",
        data: Drawings2
    }
]

const DrawingsScreen = () => {
    const Navigation = useNavigation()
    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.15 }}>
                <SafeAreaView>
                    <HeaderComponent title="Drawings" backArrow={backArrow} Width={WIDTH * 0.045} Height={HEIGHT * 0.022} navigation={() => Navigation.goBack()} fontsize={18} />
                </SafeAreaView>
            </ImageBackground>
            <ScrollView style={{ marginHorizontal: WIDTH * 0.05 }}>
                <SectionList
                    sections={OrderHistory}
                    keyExtractor={(item, index) => item + index}
                    style={{ flexDirection: "row" }}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: "row", borderRadius: WIDTH * 0.03 }}>
                            <View style={{ marginVertical: HEIGHT * 0.02, }}>
                                <Image source={item.icon} style={{ width: WIDTH * 0.3, height: HEIGHT * 0.15 }} />
                            </View>
                            <View style={{ marginHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.02 }}>
                                <Text style={{ fontSize: 14, color: colors.darkViolet }}>{item.name}</Text>
                                <Text style={{ fontSize: 40, color: colors.darkViolet }}>{item.percentage}</Text>
                                <Text style={{ fontSize: 16, color: colors.orange }}>{item.status}</Text>
                                <Text style={{ fontSize: 13, color: colors.darkViolet }}>12 March 2023</Text>
                            </View>
                        </View>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 16, color: colors.darkViolet, fontWeight: '600' }}>{title}</Text>
                        </View>
                    )}
                />
            </ScrollView>
        </View>
    )
}

export default DrawingsScreen

