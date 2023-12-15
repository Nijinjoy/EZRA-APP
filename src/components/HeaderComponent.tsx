import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { backArrow } from '../assets/images'
import { colors } from '../constants/Colors'

const HeaderComponent = (props) => {
    const { title, backArrow, fontsize, navigation, Width, Height } = props
    return (
        <View style={{ flexDirection: 'row', /* marginHorizontal: WIDTH * 0.05 */ height: HEIGHT * 0.06 }}>
            <Pressable onPress={navigation} style={[{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }]}>
                <Image source={backArrow} resizeMode='contain' style={{ width: Width, height: Height }} />
            </Pressable>
            <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: fontsize, color: colors.titleColor, fontWeight: '500' }}>{title}</Text>
            </View>
            <Pressable style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{ }</Text>
            </Pressable>
        </View>
    )
}

export default HeaderComponent