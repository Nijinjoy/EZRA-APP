import { View, Text, TextInput, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { HEIGHT, WIDTH } from '../constants/Dimensions';
import { eye } from '../assets/images';
import { colors } from '../constants/Colors';

const TextInputComponent = ({ icon, placeholder, onChangeText, value, onPress, isTextEnabled = true, keyboardType, Width, containerStyle }) => {
    return (
        <View style={{ borderWidth: 1, borderColor: colors.grey, flexDirection: "row", alignItems: "center", justifyContent: 'center', borderRadius: WIDTH * 0.015, width: Width, ...containerStyle }}>
            <TextInput
                value={value}
                placeholder={placeholder}
                editable={isTextEnabled}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                style={{ justifyContent: 'center', flex: 1, padding: WIDTH * 0.03, }}
            />
            <Pressable style={{ justifyContent: "center", flexDirection: 'row', alignItems: 'center', marginRight: WIDTH * 0.05, width: WIDTH * 0.185, height: HEIGHT * 0.035, borderRadius: WIDTH * 0.05 }} onPress={onPress}>
                <Image source={icon} style={{ width: WIDTH * 0.04, height: HEIGHT * 0.02, marginLeft: WIDTH * 0.13 }} resizeMode='contain' />
            </Pressable>
        </View>
    )
}


export default TextInputComponent


























{/* <Pressable onPress={onPress} style={{ borderWidth: 1, borderRadius: WIDTH * 0.015, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: colors.grey, ...containerStyle }}>
<TextInput
    value={value}
    placeholder={placeholder}
    editable={isTextEnabled}
    onChangeText={onChangeText}
    style={{ justifyContent: 'center', flex: 1, padding: WIDTH * 0.03 }}
/>
<Pressable style={{ borderWidth: 0, justifyContent: "center", flexDirection: 'row', alignItems: 'center', marginRight: WIDTH * 0.05, width: WIDTH * 0.185, height: HEIGHT * 0.035, borderRadius: WIDTH * 0.05 }}>
    <Image source={icon} style={{ width: WIDTH * 0.04, height: HEIGHT * 0.02, marginLeft: WIDTH * 0.13 }} resizeMode='contain' />
</Pressable>
</Pressable> */}