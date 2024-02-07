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
    const { addChild } = useSelector((state) => state?.commonReducer);
    const [childList, setChildList] = useState([]);

    useEffect(() => {
        // Fetch child data from AsyncStorage or Redux store
        // Example: AsyncStorage.getItem('childList').then((data) => setChildList(JSON.parse(data || '[]')));
    }, []);

    const renderItem = ({ item }) => (
        <View style={{ borderWidth: 0, alignItems: "center", justifyContent: 'center', width: WIDTH * 0.32, height: HEIGHT * 0.19, borderRadius: WIDTH * 0.02, backgroundColor: colors.orange }}>
            <Image source={profile} style={{ width: WIDTH * 0.15, height: HEIGHT * 0.1 }} resizeMode='contain' />
            <Text style={{ color: colors.white, fontSize: 15, margin: HEIGHT * 0.01 }}>{item.childname}</Text>
        </View>
    );

    return (
        <View style={{ margin: HEIGHT * 0.01, flex: 1 }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.1 }}>
                <SafeAreaView style={{ marginTop: HEIGHT * 0.04 }}>
                    <HeaderComponent title="Children" backArrow={backArrow} Width={WIDTH * 0.045} Height={HEIGHT * 0.022} navigation={() => Navigation.goBack()} fontsize={18} />
                </SafeAreaView>
            </ImageBackground>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: HEIGHT * 0.2 }}>
                <FlatList
                    data={childList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()} // Assuming each child has a unique ID
                    horizontal={false} // Set to true if you want horizontal scrolling
                />
            </View>
        </View>
    )
}

export default ChildrenScreen;
