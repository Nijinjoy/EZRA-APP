import { View, Text, TextInput, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { HEIGHT, WIDTH } from '../constants/Dimensions';
import { eye } from '../assets/images';
import { colors } from '../constants/Colors';

const TextInputComponent = ({ icon, width, placeholder, passwordBackground, onChangeText, Height, value, background, onPress, isTextEnabled = true }) => {

    return (
        <Pressable onPress={onPress} style={{ borderWidth: 1,/*  height: HEIGHT * 0.07, */ borderRadius: WIDTH * 0.015, flexDirection: 'row', width: width, alignItems: 'center', justifyContent: 'center', backgroundColor: background, borderColor: colors.grey, height: Height }}>
            <TextInput
                value={value}
                placeholder={placeholder}
                editable={isTextEnabled}
                onChangeText={onChangeText}
                style={{ justifyContent: 'center', flex: 1, padding: WIDTH * 0.03 }}
            />
            <Pressable style={{ borderWidth: 0, justifyContent: "center", flexDirection: 'row', alignItems: 'center', marginRight: WIDTH * 0.05, backgroundColor: passwordBackground, width: WIDTH * 0.185, height: HEIGHT * 0.035, borderRadius: WIDTH * 0.05 }}>
                <Image source={icon} style={{ width: WIDTH * 0.04, height: HEIGHT * 0.02, marginLeft: WIDTH * 0.13 }} resizeMode='contain' />
            </Pressable>
        </Pressable>
    )
}

export default TextInputComponent