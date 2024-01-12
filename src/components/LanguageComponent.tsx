import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { arabic, calender, english } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { colors } from '../constants/Colors'

const LanguageComponent = () => {
    return (
        <View style={{ borderWidth: 0, flexDirection: 'row', width: WIDTH * 0.34, padding: HEIGHT * 0.007, borderRadius: WIDTH * 0.015, marginHorizontal: WIDTH * 0.06, backgroundColor: colors.grey }}>
            <Pressable style={{ flexDirection: "row", backgroundColor: colors.lightWhite, padding: WIDTH * 0.01 }}>
                <Image source={english} style={{ width: WIDTH * 0.06, height: HEIGHT * 0.03 }} resizeMode='contain' />
                <Text style={{ fontWeight: "500", marginHorizontal: WIDTH * 0.01 }}>EN</Text>
            </Pressable>
            <Pressable style={{ flexDirection: "row", padding: WIDTH * 0.01, marginHorizontal: WIDTH * 0.01 }} >
                <Image source={arabic} style={{ width: WIDTH * 0.06, height: HEIGHT * 0.03 }} resizeMode='contain' />
                <Text style={{ fontWeight: '500', marginHorizontal: WIDTH * 0.01, }}>AR</Text>
            </Pressable>
        </View>
    )
}
export default LanguageComponent