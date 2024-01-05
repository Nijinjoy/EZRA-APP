import { View, Text, ImageBackground, SafeAreaView, ScrollView, SectionList, Pressable, Image } from 'react-native'
import React from 'react'
import { colors } from '../constants/Colors'
import { artwork, backArrow, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import HeaderComponent from '../components/HeaderComponent'
import { useNavigation } from '@react-navigation/native'


const Drawings1 = [
    {
        id: 1,
        icon: artwork,
        name: 'Dave',
        percentage: "80%"
    },
    {
        id: 2,
        icon: artwork,
        name: 'Maya',
        percentage: "80%"
    },
]

const Drawings2 = [
    {
        id: 1,
        icon: artwork,
        name: 'Dave',
        percentage: "80%"
    },
    {
        id: 2,
        icon: artwork,
        name: 'Maya',
        percentage: "80%"
    },
    {
        id: 3,
        icon: artwork,
        name: 'Dave',
        percentage: "80%"
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
            {/* <View style={{ marginHorizontal: WIDTH * 0.05 }}>
                <ScrollView style={{ marginHorizontal: WIDTH * 0.05 }}>
                    <SectionList
                        sections={OrderHistory}
                        keyExtractor={(item, index) => item + index}
                        scrollEnabled={true}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={artwork} style={{ width: WIDTH * 0.5, height: HEIGHT * 0.1, margin: 10 }} resizeMode='contain' />
                            </View>
                        )}
                        renderSectionHeader={({ section: { title } }) => (
                            <View style={{ borderWidth: 0.5 }}>
                                <Text style={{ fontSize: 16, color: colors.darkViolet }}>{title}</Text>
                            </View>
                        )}
                    />
                </ScrollView>
            </View> */}
        </View>
    )
}

export default DrawingsScreen