import { View, Text, ImageBackground, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import { backArrow, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import HeaderComponent from '../components/HeaderComponent'
import { useNavigation } from '@react-navigation/native'

const PrivacyScreen = () => {
    const Navigation = useNavigation()
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.15 }}>
                <SafeAreaView>
                    <HeaderComponent title="Privacy policy" backArrow={backArrow} Width={WIDTH * 0.045} Height={HEIGHT * 0.022} navigation={() => Navigation.goBack()} />
                </SafeAreaView>
            </ImageBackground>
            <View style={{ flex: 1, borderWidth: 0.5 }}>
                <Text>Children Profiles</Text>
                <Pressable onPress={Navigation.navigate('AddChildScreen')} style={{}}>

                </Pressable>
            </View>
        </View>
    )
}

export default PrivacyScreen