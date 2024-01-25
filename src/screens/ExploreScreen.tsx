import { View, Text, ImageBackground, SafeAreaView, FlatList, Image, Pressable, Alert } from 'react-native'
import React from 'react'
import { backArrow, contact, profileIcon, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import HeaderComponent from '../components/HeaderComponent'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

const data1 = [
    {
        id: 1,
        name: 'Nijin'
    },
    {
        id: 2,
        name: 'Nijo'
    },
    {
        id: 3,
        name: 'shijo'
    },
    {
        id: 4,
        name: 'shijo'
    }
]

const ExploreScreen = () => {
    const Navigation = useNavigation()
    return (
        <View style={{ flex: 1, margin: 5 }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.1, }}>
                <SafeAreaView style={{ borderWidth: 0, }}>
                    <HeaderComponent
                        title="Explore"
                        backArrow={backArrow}
                        Width={WIDTH * 0.045}
                        Height={HEIGHT * 0.022}
                        fontsize={18}
                        navigation={() => Navigation.goBack()}
                    />
                </SafeAreaView>
            </ImageBackground>
            <View style={{ margin: WIDTH * 0.07, flex: 1 }}>
                <FlatList
                    data={data1}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    renderItem={({ item, index }) => {
                        return (
                            <Pressable style={{ margin: WIDTH * 0.04 }}>
                                <Pressable style={{ flexDirection: 'row', borderRadius: WIDTH, width: WIDTH * 0.2, height: HEIGHT * 0.11, justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: colors.skyBlue }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={contact} style={{ width: WIDTH * 0.2, height: HEIGHT * 0.08 }} resizeMode='contain' />
                                    </View>
                                </Pressable>
                                <Text style={{ textAlign: 'center', marginTop: HEIGHT * 0.01 }}>{item.name}</Text>
                            </Pressable>
                        )
                    }}
                />
            </View>
        </View >
    )
}

export default ExploreScreen