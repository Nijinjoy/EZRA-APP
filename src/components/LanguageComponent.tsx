import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { arabic, calender, english } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { colors } from '../constants/Colors'

const LanguageComponent = () => {
    return (
        <View style={{ borderWidth: 0, flexDirection: 'row', width: WIDTH * 0.3, marginHorizontal: WIDTH * 0.05, backgroundColor: colors.grey }}>
            <Pressable style={{ borderWidth: 0, flexDirection: 'row', padding: WIDTH * 0.01, backgroundColor: colors.white, margin: WIDTH * 0.01, borderRadius: WIDTH * 0.01 }}>
                <Image source={english} style={{ width: WIDTH * 0.06, height: HEIGHT * 0.03 }} resizeMode="contain" />
                <Text style={{ marginHorizontal: WIDTH * 0.01, fontWeight: '600' }}>EN</Text>
            </Pressable>
            <Pressable style={{ borderWidth: 0, flexDirection: 'row', margin: WIDTH * 0.01, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={arabic} style={{ width: WIDTH * 0.06, height: HEIGHT * 0.03 }} resizeMode="contain" />
                <Text style={{ marginHorizontal: WIDTH * 0.01, fontWeight: '600' }}>AR</Text>
            </Pressable>
        </View>
    )
}


export default LanguageComponent