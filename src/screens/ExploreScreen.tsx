import { View, Text, ImageBackground, SafeAreaView, FlatList, Image, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { backArrow, contact, profileIcon, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import HeaderComponent from '../components/HeaderComponent'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import UploadComponent from '../components/UploadModalComponent'


const ExploreScreen = () => {
    const navigation = useNavigation()
    const { getUser } = useSelector((state) => state?.commonReducer)
    const [modalVisible, setModalVisible] = useState(false);

    console.log("userdetails///====>", getUser);

    return (
        <View style={{ flex: 1, margin: 0 }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.1, }}>
                <SafeAreaView style={{ borderWidth: 0, }}>
                    <HeaderComponent
                        title="Explore"
                        backArrow={backArrow}
                        imageWidth={WIDTH * 0.045}
                        imageHeight={HEIGHT * 0.022}
                        fontsize={18}
                        navigation={() => navigation.goBack()}
                    />
                </SafeAreaView>
            </ImageBackground>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <FlatList
                    data={getUser}
                    keyExtractor={(item) => item._id}
                    numColumns={3}
                    renderItem={({ item, index }) => {
                        return (
                            <Pressable style={{ margin: WIDTH * 0.04 }} onPress={setModalVisible(true)}>
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
            <UploadComponent />
        </View >
    )
}

export default ExploreScreen