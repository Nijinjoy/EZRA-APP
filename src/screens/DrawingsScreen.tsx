import { View, Text, ImageBackground, SafeAreaView, ScrollView, Pressable, Image, FlatList, SectionList, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../constants/Colors'
import { artwork, backArrow, cont, contact, draw1, equal, grid, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import HeaderComponent from '../components/HeaderComponent'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Api } from './Api'
import ToggleComponent from '../components/ToggleComponent'
import { useSelector } from 'react-redux'

const DATA = [
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
        icon: draw1,
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
    {
        id: 4,
        icon: draw1,
        name: 'Dave',
        percentage: "80%",
        status: 'Negative',
        date: "12 September 2023"
    },
]

const DrawingsScreen = () => {
    const Navigation = useNavigation()
    const { userDetails, token, getUser, getPredictionListChild } = useSelector((state) => state?.commonReducer);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedTab, setSelectedTab] = useState('grid')

    const selectFilter = (filter) => {
        setSelectedFilter(filter);
    };

    const selectTab = (tab) => {
        setSelectedTab(tab)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white, }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.15 }}>
                <SafeAreaView>
                    <HeaderComponent title="Drawings" backArrow={backArrow} imageWidth={WIDTH * 0.045} imageHeight={HEIGHT * 0.022} navigation={() => Navigation.goBack()} fontsize={18} />
                </SafeAreaView>
            </ImageBackground>
            {/* grid navigation */}
            < View style={{ alignItems: 'flex-end', marginBottom: 10 }}>
                <View style={{ flexDirection: "row", alignItems: 'center', marginHorizontal: WIDTH * 0.05, borderWidth: 0, backgroundColor: colors.grey, borderRadius: WIDTH * 0.01, }}>
                    <Pressable onPress={() => selectTab('grid')} style={{ justifyContent: "center", alignItems: 'center', backgroundColor: selectedTab === 'grid' ? colors.white : colors.grey, margin: WIDTH * 0.01 }}>
                        <Image source={grid} style={{ width: WIDTH * 0.05, height: HEIGHT * 0.03, marginHorizontal: WIDTH * 0.02 }} resizeMode='contain' />
                    </Pressable>
                    <Pressable onPress={() => selectTab('col')} style={{ justifyContent: "center", alignItems: 'center', backgroundColor: selectedTab === 'col' ? colors.white : colors.grey, margin: WIDTH * 0.01 }}>
                        <Image source={equal} style={{ width: WIDTH * 0.04, height: HEIGHT * 0.03, marginHorizontal: WIDTH * 0.02 }} resizeMode='contain' />
                    </Pressable>
                </View>
            </View >
            {/* grid navigation */}
            {/* tab navigation */}
            <View style={{ backgroundColor: colors.grey, flexDirection: "row", marginHorizontal: WIDTH * 0.05, padding: HEIGHT * 0.004, borderRadius: WIDTH * 0.01 }}>
                <Pressable onPress={() => selectFilter('all')} style={{ flex: 0.33, alignItems: 'center', borderWidth: 0, backgroundColor: selectedFilter === 'all' ? colors.white : colors.grey, margin: WIDTH * 0.003, borderRadius: WIDTH * 0.01 }}>
                    <Text style={{ color: selectedFilter === 'all' ? colors.black : colors.lightGrey }}>All</Text>
                </Pressable>
                <Pressable onPress={() => selectFilter('home')} style={{ flex: 0.34, alignItems: 'center', borderWidth: 0, backgroundColor: selectedFilter === 'home' ? colors.white : colors.grey, margin: WIDTH * 0.003, borderRadius: WIDTH * 0.01 }}>
                    <Text style={{ color: selectedFilter === 'home' ? colors.black : colors.lightGrey }}>Home</Text>
                </Pressable>
                <Pressable onPress={() => selectFilter('school')} style={{ flex: 0.33, alignItems: 'center', borderWidth: 0, backgroundColor: selectedFilter === 'school' ? colors.white : colors.grey, margin: WIDTH * 0.003, borderRadius: WIDTH * 0.01 }}>
                    <Text style={{ color: selectedFilter === 'school' ? colors.black : colors.lightGrey }}>School</Text>
                </Pressable>
            </View>
            {/* tab navigation */}
            <View style={{ marginHorizontal: WIDTH * 0.05, borderWidth: 0.0, marginTop: 20 }}>
                {selectedTab === 'grid' ? (
                    <FlatList
                        key="grid"
                        data={DATA}
                        numColumns={2}
                        contentContainerStyle={{ justifyContent: "center", alignItems: 'center', }}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ margin: 10, borderRadius: WIDTH * 0.02 }}>
                                    <Image source={item.icon} style={{ width: WIDTH * 0.4, height: HEIGHT * 0.15, borderRadius: WIDTH * 0.02 }} /* resizeMode='contain' */ />
                                </View>
                            )
                        }}
                    />
                ) : (
                    <FlatList
                        key="col"
                        data={DATA}
                        numColumns={1}
                        contentContainerStyle={{}}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ borderRadius: WIDTH * 0.02, flexDirection: "row" }}>
                                    <Image source={item.icon} style={{ width: WIDTH * 0.44, height: HEIGHT * 0.15, borderRadius: WIDTH * 0.02, marginTop: 10 }} resizeMode='contain' />
                                    <View style={{ flexDirection: 'column', marginHorizontal: WIDTH * 0.04, marginVertical: HEIGHT * 0.02 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={cont} tintColor={colors.violet} />
                                            <Text style={{ fontSize: 12, marginHorizontal: WIDTH * 0.015 }}>{item.name}</Text>
                                        </View>
                                        <Text style={{ fontSize: 16, marginVertical: HEIGHT * 0.01 }}>{item.status}</Text>
                                        <Text style={{ fontSize: 13, color: colors.darkViolet }}>{item.date}</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />
                )}
            </View>
        </SafeAreaView >
    )
}

export default DrawingsScreen