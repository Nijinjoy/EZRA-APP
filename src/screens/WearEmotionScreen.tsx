import { View, Text, ImageBackground, Pressable, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderComponent from '../components/HeaderComponent'
import { backArrow, blueIcon, nextArrow, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { useNavigation } from '@react-navigation/native'
import TextInputComponent from '../components/TextInputComponent'
import ImageComponent from '../components/ImageComponent'
import ButtonComponent from '../components/ButtonComponent'
import ChooseprdctComponent from '../components/ChooseprdctComponent'

const WearEmotionScreen = () => {
    const Navigation = useNavigation()

    const formFields = [
        { label: 'Name', stateKey: 'childname', component: <TextInputComponent placeholder="Enter your name" /> },
        { label: 'Email', stateKey: 'message', component: <TextInputComponent placeholder="Enter your name" /> },
        { label: 'Upload image', stateKey: 'image', component: <ChooseprdctComponent /> },
        { label: 'Upload image', stateKey: 'image', component: <ImageComponent /> },
        { label: 'Address', stateKey: 'phone', component: <TextInputComponent placeholder="Address line 1" /> },
        { stateKey: 'phone', component: <TextInputComponent placeholder="Address line 2" /> },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.15 }}>
                <SafeAreaView>
                    <HeaderComponent title="Wear your emotions"
                        backArrow={backArrow}
                        Width={WIDTH * 0.045}
                        Height={HEIGHT * 0.022}
                        navigation={() => Navigation.goBack()}
                        fontsize={18} />
                </SafeAreaView>
            </ImageBackground>
            <ScrollView style={{ flex: 1, marginBottom: HEIGHT * 0.02 }}>
                <View style={{ marginHorizontal: WIDTH * 0.05 }}>
                    {formFields.map((field, index) => (
                        <View key={index} style={{ marginBottom: HEIGHT * 0.02, margin: WIDTH * 0.01 }}>
                            <Text style={{ fontSize: 12, color: colors.darkViolet }}>{field.label}</Text>
                            <View style={{ marginTop: HEIGHT * 0.01, }}>
                                {field.component}
                            </View>
                        </View>
                    ))}
                    <Text style={{ fontSize: 13, color: colors.grey, fontWeight: '500', marginVertical: HEIGHT * 0.02, marginHorizontal: WIDTH * 0.02 }}>Disclaimer:All orders will be handled externally,upon receiving your order,you will be contacted by our team to finalize your order.</Text>
                </View>
                <View style={{ justifyContent: "center", alignItems: 'center', flexGrow: 1 }}>
                    <ButtonComponent
                        background={colors.darkViolet}
                        text="Send Message"
                        nextarrow={nextArrow}
                        textColor={colors.white}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default WearEmotionScreen

